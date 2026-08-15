import "./App.css";

function App() {
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
      />

      <button>Ask PawPal 🐾</button>

      <div className="examples">
        <p>Try asking:</p>

        <button className="example-button">
          Why is my puppy crying?
        </button>

        <button className="example-button">
          Why won't my dog eat?
        </button>

        <button className="example-button">
          Why does my puppy bite me?
        </button>
      </div>
    </main>
  );
}

export default App;