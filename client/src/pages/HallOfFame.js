import { useEffect } from "react";

import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import Scores from "../components/scores/Scores";

import { getTopFiveScores } from "../lib/api";

const HallOfFame = () => {
  const {
    sendRequest,
    status,
    data: topFiveScores,
    error,
  } = useHttp(getTopFiveScores, true);

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

  if (
    status === "completed" &&
    (!topFiveScores || topFiveScores.length === 0)
  ) {
    return <p className="centered focused">No Scores Found</p>;
  }

  return <Scores topFiveScores={topFiveScores} />;
};

export default HallOfFame;
