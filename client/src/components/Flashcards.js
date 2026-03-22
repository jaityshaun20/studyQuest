import { useState } from "react";

function Flashcards({ cards, addCard, deleteCard, addPoints }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [mode, setMode] = useState("create");
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);

  const handleAdd = () => {
    if (!question || !answer) return;
    addCard(question, answer);
    setQuestion("");
    setAnswer("");
  };

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % cards.length);
    setShowAnswer(false);
    setUserAnswer("");
  };

  const checkAnswer = () => {
    const correct = cards[index].answer.toLowerCase().trim();
    const input = userAnswer.toLowerCase().trim();

    if (input === correct) {
      addPoints(5);
      setScore((prev) => prev + 1);
      alert("✅ Correct!");
    } else {
      alert(`❌ Incorrect! Answer: ${cards[index].answer}`);
    }

    nextCard();
  };

  if (mode === "quiz") {
    if (cards.length === 0) return <p>No cards yet</p>;
    const current = cards[index];

    return (
      <div>
        <h3>Quiz Mode</h3>
        <p>Score: {score}</p>
        <p><strong>{current.question}</strong></p>

        <input
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />

        <button onClick={checkAnswer}>Submit</button>
        <button onClick={() => setMode("create")}>Exit</button>
      </div>
    );
  }

  if (mode === "study") {
    if (cards.length === 0) return <p>No cards yet</p>;
    const current = cards[index];

    return (
      <div>
        <h3>Study Mode</h3>
        <p>{showAnswer ? current.answer : current.question}</p>

        <button onClick={() => setShowAnswer(!showAnswer)}>Flip</button>
        <button onClick={nextCard}>Next</button>
        <button onClick={() => setMode("create")}>Back</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Create Flashcards</h3>

      <input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <input
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button onClick={handleAdd}>Add Card</button>

      <button onClick={() => setMode("study")}>Study Mode</button>
      <button onClick={() => setMode("quiz")}>Quiz Mode</button>

      {cards.map((card) => (
        <div key={card.id}>
          <p><strong>Q:</strong> {card.question}</p>
          <p><strong>A:</strong> {card.answer}</p>

          <button
            onClick={() => deleteCard(card.id)}
            style={{ backgroundColor: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Flashcards;