export const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("file", imageFile);
  formData.append("upload_preset", "shopease");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dxuw5qbpl/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  return data.secure_url;
};