import { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Product Uploaded Successfully 🚀");
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
              name="image"
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
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />

          <button type="submit">Add Product</button>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;