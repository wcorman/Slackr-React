import React from 'react';
import {
  // When doing named imports, you can `as` to rename
  // an import in context of a file. As shown, below:
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import SlackShowPage from './SlackShowPage';
import SlackIndexPage from './SlackIndexPage';
import NavBar from './NavBar';


// When building React applications, we create
// a root component that is the ancestor to all the
// components that we create. And, we render that
// component on the page with `ReactDOM.render()`.
// For this application, the `App` serves that role.
function App () {
  return (
    <Router>
      <div className="App">
        <NavBar />
        {/*
          When wrapping routes inside of a sqitch component
          only the first route that matches will be rendered.
          */}
        <Switch>
          <Route exact path="/slacks" component={SlackIndexPage} />
          <Route path="/slacks/:id" component={SlackShowPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
