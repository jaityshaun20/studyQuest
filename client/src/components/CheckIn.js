function CheckIn({ handleCheckIn, lastCheckIn }) {
  // Get today's date
  const today = new Date().toDateString();

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <h3>Daily Check-In</h3>

      {/* If already checked in today, show message */}
      {lastCheckIn === today ? (
        <p style={{ color: "#7c3aed", fontWeight: "bold" }}>
          ✅ Checked in today!
        </p>
      ) : (
        // Otherwise show check-in button
        <button onClick={handleCheckIn}>Check In</button>
      )}
    </div>
  );
}

export default CheckIn;