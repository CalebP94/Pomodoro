import React from "react";
import { minutesToDuration } from "../utils/duration";

function FocusDuration({ focusDuration, focusDurationChanger, session }) {
    return (
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
            </div>);
}

export default FocusDuration;