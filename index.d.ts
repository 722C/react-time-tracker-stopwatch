import * as React from 'react'

export interface TimeTrackerProps extends React.Props<TimeTracker> {
  startText?: string
  stopText?: string
  onTimeUpdate?: (value: number, startTimestamp: number | null) => void
  initialValue?: number
  initialStartTimestamp?: number
  wrapClass?: string
  inputClass?: string
  buttonClass?: string
  wrapStyle?: React.CSSProperties
  inputStyle?: React.CSSProperties
  buttonStyle?: React.CSSProperties
}

declare class TimeTracker extends React.Component<TimeTrackerProps, any> {
  setTimeTrackerState: (value: number, startTimestamp?: number) => void
}

declare module 'react-time-tracker-stopwatch' {}

export default TimeTracker
