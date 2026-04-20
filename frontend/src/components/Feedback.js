// import React, { useState } from "react";
// import axios from "axios";

// function Feedback({ results }) {
//   const [correctText, setCorrectText] = useState("");

//   const sendFeedback = async (choice) => {
//     await axios.post("http://127.0.0.1:8000/feedback/", {
//       filename: results.filename,
//       model1: results.model1,
//       model2: results.model2,
//       choice: choice,
//       correct: correctText
//     });

//     alert("Feedback saved");
//   };

//   return (
//     <div style={{ marginTop: "20px" }}>
//       <button onClick={() => sendFeedback("model1_correct")}>Model 1 ✔</button>
//       <button onClick={() => sendFeedback("model2_correct")}>Model 2 ✔</button>
//       <button onClick={() => sendFeedback("both_wrong")}>Both ❌</button>

//       <br /><br />

//       <input
//         placeholder="Correct text"
//         value={correctText}
//         onChange={(e) => setCorrectText(e.target.value)}
//       />
//     </div>
//   );
// }

// export default Feedback;

import React, { useState } from "react";
import axios from "axios";

function Feedback({ results }) {
  const [correctText, setCorrectText] = useState("");

  const sendFeedback = async (choice) => {
    await axios.post("http://127.0.0.1:8000/feedback/", {
      filename: results.filename,
      model1: results.model1,
      model2: results.model2,
      choice: choice,
      correct: choice === "manual" ? correctText : ""
    });

    alert("Feedback saved");
    setCorrectText("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Feedback</h3>

      <button onClick={() => sendFeedback("model1_correct")}>
        Model 1 ✔
      </button>

      <button onClick={() => sendFeedback("model2_correct")}>
        Model 2 ✔
      </button>

      <br /><br />

      <input
        placeholder="If both are wrong, enter correct text"
        value={correctText}
        onChange={(e) => setCorrectText(e.target.value)}
        style={{ width: "300px" }}
      />

      <button
        disabled={!correctText}
        onClick={() => sendFeedback("manual")}
      >
        Submit Correct Text
      </button>
    </div>
  );
}

export default Feedback;