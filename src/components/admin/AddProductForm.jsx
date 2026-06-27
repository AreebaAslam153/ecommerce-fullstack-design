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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

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

        {/* Image Upload */}

        <input
          className="full-width"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {uploading && (
          <p
            style={{
              color: "#D4AF37",
              fontWeight: "bold",
            }}
          >
            Uploading Image...
          </p>
        )}

        {image && (
          <img
            src={image}
            alt="Preview"
            style={{
              width: "180px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "12px",
              margin: "15px auto",
              display: "block",
              border: "2px solid #ddd",
            }}
          />
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