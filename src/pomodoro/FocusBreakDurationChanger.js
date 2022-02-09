import React from "react";
import { minutesToDuration } from "../utils/duration";

function SetBreakFocusDuration({ focusDuration, breakDuration,breakDurationChanger, focusDurationChanger, session }) {
    return (
        <div className="row">
            <div className="col">
                <div className="input-group input-group-lg mb-2">
                    <span className="input-group-text" data-testid="duration-focus">
                    {/* TODO: Update this text to display the current focus session duration */}
                    Focus Duration: {minutesToDuration(focusDuration)}
                    </span>
                    <div className="input-group-append">
                        {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
                        <button
                            type="button"
                            className="btn btn-secondary decrease-focus"
                            data-testid="decrease-focus"
                            onClick={focusDurationChanger}
                            disabled={session}
                        >
                            <span className="oi oi-minus decrease-focus" />
                        </button>
                        {/* TODO: Implement increasing focus duration and disable during a focus or break session */}
                        <button
                            type="button"
                            className="btn btn-secondary increase-focus"
                            data-testid="increase-focus"
                            onClick={focusDurationChanger}
                            disabled={session}
                        >
                            <span className="oi oi-plus increase-focus"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="float-right">
                    <div className="input-group input-group-lg mb-2">
                        <span className="input-group-text" data-testid="duration-break">
                            {/* TODO: Update this text to display the current break session duration */}
                            Break Duration: {minutesToDuration(breakDuration)}
                        </span>
                        <div className="input-group-append">
                            {/* TODO: Implement decreasing break duration and disable during a focus or break session */}
                            <button
                            type="button"
                            className="btn btn-secondary decrease-break"
                            data-testid="decrease-break"
                            onClick={breakDurationChanger}
                            disabled={session}
                            >
                            <span className="oi oi-minus decrease-break" />
                            </button>
                            {/* TODO: Implement increasing break duration and disable during a focus or break session */}
                            <button
                            type="button"
                            className="btn btn-secondary increase-break"
                            data-testid="increase-break"
                            onClick={breakDurationChanger}
                            disabled={session}
                            >
                            <span className="oi oi-plus increase-break" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SetBreakFocusDuration;