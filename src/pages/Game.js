import { Col, Row } from "antd";
import React from "react";

function Game(props) {
  const { auto, state, clickAdd, reset, isWin } = props;
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={15}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: auto(true),
            gridTemplateRows: auto(false),
            backgroundColor: "#2196F3",
            padding: "10px",
          }}
        >
          {state.map((ele, idx) => {
            return (
              <button
                role="button"
                onClick={() => clickAdd(idx)}
                disabled={state[idx]}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid rgba(0, 0, 0, 0.8)",
                  padding: "20px",
                }}
              >
                {ele}
              </button>
            );
          })}
        </div>

        <button onClick={reset}>Reset</button>
      </Col>
      <Col span={4}>
        <h1>History</h1>
        {isWin.map((ele, idx) => {
          return (
            <div>
              <h2>
                {idx + 1}.{ele}
              </h2>
            </div>
          );
        })}
      </Col>
    </Row>
  );
}

export default Game;
