import React from "react";

let noOfRepetitions = 2;

let audio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');

audio.addEventListener('ended', function() {
  noOfRepetitions = noOfRepetitions-1;
  if (noOfRepetitions > 0) {
      this.currentTime = 0;
      this.play()};
}, false);




class Timer extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isSession: true,
      timerSecond: props.sessionLength * 60,
      intervalId: 0,
    };
  }

  

  
  componentDidUpdate(prevProps) {
    if (prevProps.sessionLength !== this.props.sessionLength && this.state.isSession) {
      this.setState({
        timerSecond: this.props.sessionLength * 60
      })
    }
    else if (prevProps.breakLength !== this.props.breakLength && !this.state.isSession) {
      this.setState({
        timerSecond: this.props.breakLength * 60
      })
    }
  }


  onToggleSessionState = () => {    
    audio.play();
    this.setState((prevState) => {
      const isSession = !prevState.isSession;
      return {
        isSession: isSession,
        timerSecond: (isSession ? this.props.sessionLength : this.props.breakLength) * 60 
      }
    });
    this.playTimer();
  }

  playTimer = () => {
    this.stopTimer();
    let intervalId = setInterval(this.decreaseTimer, 1000);
    this.props.onSetPlayState(true);
    this.setState({
      intervalId: intervalId
    });
  };


  decreaseTimer = () => {
    switch (this.state.timerSecond) {
      case 0:
        this.onToggleSessionState();

        break;
      default:
        this.setState((prevState) => {
          return {
            timerSecond: prevState.timerSecond - 1,
          };
        });
        break;
    }
  };

  stopTimer= () => {
    clearInterval(this.state.intervalId);
    this.props.onSetPlayState(false);
  }

  resetTimer = () => {
    this.stopTimer();
    this.props.resetTimer();
    this.props.onSetPlayState(false);
    this.setState({
      isSession: true,
      timerSecond: this.props.sessionLength * 60
    });
  }

  formatNumber = (num) => {
    return num.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
  }



  render() {
    return (
      <section className="timer-items-formatting">
        <section className="timer-container">
          <h4 className="timer-text">{this.state.isSession === true ? "Session" : "Break"}</h4>
          <span className="timer">{this.formatNumber(Math.floor(this.state.timerSecond/60))}</span>
          <span className="timer">:</span>
          <span className="timer">{this.formatNumber(this.state.timerSecond % 60)}
          </span>
        </section>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <section className="timer-actions">
          <button onClick={this.playTimer}>Play</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={this.stopTimer}>Stop</button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={this.resetTimer}>Reset</button>
        </section>
      </section>
    );
  }
}

export default Timer;
