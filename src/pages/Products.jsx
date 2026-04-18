import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState(null); // track which product is being actioned

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      // Only show available + under_negotiation products (hide sold ones)
      setProducts(data.products.filter((p) => p.productStatus !== "sold"));
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleBuyNow = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to buy a product.");
      navigate("/login");
      return;
    }

    try {
      setBuyingId(productId);
      const res = await axios.post(
        `/api/negotiations/start/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const negotiationId = res.data.negotiation._id;
      // Redirect to inbox with the negotiation pre-selected
      navigate(`/inbox?negotiation=${negotiationId}`);
    } catch (err) {
      alert(err.response?.data?.message || "Could not start negotiation.");
    } finally {
      setBuyingId(null);
    }
  };

  const statusLabel = (status) => {
    if (status === "sold") return { label: "Sold Out", color: "red" };
    if (status === "under_negotiation") return { label: "Under Negotiation", color: "orange" };
    return { label: "Available", color: "green" };
  };

  if (loading) return <h2>Loading products...</h2>;

  return (
    <div className="products-container">
      <h2>Explore Products</h2>

      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => {
            const { label, color } = statusLabel(product.productStatus);
            const isAvailable = product.productStatus === "available";

            return (
              <div className="product-card" key={product._id}>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="product-image"
                />
                <h3>{product.productName}</h3>
                <p>₹ {product.productPrice}</p>
                <p style={{ color, fontWeight: "600", fontSize: "0.85rem" }}>{label}</p>

                <button
                  disabled={!isAvailable || buyingId === product._id}
                  onClick={() => handleBuyNow(product._id)}
                >
                  {buyingId === product._id
                    ? "Opening chat..."
                    : isAvailable
                    ? "Buy Now"
                    : label}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Products;
