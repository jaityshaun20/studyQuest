function Stats({ points, streak, level }) {
  return (
    <div className="stats">
      <div>⭐ {points} pts</div>
      <div>🔥 {streak} days</div>
      <div>🏆 Lv {level}</div>
    </div>
  );
}

export default Stats;