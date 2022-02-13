import React, { useState } from "react";
import { secondsToDuration, minutesToDuration } from "../utils/duration";


function TimeRemainingLabels({isTimerRunning, breakDuration, focusDuration, session}){
    //console.log("SESSION", session);
    if(!session) return null;
    // const [timeReaminingVar, setTimeRemainingVar] = useState(0);
    // if(!session.timeRemaining){
    //     setTimeRemainingVar(0);
    // }
    // let seconds=secondsToDuration({session.timeRemaining});
    // setTimeRemainingVar(seconds);

    return (

        <div className="row mb-2">
        <div className="col">

          {/* DONE(?): Update message below to include current session (Focusing or On Break) total duration */}
          {
          session?.label === "On Break" ? 
          (<h2 data-testid="session-title">
           On Break for {minutesToDuration(breakDuration)} minutes
          </h2>) :
          (<h2 data-testid="session-title">
          Focusing for {minutesToDuration(focusDuration)} minutes
          </h2>)
          }

          {/* TODO: Update message below correctly format the time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            { secondsToDuration(session?.timeRemaining)} remaining
          </p>
          <p>
            {!isTimerRunning ? 
            (<p>PAUSED</p>) : (<p></p>)
            }
          </p>
        </div>
      </div>
    )
}

export default TimeRemainingLabels;