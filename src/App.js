import { Button, Col, Row } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Start from "./pages/Start";
import Game from "./pages/Game";

const generateArray = (count) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push([]);
  }
  return arr;
};

const idx = (i, j, count) => {
  return i * count + j;
};

const AllVictory = (count) => {
  const diagonalWin = [[], []];
  const horizontalWin = generateArray(count);
  const verticalWin = generateArray(count);

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      if (i === j) diagonalWin[0].push(idx(i, j, count));
      if (i === count - j - 1) diagonalWin[1].push(idx(i, j, count));
      horizontalWin[i].push(idx(i, j, count));
      verticalWin[j].push(idx(i, j, count));
    }
  }
  return [...diagonalWin, ...verticalWin, ...horizontalWin];
};

const initialXO = "X";
const initialCurrentXO = "O";
const initialValue = Array(9).fill("");
const initialTable = 3;
const initialNumberRandom = [...Array(9)].map((_, i) => i);

function App() {
  const [isPlayer, setPlayer] = useState(false);
  const [table, setTable] = useState(initialTable);
  const [isWin, setIsWin] = useState([]);
  const [state, setState] = useState(initialValue);
  const [XO, setXO] = useState(initialXO);
  const [currentXO, setCurrentXO] = useState(initialCurrentXO);
  const [isBot, setIsBot] = useState(false);
  const [numberRandom, setNumberRandom] = useState(initialNumberRandom);

  const clickAdd = (target) => {
    let newNumberRandom = numberRandom.filter((ele, idx) => ele !== target);
    const newState = state.map((e, idx) => (target === idx ? XO : e));
    setState(newState);
    setNumberRandom(newNumberRandom);
    setXO(XO === "X" ? "O" : "X");
    setCurrentXO(currentXO === "O" ? "X" : "O");
    setIsBot(!isBot);
  };

  const botRandom = () => {
    let number = Math.floor(Math.random() * numberRandom.length);
    let target = numberRandom[number];
    numberRandom.splice(number, 1);
    setNumberRandom(numberRandom);
    const newState = state.map((ele, idx) => (target === idx ? XO : ele));
    setState(newState);
    setCurrentXO(currentXO === "O" ? "X" : "O");
    setXO(XO === "X" ? "O" : "X");

    setIsBot(!isBot);
  };

  const auto = (value) => {
    let sum = "";
    for (let i = 0; i < table; i++) {
      if (value) sum += `auto `;
      if (!value) sum += `100px `;
    }
    return sum;
  };

  const generateNumberRandom = (count) => {
    return [...Array(count ** 2)].map((_, i) => i);
  };

  const win = (...character) => {
    for (let i = 0; i < character.length; i++) {
      if (currentXO !== state[character[i]]) {
        break;
      }
      if (i + 1 == character.length) {
        return true;
      }
    }
  };

  const setArray = (test) => {
    return setState(Array(test ** 2).fill(""));
  };

  const reset = () => {
    setArray(table);
    setXO(initialXO);
    setCurrentXO(initialCurrentXO);
    setTable(table);
    setNumberRandom(generateNumberRandom(table));
  };

  const hasWinner = () => {
    for (const [...character] of AllVictory(table)) {
      if (win(...character)) {
        alert(state[character[0]] + " " + "Win");
        reset();
        setIsWin([...isWin, state[character[0]]]);
      } else if (numberRandom.length === 0) {
        reset();
        setIsWin([...isWin, "draw"]);
      }
    }
  };

  useEffect(() => {
    if (isBot) isPlayer || botRandom();
    hasWinner();
  }, [state]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Start
            setXO={setXO}
            setCurrentXO={setCurrentXO}
            setPlayer={setPlayer}
            table={table}
            setTable={setTable}
            setArray={setArray}
            setNumberRandom={setNumberRandom}
            generateNumberRandom={generateNumberRandom}
          />
        </Route>
        <Route path="/game">
          <Game
            auto={auto}
            state={state}
            clickAdd={clickAdd}
            reset={reset}
            isWin={isWin}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
