import React, { Component } from "react";
import HomePage from "./home-page";
import NewsDetail from "./news-detail";
import NewsType from "./news-type";
import SearchNews from "./news-search"
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

class MainContent extends Component {
  render() {
    return (
      <Route>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/news/:id" component={NewsDetail} />
          <Route path="/newstype/:id" component={NewsType} />
        
          {/* <Route path="/news?q" component={SearchNews} /> */}
        </Switch>
      </Route>
    );
  }
}

export default MainContent;
