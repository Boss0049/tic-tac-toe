import { Button, Col, Row, Select, Slider, Switch } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Start(props) {
  const {
    setXO,
    setCurrentXO,
    setPlayer,
    table,
    setTable,
    setArray,
    setNumberRandom,
    generateNumberRandom,
  } = props;

  const changeXO = (checked) => {
    setXO(checked ? "X" : "O");
    setCurrentXO(!checked ? "X" : "O");
  };

  function handleChange(value) {
    setPlayer(value);
  }

  return (
    <div>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col span={10}>
          <h1>Tic Tac Toe</h1>
          <Row justify="space-between" align="middle">
            <Col span={8}>
              <Row justify="end">
                <div style={{ marginBottom: "10px" }}>
                  Do you want to be to :
                </div>
                <div style={{ marginBottom: "10px" }}>How many Player : </div>
                <div style={{ marginBottom: "10px" }}>How many Table :</div>
              </Row>
            </Col>
            <Col span={16}>
              <Row justify="start">
                <Col span={24}>
                  <div style={{ marginBottom: "10px" }}>
                    <Switch
                      checkedChildren="X"
                      unCheckedChildren="O"
                      defaultChecked
                      onChange={changeXO}
                    />
                  </div>
                  <Select
                    defaultValue="Play 1"
                    style={{ width: 200 }}
                    onChange={handleChange}
                  >
                    <Option value={false}>Play 1</Option>
                    <Option value={true}>Play 2</Option>
                  </Select>

                  <Slider
                    defaultValue={table}
                    tooltipVisible
                    onChange={(value) => {
                      setTable(value < 3 ? 3 : value);
                      setArray(value < 3 ? 3 : value);
                      setNumberRandom(generateNumberRandom(value));
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="center">
            <Button>
              <Link to="/game">START</Link>
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Start;
