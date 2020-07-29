import React from "react";
import "../App.css";

import MinuteEditor from "./MinuteEditor";
import Timer from "./Timer";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      isPlaying: false,
    };
  }

  onReset = () => {
    this.setState(prevState => {
      return {
        breakLength: 5,
        sessionLength: 25,
        isPlaying: false,
      }
    })
  }

  onChangeBreakLength = (number) => {
    this.setState((prevState) => {
      return {
        breakLength: number,
      };
    });
  };

  onChangeSessionLength = (number) => {
    this.setState((prevState) => {
      return {
        sessionLength: number,
      };
    });
  };

  onSetPlayState = (isPlaying) => {
    this.setState((prevState) => {
      return { isPlaying };
    });
  };

  render() {
    return (
      <main>
          <div className="clock-container">
            <h2>
              Pomodoro
              <br />
              Clock
            </h2>
          </div>
          <section className="interval-length-container">
            <MinuteEditor
              title="Break"
              isPlaying={this.state.isPlaying}
              value={this.state.breakLength}
              onMinuteChanged={this.onChangeBreakLength}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <MinuteEditor
              title="Session"
              isPlaying={this.state.isPlaying}
              value={this.state.sessionLength}
              onMinuteChanged={this.onChangeSessionLength}
            />
          </section>
          <Timer
            sessionLength={this.state.sessionLength}
            breakLength={this.state.breakLength}
            isPlaying={this.state.isPlaying}
            onSetPlayState={this.onSetPlayState}
            resetTimer={this.onReset}
          />
      </main>
    );
  }
}
