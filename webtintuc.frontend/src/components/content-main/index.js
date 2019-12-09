import React, { Component } from "react";
import HomePage from "./home-page";
import NewsDetail from "./news-detail";
import NewsType from "./news-type";
import SearchNews from "./news-search";
import { Route, Link, BrowserRouter as Router, Switch, useRouteMatch } from "react-router-dom";

export default function MainContent() {

    let { path, url } = useRouteMatch();
    return (
      <Switch>
        <Route exact path={path} component={HomePage} />
        <Route path={`${path}/news/:id`} component={NewsDetail} />
        <Route path={`${path}/newstype/:id`} component={NewsType} />
      </Switch>
    );

}

