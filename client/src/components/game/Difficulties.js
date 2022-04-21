import { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";

import LoadingSpinner from "../UI/LoadingSpinner";
import GameGridBoard from "./GameGridBoard";

import { getGameBoard } from "../../lib/api";

import Card from "../UI/Card";
import classes from "./Difficulties.module.css";

const Difficulties = (props) => {
  const difficulties = props.gameDifficulties;

  const [difficulty, setDifficulty] = useState(difficulties[0].id);

  const {
    sendRequest,
    status,
    data: gameBoard,
    error,
  } = useHttp(getGameBoard, true);

  useEffect(() => {
    sendRequest(difficulty);
  }, [sendRequest, difficulty]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  const selectedDiffStyle = {
    backgroundColor:"orange"
  }
  return (
    <>
      <Card>
        <ul className={classes.nav}>
          {difficulties.map((diff, index) => {
            return (
              <li style={difficulty === diff.id ? selectedDiffStyle : null } onClick={() => setDifficulty(diff.id)} key={index}>
                {diff.description}
              </li>
            );
          })}
        </ul>
      </Card>
      <GameGridBoard gameBoard={gameBoard} diff={difficulty} />
    </>
  );
};

export default Difficulties;
