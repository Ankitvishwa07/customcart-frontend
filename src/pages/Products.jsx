import { useState } from "react";

const productsData = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$129",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$249",
    image: "https://images.unsplash.com/photo-1516570161787-2fd917215a3d"
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "$79",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: "$149",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: "$99",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
  },
  {
    id: 6,
    name: "VR Headset",
    price: "$499",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620"
  }
];

const ProductPage = () => {
  const [products, setProducts] = useState(productsData);

  const handleBuy = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, sold: true } : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="product-page">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p className="price">{product.price}</p>

          <button
            className={product.sold ? "sold-btn" : ""}
            onClick={() => handleBuy(product.id)}
            disabled={product.sold}
          >
            {product.sold ? "Sold" : "Buy"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;