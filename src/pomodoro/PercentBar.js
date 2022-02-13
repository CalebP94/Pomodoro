import React from "react";

function PercentBar({ session, focusDuration, breakDuration }) {
  if (!session) return null;

  const duration = (session.label === "Focusing") ? focusDuration : breakDuration;

  function progressPercent() {
    const remaining = session.timeRemaining;
    const durationInSeconds = duration * 60;
    const timeProgressed = durationInSeconds - remaining;
    const percent = Math.round((timeProgressed / durationInSeconds) * 100);
    return percent;
  }

  const style = { width: `${progressPercent()}%`}
  
  return (
    <div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={progressPercent()} // TODO: Increase aria-valuenow as elapsed time increases
              style={style} // TODO: Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PercentBar;