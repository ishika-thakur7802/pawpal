import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  return (
    <main>
      <h1>🐾 PawPal</h1>

      <h2>Your puppy can't talk. PawPal can.</h2>

      <p>
        Ask anything about your new dog and get simple, friendly guidance.
      </p>

     <textarea
       placeholder="What is your dog doing?"
       rows="5"
       value={question}
       onChange={(event) => setQuestion(event.target.value)}
     />

      <button>Ask PawPal 🐾</button>

      <div className="examples">
        <p>Try asking:</p>

       <button
         className="example-button"
         onClick={() => setQuestion("Why is my puppy crying?")}
       >
         Why is my puppy crying?
       </button>

        <button className="example-button"
        onClick={() => setQuestion("Why won't my dog eat?")}>
          Why won't my dog eat?
        </button>

        <button className="example-button"
         onClick={() => setQuestion("Why does my puppy bite me?")}>
          Why does my puppy bite me?
         </button>
      </div>
    </main>
  );
}

export default App;