import React from "react";
import "./App.css";
import Home from "./components/Home";
import Chat from "./components/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div id="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/chat" component={Chat} />
            </Switch>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
