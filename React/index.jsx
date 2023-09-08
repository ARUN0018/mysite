import React from "react";
import ReactDOM from "react-do/client";

const myElement = (
  <div>
    <h1>Hello world</h1>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(myElement);
