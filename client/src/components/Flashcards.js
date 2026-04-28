import { useState } from "react";

function Flashcards({ cards, addCard, deleteCard, addPoints }) {
  // Input states
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Mode: create, study, or quiz
  const [mode, setMode] = useState("create");

  // Flashcard navigation + quiz states
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);

  // add a new flashcard
  const handleAdd = () => {
  // don't add if empty
  if (!question.trim() || !answer.trim()) return;

  addCard(question, answer); // add card

  setQuestion(""); // clear input
  setAnswer(""); // clear input
};
  // go to next card
  const nextCard = () => {
  if (cards.length === 0) return; // stop if no cards

  setIndex((prev) => (prev + 1) % cards.length); // move to next
  setShowAnswer(false); // hide answer
  setUserAnswer(""); // clear input
};

  // check if answer is correct
const checkAnswer = () => {
  if (cards.length === 0) return; // stop if no cards

  const current = cards[index]; // get current card

  const correct = current.answer.toLowerCase().trim(); // correct answer
  const input = userAnswer.toLowerCase().trim(); // user answer

  if (input === correct) {
    addPoints(5); // give XP
    setScore((prev) => prev + 1); // increase score
    alert("✅ Correct!");
  } else {
    alert(`❌ Incorrect! Answer: ${current.answer}`);
  }

  nextCard(); // move to next card
};

  // ======================
  // QUIZ MODE
  // ======================
  if (mode === "quiz") {
    if (cards.length === 0) return <p>No cards yet</p>;
    const current = cards[index];

    return (
      <div style={{ textAlign: "center" }}>
        <h3>Quiz Mode</h3>
        <p>Score: {score}</p>

        <p><strong>{current.question}</strong></p>

        <input
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />

        <br />
        <button onClick={checkAnswer}>Submit</button>
        <button onClick={() => setMode("create")}>Exit</button>
      </div>
    );
  }

  // ======================
  // STUDY MODE
  // ======================
  if (mode === "study") {
    if (cards.length === 0) return <p>No cards yet</p>;
    const current = cards[index];

    return (
      <div style={{ textAlign: "center" }}>
        <h3>Study Mode</h3>

        <p style={{ fontSize: "18px" }}>
          {showAnswer ? current.answer : current.question}
        </p>

        <button onClick={() => setShowAnswer(!showAnswer)}>Flip</button>
        <button onClick={nextCard}>Next</button>
        <button onClick={() => setMode("create")}>Back</button>
      </div>
    );
  }

  // ======================
  // CREATE MODE
  // ======================
  return (
    <div>
      <h3>Create Flashcards</h3>

      {/* Input for question */}
      <input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* Input for answer */}
      <input
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button onClick={handleAdd}>Add Card</button>

      <br />

      {/* Mode buttons */}
      <button onClick={() => setMode("study")}>Study Mode</button>
      <button onClick={() => setMode("quiz")}>Quiz Mode</button>

      {/* Display all flashcards */}
      {cards.map((card) => (
        <div key={card.id} style={{ marginTop: "10px" }}>
          <p><strong>Q:</strong> {card.question}</p>
          <p><strong>A:</strong> {card.answer}</p>

          <button
            onClick={() => deleteCard(card.id)}
            style={{ backgroundColor: "#ef4444" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Flashcards;