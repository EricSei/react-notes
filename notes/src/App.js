import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AddNote from "./components/AddNote/AddNote";
import AddItem from "./components/AddItem/AddItem";

import Container from "./components/Container/Container";
import "./app.scss";
import EditItem from "./components/EditItem/EditItem";
import ReadItem from "./components/ReadItem/ReadItem";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Container} />
        <Route exact path="/add/note" component={AddNote} />

        <Route exact path="/notes/items/" component={AddItem} />
        <Route exact path="/edit/item" component={EditItem} />
        <Route exact path="/read/item" component={ReadItem} />
      </Switch>
    </Router>
  );
};
export default App;
