import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OCRComponent = () => {
  const [image, setImage] = useState(null);
  const [textData, setTextData] = useState("");

  // Function to handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);

      try {
        const {
          data: { text },
        } = await Tesseract.recognize(file, "eng");
        setTextData(text);
      } catch (error) {
        console.error("Error occurred during OCR:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <img src={image} alt="Uploaded" style={{ maxWidth: "300px" }} />
      )}
      {textData && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{textData}</p>
        </div>
      )}
    </div>
  );
};

export default OCRComponent;
