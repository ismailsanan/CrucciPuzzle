import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import Difficulties from "./Difficulties";
import LoadingSpinner from "../UI/LoadingSpinner";

import { getGameDifficulties } from "../../lib/api";

const GameGrid = (props) => {
  const {
    sendRequest,
    status,
    data: gameDifficulties,
    error,
  } = useHttp(getGameDifficulties, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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

  return <Difficulties gameDifficulties={gameDifficulties} />;
};

export default GameGrid;
