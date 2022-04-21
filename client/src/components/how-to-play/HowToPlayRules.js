import { gameRules } from "../../utils/game-rules";

import Card from "../UI/Card";

const HowToPlayRules = () => {
  return (
    <>
      {gameRules.map((rule, index) => {
        return <Card key={index}>{rule}</Card>;
      })}
    </>
  );
};

export default HowToPlayRules;
