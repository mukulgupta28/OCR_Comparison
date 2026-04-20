import React, { useState } from "react";
import Upload from "./components/Upload";
import ResultCard from "./components/ResultCard";
import Feedback from "./components/Feedback";

function App() {
  const [results, setResults] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>OCR Comparison Tool</h1>

      <Upload setResults={setResults} />

      {results && (
        <>
          <ResultCard title="Model 1 (EasyOCR)" text={results.model1} />
          <ResultCard title="Model 2 (Tesseract)" text={results.model2} />
          <Feedback results={results} />
        </>
      )}
    </div>
  );
}

export default App;