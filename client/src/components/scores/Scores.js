import classes from "./Scores.module.css";

const Scores = (props) => {
  const topFiveScores = props.topFiveScores;

  return (
    <>
      <table className={classes.styledTable}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Difficulty</th>
            <th>Grid</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {topFiveScores.map((score, index) => {
            return (
              <tr key={index}>
                <td>{score.username}</td>
                <td>{score.description}</td>
                <td>
                  {score.row}x{score.column}
                </td>
                <td>{score.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Scores;
