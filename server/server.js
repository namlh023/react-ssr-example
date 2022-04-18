import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { Helmet } from "react-helmet";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";

const PORT = 8000;

const app = express();

app.get("*", (req, res) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Some error happened");
    }

    const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    );
    const helmet = Helmet.renderStatic();

    const metaTagRegex = /<meta[^/>]*\/>/gms;
    const titleTagRegex = /<title>.*<\/title>/gms;

    let result = data.replace(metaTagRegex, "").replace(titleTagRegex, "");

    return res.send(
      result
        .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        .replace("</head>", `${helmet.meta.toString()}</head>`)
        .replace("</head>", `${helmet.title.toString()}</head>`)
    );
  });
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
