import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const askPawPal = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/.netlify/functions/ask-pawpal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setAnswer(data.answer);
    } catch (error) {
      setAnswer(
        "🐾 Hmm... PawPal got distracted chasing a squirrel. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };
  const hearDog = async (text) => {
    setSpeaking(true);

    try {
      const response = await fetch("/.netlify/functions/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Voice generation failed");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (error) {
      console.error(error);
      setSpeaking(false);
    }
  };

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

          <button
            className="ask-button"
            onClick={askPawPal}
            disabled={loading}
          >
            {loading ? "🐾 PawPal is thinking..." : "Ask PawPal →"}
          </button>
        </div>

        {answer && (
          <div className="answer-card">
            <div className="answer-title">🐶 PawPal says...</div>

            <div className="answer-content">
              {answer
                .split("DOG_TRANSLATION")[0]
                .split("\n")
                .map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
            </div>

            {answer.includes("DOG_TRANSLATION") && (
              <div className="dog-translation">
                <div className="translation-title">
                  🐕 What your dog REALLY means
                </div>

                <p>
                  {answer
                    .split("DOG_TRANSLATION")[1]
                    .trim()}
                </p>
                <button
                  className="voice-button"
                  onClick={() =>
                    hearDog(answer.split("DOG_TRANSLATION")[1].trim())
                  }
                  disabled={speaking}
                >
                  {speaking ? "🔊 Your dog is talking..." : "🔊 Hear what your dog means"}
                </button>
              </div>
            )}
          </div>
        )}

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
                <div className="rescue-section">
                  <div className="rescue-icon">🧡</div>

                  <h2>Giving a rescued dog a home?</h2>

                  <p>
                    New home. New humans. New everything.
                    PawPal can help you understand what your new companion
                    might be trying to tell you.
                  </p>

                  <div className="rescue-options">
                    <button
                      className="rescue-button"
                      onClick={() =>
                        setQuestion(
                          "I just brought my rescued dog home. What should I do during their first day?"
                        )
                      }
                    >
                      🏠 Just brought them home
                    </button>

                    <button
                      className="rescue-button"
                      onClick={() =>
                        setQuestion(
                          "My newly adopted dog seems scared. How can I help them feel safe?"
                        )
                      }
                    >
                      😰 They're scared
                    </button>

                    <button
                      className="rescue-button"
                      onClick={() =>
                        setQuestion(
                          "My adopted dog won't eat. Is this normal after coming to a new home?"
                        )
                      }
                    >
                      🍽️ They won't eat
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