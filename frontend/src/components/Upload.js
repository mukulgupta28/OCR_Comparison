import React from "react";
import axios from "axios";

function Upload({ setResults }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://127.0.0.1:8000/upload/", formData);
    setResults(res.data);
  };

  return (
    <input type="file" onChange={handleUpload} />
  );
}

export default Upload;