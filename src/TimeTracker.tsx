import * as React from 'react'
import { TimeTrackerProps } from '../index'

interface TimeTrackerState {
  value: number
  storedValue: string
  start: number | null
}

export default class TimeTracker extends React.Component<
  TimeTrackerProps,
  TimeTrackerState
> {
  intervalId?: number

  constructor(props: TimeTrackerProps, ...args: Array<any>) {
    super(props, ...args)
    this.state = {
      value: props.initialValue || 0,
      storedValue: this.valueToString(props.initialValue || 0),
      start: null,
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  valueToString(value: number) {
    const hours = Math.floor(value / 3600)
    const minutes = String(Math.floor((value % 3600) / 60)).padStart(2, '0')
    const seconds = String((value % 3600) % 60).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  timeUpdateCallBack = () => {
    this.props.onTimeUpdate
      ? this.props.onTimeUpdate(this.state.value, this.state.start)
      : null
  }

  toggleTracker = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    state?: boolean
  ) => {
    this.setState(prevState => {
      if (state === true || (prevState.start === null && state !== false)) {
        this.intervalId = setInterval(this.updateValue, 1000)
        return {
          start: Math.floor(Date.now() / 1000),
        }
      } else {
        clearInterval(this.intervalId)
        return {
          start: null,
        }
      }
    }, this.timeUpdateCallBack)
  }

  updateValue = () => {
    this.setState(
      prevState => ({
        value: prevState.value + 1,
        storedValue: this.valueToString(prevState.value + 1),
      }),
      this.timeUpdateCallBack
    )
  }

  handleInputClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    this.toggleTracker(null, false)
  }

  handleInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    let elementValue = event.target.value
    let elementPieces = elementValue.split(':')
    if (elementPieces.length === 3) {
      let builtValue = +(elementPieces.pop() as string)
      builtValue += 60 * +(elementPieces.pop() as string)
      builtValue += 3600 * +(elementPieces.pop() as string)
      this.setState({ value: builtValue }, this.timeUpdateCallBack)
    } else {
      this.setState(prevState => ({
        storedValue: this.valueToString(prevState.value),
      }))
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ storedValue: event.target.value })
  }

  setTimeTrackerState = (value: number, start?: number) => {
    if (typeof start === 'number') {
      clearInterval(this.intervalId)
      if (start >= 0) {
        this.intervalId = setInterval(this.updateValue, 1000)
      }
    }
    this.setState(prevState => ({
      value: value,
      storedValue: this.valueToString(value),
      start:
        typeof start === 'number'
          ? start >= 0
            ? start
            : null
          : prevState.start,
    }))
  }

  render() {
    const { storedValue, start } = this.state
    const {
      startText,
      stopText,
      wrapClass,
      inputClass,
      buttonClass,
      wrapStyle,
      inputStyle,
      buttonStyle,
    } = this.props
    return (
      <div className={wrapClass || 'time-tracker-wrap'} style={wrapStyle}>
        <input
          className={inputClass || 'time-tracker-input'}
          style={inputStyle}
          type="text"
          value={storedValue}
          onMouseDown={this.handleInputClick}
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
        />
        <button
          onClick={this.toggleTracker}
          type="button"
          className={buttonClass || 'time-tracker-button'}
          style={buttonStyle}
        >
          {start === null ? startText || 'Start' : stopText || 'Stop'}
        </button>
      </div>
    )
  }
}
