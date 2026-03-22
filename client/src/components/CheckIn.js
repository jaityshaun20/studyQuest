function CheckIn({ handleCheckIn, lastCheckIn }) {
  const today = new Date().toDateString();

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>Daily Check-In</h3>
      {lastCheckIn === today ? (
        <p>✅ Checked in today!</p>
      ) : (
        <button onClick={handleCheckIn}>Check In</button>
      )}
    </div>
  );
}

export default CheckIn;