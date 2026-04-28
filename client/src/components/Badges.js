function Badges({ points, streak }) {
  // Create an empty list to store earned badges
  const badges = [];

  // Add badges based on streak and points
  if (streak >= 3) badges.push("🔥 3-Day Streak");
  if (points >= 100) badges.push("💪 100 Points Club");
  if (streak >= 7) badges.push("🚀 7-Day Warrior");

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Badges</h3>

      {/* If no badges yet, show message */}
      {badges.length === 0 ? (
        <p>Keep going to unlock badges!</p>
      ) : (
        <div>
          {/* Loop through badges and display each one */}
          {badges.map((badge, index) => (
            <span
              key={index}
              style={{
                display: "inline-block",
                padding: "8px 12px",
                margin: "5px",
                borderRadius: "12px",
                background: "linear-gradient(to right, #a78bfa, #7c3aed)",
                color: "white",
                fontSize: "14px",
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Badges;