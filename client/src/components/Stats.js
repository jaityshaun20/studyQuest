function Stats({ points, streak, level }) {
  return (
    // Container for stats (points, streak, level)
    <div className="stats">
      
      {/* Points earned */}
      <div>⭐ {points} pts</div>

      {/* Daily streak */}
      <div>🔥 {streak} days</div>

      {/* Current level */}
      <div>🏆 Lv {level}</div>

    </div>
  );
}

export default Stats;