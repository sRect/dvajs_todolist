import { Route, Router, Switch, Link } from "dva/router";
import Todos from "./routes/Todos";
import Count from './routes/Count';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <>
        <Link to="/">home</Link> | <Link to="/count">count</Link>
        <Switch>
          <Route path="/" exact component={Todos} />
          <Route path="/count" exact component={Count} />
        </Switch>
      </>
    </Router>
  );
}

export default RouterConfig;
