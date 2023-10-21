import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {store} from "./redux/store/store";
import {Provider} from "react-redux";

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
