import { useState } from "react";
import { uploadImage } from "../../services/cloudinaryService";
import "./AddProductForm.css";

function AddProductForm({
  name,
  setName,
  price,
  setPrice,
  image,
  setImage,
  handleSubmit,
}) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("No image selected");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    try {
      setUploading(true);

      const imageUrl = await uploadImage(file);

      setImage(imageUrl);

      alert("Image Uploaded Successfully!");
    } catch (error) {
      console.error(error);
      alert("Image Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-product-card">
      <h2>➕ Add New Product</h2>

      <form onSubmit={handleSubmit} className="product-form">

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        {/* Upload */}

        <div className="upload-area full-width">

          <label htmlFor="imageUpload" className="upload-btn">
            📁 Choose Product Image
          </label>

          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          <span className="file-name">
            {fileName}
          </span>

        </div>

        {uploading && (
          <p className="uploading-text">
            Uploading Image...
          </p>
        )}

        {image && (
          <div className="preview-container">
            <img
              src={image}
              alt="Preview"
              className="preview-image"
            />
          </div>
        )}

        <button
          disabled={uploading}
          type="submit"
          className="add-btn full-width"
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>

      </form>
    </div>
  );
}

export default AddProductForm;