import { useState } from "react";
import { uploadImage } from "../../services/cloudinaryService";
import "./ProductTable.css";

function ProductTable({
  products,
  editingId,
  editName,
  setEditName,
  editPrice,
  setEditPrice,
  editImage,
  setEditImage,
  startEditing,
  handleUpdate,
  handleDelete,
  setEditingId,
}) {
  const [uploading, setUploading] = useState(false);

  const handleEditImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const imageUrl = await uploadImage(file);

      setEditImage(imageUrl);

      alert("Image Uploaded Successfully!");
    } catch (error) {
      console.error(error);
      alert("Image Upload Failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="product-table-card">
      <h2>📦 Product Management</h2>

      {products.length === 0 ? (
        <div className="empty-products">
          <h3>No products available.</h3>
        </div>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th width="220">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) =>
              editingId === product.id ? (
                <tr key={product.id}>
                  <td colSpan="4">
                    <div className="edit-form">
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Product Name"
                      />

                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        placeholder="Price"
                      />

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditImageUpload}
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

                      {editImage && (
                        <img
                          src={editImage}
                          alt="Preview"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            marginTop: "15px",
                            border: "2px solid #ddd",
                          }}
                        />
                      )}

                      <div className="edit-buttons">
                        <button
                          className="save-btn"
                          onClick={handleUpdate}
                          disabled={uploading}
                        >
                          {uploading ? "Uploading..." : "Save"}
                        </button>

                        <button
                          className="cancel-btn"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-thumb"
                    />
                  </td>

                  <td>{product.name}</td>

                  <td>
                    <span className="price-badge">
                      ${product.price}
                    </span>
                  </td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => startEditing(product)}
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(product.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductTable;