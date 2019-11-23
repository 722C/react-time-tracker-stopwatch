# react-time-tracker-stopwatch

A React and TypeScript based stopwatch for time tracking.

## Installation

```bash
npm install --save react-time-tracker-stopwatch
# or
yarn add react-time-tracker-stopwatch
```

## Usage

Styling is not included, but with only three internal elements and a wide array of properties to modify the styling of said elements, this should be fairly simple to work into whatever project.

```jsx
import * as React from 'react';
import TimeTracker from 'react-time-tracker-stopwatch';

class MyTimer extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.timeTracker = React.createRef();
  }

  render() {
    return (
      <div>
        <TimeTracker
          onTimeUpdate={(...args) => console.log(args)}
          ref={this.timeTracker}
        >
        <button
          onClick={() => this.timeTracker.current.setTimeTrackerState(0)}
        >
          Reset to 0:00:00 but don't change whether or not the tracker is running.
        </button>
        <button
          onClick={() => this.timeTracker.current.setTimeTrackerState(0, 0)}
        >
          Reset to 0:00:00 but make sure the tracker is running.
        </button>
        <button
          onClick={() => this.timeTracker.current.setTimeTrackerState(0, -1)}
        >
          Reset to 0:00:00 but make sure the tracker is not running.
        </button>
        <button
          onClick={() => this.timeTracker.current.setTimeTrackerState(3600, -1)}
        >
          Reset to 1:00:00 but make sure the tracker is not running.
        </button>
      </div>
    )
  }
}
```

### Props

| Prop         | Type                                                    | Description                                                                                                                                                                                                                                                                       |
| ------------ | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| startText    | string?                                                 | Text for the control button to start the timer. Defaults to `Start`.                                                                                                                                                                                                              |
| stopText     | string?                                                 | Text for the control button to stop the timer. Defaults to `Stop`.                                                                                                                                                                                                                |
| initialValue | number?                                                 | The initial value of the timer in seconds. Defaults to `0`.                                                                                                                                                                                                                       |
| wrapClass    | string?                                                 | The class of the `div` element wrapping the component. Defaults to `time-tracker-wrap`.                                                                                                                                                                                           |
| inputClass   | string?                                                 | The class of the `input` element of the component. Defaults to `time-tracker-input`.                                                                                                                                                                                              |
| buttonClass  | string?                                                 | The class of the `button` element of the component. Defaults to `time-tracker-button`.                                                                                                                                                                                            |
| wrapStyle    | React.CSSProperties?                                    | Inline styles to be passed to the wrapping `div` element.                                                                                                                                                                                                                         |
| inputStyle   | React.CSSProperties?                                    | Inline styles to be passed to the `input` element of the component.                                                                                                                                                                                                               |
| buttonStyle  | React.CSSProperties?                                    | Inline styles to be passed to the `button` element of the component.                                                                                                                                                                                                              |
| onTimeUpdate | (value: number, startTimestamp: number \| null) => void | An update handler for the component. Will be called when the time updates. `value` is the current value of the component in seconds. `startTimestamp` is the UNIX timestamp of the most recent time the tracker started running in seconds or `null` if the timer is not running. |

### Member Functions

| Function            | Signature                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| setTimeTrackerState | (value: number, startTimestamp?: number) => void | A function used to set the `value` of the time tracker in seconds and control the state of the tracker. The `startTimestamp` argument can be used to control the running state of the time tracker with the following rules: a number greater than or equal to zero will start the timer with the given `startTimestamp`, a number less than zero will stop the timer, and `undefined` (including if no value is passed) will not affect the state of time tracker. |
