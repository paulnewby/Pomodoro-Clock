import React from "react";

function MinuteEditor(props) {
  function increase() {
    if (props.value === 60) {
      return;
    }
    props.onMinuteChanged(props.value+1);
  }

  function decrease() {
    if (props.value === 1) {
      return;
    }
    props.onMinuteChanged(props.value-1);
  }

  return (
    <section>
      <h4>{props.title}</h4>
      <section className="interval-container">
        <button
          disabled={props.isPlaying === true ? "disabled" : ""}
          onClick={decrease}
        >
          Down
        </button>
        <p className="interval-length">{props.value}</p>
        
        <button
          disabled={props.isPlaying === true ? "disabled" : ""}
          onClick={increase}
        >
          Up
        </button>
      </section>
      <h4>Length</h4>

    </section>
  );
}

export default MinuteEditor;
