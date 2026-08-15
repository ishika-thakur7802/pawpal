import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");

  return (
    <main>
      <div className="paw-decoration paw-one">🐾</div>
      <div className="paw-decoration paw-two">🐾</div>

      <section className="hero">
        <div className="logo">🐶 PawPal</div>

        <div className="badge">✨ Your new-dog sidekick</div>

        <h1>
          Your puppy can't talk.
          <span> PawPal can.</span>
        </h1>

        <p className="subtitle">
          New puppy? No clue what that tiny creature is trying to tell you?
          Ask PawPal.
        </p>

        <div className="question-card">
          <div className="card-label">🐾 What's going on?</div>

          <textarea
            placeholder="e.g. My puppy keeps biting my feet..."
            rows="4"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />

          <button className="ask-button">
            Ask PawPal <span>→</span>
          </button>
        </div>

        <div className="examples">
          <p>Not sure what to ask?</p>

          <div className="example-list">
            <button
              className="example-button"
              onClick={() => setQuestion("Why is my puppy crying?")}
            >
               Why is my puppy crying?
            </button>

            <button
              className="example-button"
              onClick={() => setQuestion("Why won't my dog eat?")}
            >
              Why won't my dog eat?
            </button>

            <button
              className="example-button"
              onClick={() => setQuestion("Why does my puppy bite me?")}
            >
              Why does my puppy bite me?
            </button>
          </div>
        </div>
      </section>

      <div className="bottom-note">
        Made for confused humans & happy dogs 🐕
      </div>
    </main>
  );
}

export default App;