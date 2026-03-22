function Badges({ points, streak }) {
  const badges = [];

  if (streak >= 3) badges.push("🔥 3-Day Streak");
  if (points >= 100) badges.push("💪 100 Points Club");
  if (streak >= 7) badges.push("🚀 7-Day Warrior");

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Badges</h3>
      {badges.length === 0 ? (
        <p>No badges yet</p>
      ) : (
        badges.map((badge, index) => <p key={index}>{badge}</p>)
      )}
    </div>
  );
}

export default Badges;