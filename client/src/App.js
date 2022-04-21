import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HowToPlay from "./pages/HowToPlay";
import HallOfFame from "./pages/HallOfFame";
import Auth from "./pages/Auth";
import Game from "./pages/Game";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>

        <Route path="/how-to-play" exact>
          <HowToPlay />
        </Route>

        <Route path="/hall-of-fame">
          <HallOfFame />
        </Route>

        <Route path="/login">
          <Auth />
        </Route>

        <Route path="/game">
          <Game />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;