import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setProducts(data.products);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <h2>Loading products...</h2>;

  return (
    <div className="products-container">
      <h2>Explore Products</h2>

      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              {/* Product Image */}
              <img
                src={product.productImage}
                alt={product.productName}
                className="product-image"
              />

              {/* Product Info */}
              <h3>{product.productName}</h3>
              <p>₹ {product.productPrice}</p>

              {/* Status */}
              <p
                style={{
                  color: product.productStatus === "sold" ? "red" : "green",
                }}
              >
                {product.productStatus}
              </p>

              {/* Button (future use) */}
              <button disabled={product.productStatus === "sold"}>
                {product.productStatus === "sold" ? "Sold Out" : "Buy Now"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
