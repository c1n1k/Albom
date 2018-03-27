import React from "react";
import { Route } from "react-router-dom";
import List from "./List";

export default () => {
  return (
    <div>
      <Route exact path="/" component={List} />
      {/* <Route exact path="/albom/:id" component={Room} /> */}
    </div>
  );
};
