import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { Helmet } from "react-helmet";
import App from "../src/App";

const PORT = 8000;

const app = express();

app.use("^/$", (req, res, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }

    const app = ReactDOMServer.renderToString(<App />);
    const helmet = Helmet.renderStatic();
    let result = data.replace(
      '<div id="root"></div>',
      `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
    );

    const metaTagRegex = /^<meta.*>$/g;

    console.log("result", result.match(metaTagRegex));

    return res.send(
      result
        .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        .replace(metaTagRegex, `${helmet.meta.toString()}`)
        .replace("</head>", `${helmet.title.toString()}</head>`)
        .replace("</head>", `${helmet.script.toString()}</head>`)
    );
  });
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
