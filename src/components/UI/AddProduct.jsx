import { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    productImage: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "productImage") {
      const file = e.target.files[0];
      setFormData({ ...formData, productImage: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("productName", formData.productName);
      data.append("productPrice", formData.productPrice);
      data.append("productImage", formData.productImage);
      console.log("Token:", localStorage.getItem("token"));

      const res = await fetch("/api/products/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });

      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        console.error("Raw server response:", text); 
        throw new Error("Invalid server response");
      }

      if (!res.ok) throw new Error(result.message || "Upload failed");

      alert("Product Uploaded Successfully 🚀");

      setFormData({ productName: "", productPrice: "", productImage: null });
      setPreview(null);
    } catch (error) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addproduct-container">
      <div className="addproduct-card">
        <h2>Upload Product</h2>

        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="image-upload">
            <label>Upload Product Image</label>
            <input
              type="file"
              name="productImage"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}

          {/* Product Name */}
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            required
          />

          {/* Price */}
          <input
            type="number"
            name="productPrice"
            placeholder="Price"
            value={formData.productPrice}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
