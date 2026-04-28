import "./App.css";
import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import CheckIn from "./components/CheckIn";
import Stats from "./components/Stats";
import Badges from "./components/Badges";
import Flashcards from "./components/Flashcards";

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem("points");
    return saved ? JSON.parse(saved) : 0;
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("streak");
    return saved ? JSON.parse(saved) : 0;
  });

  const [lastCheckIn, setLastCheckIn] = useState(() => {
    return localStorage.getItem("lastCheckIn") || "";
  });

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : [];
  });

  const [tasksCompletedToday, setTasksCompletedToday] = useState(0);
  const [cardsStudiedToday, setCardsStudiedToday] = useState(0);
  const [goalCompleted, setGoalCompleted] = useState(false);

  const [activeView, setActiveView] = useState("tasks");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("points", JSON.stringify(points));
  }, [points]);

  useEffect(() => {
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("lastCheckIn", lastCheckIn);
  }, [lastCheckIn]);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);
  useEffect(() => {
  if (points > 0 && points % 50 === 0) {
    alert("🎉 LEVEL UP!");
  }
}, [points]);

// ======================
// USER (LOGIN STATE)
// ======================

// Store the current user 
const [user, setUser] = useState(() => {
  return localStorage.getItem("user") || "";
});

// function to log user in
const handleLogin = (name) => {
  if (!name) return; // don't allow empty name

  localStorage.setItem("user", name); // save name
  setUser(name); // update state
};


  // ======================
  // TASKS
  // ======================
  const addTask = (text, dueDate) => {
    const newTask = {
      id: Date.now(),
      text,
      dueDate,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const completeTask = (id) => {
    let completedNow = false;

    const updatedTasks = tasks.map((task) => {
      if (task.id === id && !task.completed) {
        completedNow = true;
        return { ...task, completed: true };
      }
      return task;
    });

    setTasks(updatedTasks);

    if (completedNow) {
    setPoints((prev) => prev + 10);
    setTasksCompletedToday((prev) => prev + 1);
   alert("✅ +10 XP Task completed!");
  }
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  // ======================
  // FLASHCARDS
  // ======================
  const addCard = (question, answer) => {
    const newCard = {
      id: Date.now(),
      question,
      answer,
    };
    setCards((prev) => [...prev, newCard]);
  };

  const deleteCard = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const addPoints = (amount) => {
    setPoints((prev) => prev + amount);
    setCardsStudiedToday((prev) => prev + 1);
    alert(`📚 +${amount} XP`);
  };

  // ======================
// DAILY GOALS
// ======================
useEffect(() => {
  if (
    tasksCompletedToday >= 3 &&
    cardsStudiedToday >= 5 &&
    !goalCompleted
  ) {
    setPoints((prev) => prev + 20);
    setGoalCompleted(true);
    alert("🎉 Daily Goal Completed!");
  }
}, [tasksCompletedToday, cardsStudiedToday, goalCompleted]);
  // ======================
  // CHECK-IN
  // ======================
  const handleCheckIn = () => {
    const today = new Date().toDateString();

    // Prevent double check-in same day
    if (lastCheckIn === today) return;

    setPoints((prev) => prev + 5);
    alert("🔥 +5 XP Check-in!");

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (!lastCheckIn) {
      // First time ever checking in
      setStreak(1);
    } else if (lastCheckIn === yesterdayStr) {
      // Consecutive day
      setStreak((prev) => prev + 1);
    } else {
      // Missed a day → reset
      setStreak(1);
    }

    // Reset daily goals
    setTasksCompletedToday(0);
    setCardsStudiedToday(0);
    setGoalCompleted(false);

    setLastCheckIn(today);
  };

  const level = Math.floor(points / 50) + 1;
  const progress = ((points % 50) / 50) * 100;

  // if no user, show login screen
// if no user, show login screen
if (!user) {
  return (
    <div className="container">
      <h1 className="logo">✨ StudyQuest</h1>
      {/* show user's name */}
<p>Welcome, {user} 👋</p>

      <h3>Login</h3>

      {/* input for name */}
      <input
        placeholder="Enter your name"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin(e.target.value);
          }
        }}
      />

      <p>Press Enter to continue</p>
    </div>
  );
}

  return (
    <div className="container">
<h1 className="logo">✨ StudyQuest</h1>
{/* logout button */}
<button
  onClick={() => {
    localStorage.removeItem("user"); // remove saved user
    setUser(""); // reset user
  }}
>
  Logout
</button>
      <div className="card">
        <Stats points={points} streak={streak} level={level} />

        <div style={{ marginTop: "10px" }}>
          <div style={{ height: "10px", background: "#ddd" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(to right, #a78bfa, #7c3aed)",              }}
            />
          </div>
          <p>{Math.floor(progress)}% to next level</p>
        </div>
      </div>

      <CheckIn handleCheckIn={handleCheckIn} lastCheckIn={lastCheckIn} />

      <div className="card">
        <h3>Daily Goals</h3>
        <p>Tasks: {tasksCompletedToday}/3</p>
        <p>Flashcards: {cardsStudiedToday}/5</p>
      </div>

      <div className="nav-buttons">
        <button onClick={() => setActiveView("tasks")}>Tasks</button>
        <button onClick={() => setActiveView("flashcards")}>
          Flashcards
        </button>
      </div>

      {activeView === "tasks" && (
        <div className="card">
          <TaskInput addTask={addTask} />
          <TaskList
            tasks={sortedTasks}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
        </div>
      )}

      {activeView === "flashcards" && (
        <Flashcards
          cards={cards}
          addCard={addCard}
          deleteCard={deleteCard}
          addPoints={addPoints}
        />
      )}

      <Badges points={points} streak={streak} />
    </div>
  );
}

export default App;