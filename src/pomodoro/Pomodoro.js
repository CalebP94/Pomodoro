import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { secondsToDuration } from "../utils/duration";
import SetBreakFocusDuration from "./FocusBreakDurationChanger";
import PercentBar from "./PercentBar";
import TimeRemainingLabels from "./TimeRemainingLabels";
// These functions are defined outside of the component to ensure they do not have access to state
// and are, therefore, more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher-order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   * allows for recurring session after setSession component is called...
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60, //TODO(??)...seconds to minutes function... 
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60, //TODO(??)...seconds to minutes function
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  // const increaseFocusDuration = () => setFocusDuration(focusDuration + 5)

  // const decreaseFocusDuration = () => setFocusDuration(focusDuration - 5)
  
  // const increaseBreakDuration = () => setBreakDuration(breakDuration + 5)

  // const decreaseBreakDuration = () => setBreakDuration(breakDuration - 5);



  const focusDurationChanger = (event) => {
    event.preventDefault();
    if (!isTimerRunning) {
      const buttonClasses = event.target.classList;
      if (buttonClasses.contains("increase-focus")) {
        setFocusDuration(currentFocusDuration => Math.min(60, (currentFocusDuration + 5)));
      } else {
        setFocusDuration(currentFocusDuration => Math.max(5, (currentFocusDuration - 5)));
      }
    }
  }

  const breakDurationChanger = (event) => {
    event.preventDefault();
    if (!isTimerRunning) {
      const buttonClasses = event.target.classList;
      if (buttonClasses.contains("increase-break")) {
        setBreakDuration(currentBreakDuration => Math.min(15, (currentBreakDuration + 1)));
      } else {
        setBreakDuration(currentBreakDuration => Math.max(1, (currentBreakDuration - 1)));
      }
    }
  }

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You won't need to make changes to the callback function
   * 
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        //restarts
        return setSession(nextSession(focusDuration, breakDuration));
      }
      //subtracts 1 each time... 
      return setSession(nextTick);
    },
    isTimerRunning ? 100 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   * 
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      //console.log(prevState)
      //when playPause response to onClock, prevState is set as the opposite of what it was previously... originally it is false from setIsTimerRunning(false)
      const nextState = !prevState; //next state is equal to falsy of prevState... so if prevState is null then nextState is true
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session. sets values of the original session... 
          // in all cases it starts from th beginning as null... and thus starts as Focusing in
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      //returns false
      return nextState;
    });
  }

  function stop(){
    setIsTimerRunning(() => {
      return false
    });

    setSession(() => {
      return null
    })
  }


  return (
    <div className="pomodoro">
        <SetBreakFocusDuration 
          focusDuration = {focusDuration}
          focusDurationChanger = {focusDurationChanger}
          session = {session}
          breakDuration = {breakDuration}
          breakDurationChanger = {breakDurationChanger}
        />

      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              onClick={stop}
            >
            <span className="oi oi-media-stop" />
            </button>
            </div>
          </div>
        </div>
      <div>
        {/* DONE(?): This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        <TimeRemainingLabels
          breakDuration={breakDuration}
          focusDuration={focusDuration}
          session = {session}
        />
      </div>
        <PercentBar 
        session = {session}
        focusDuration = {focusDuration}
        breakDuration = {breakDuration}
        isTimerRunning = {isTimerRunning}
        />
    </div>
  );
}

export default Pomodoro;
