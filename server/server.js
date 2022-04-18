import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";
import { Helmet } from "react-helmet";

let app = express();

app.get("*", (req, res) => {
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();

  html = html
    .replace("</head>", `${helmet.meta.toString()}</head>`)
    .replace("</head>", `${helmet.title.toString()}</head>`);

  res.send("<!DOCTYPE html>" + html);
});

app.listen(8000);
