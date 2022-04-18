import React from "react";
import { Helmet } from "react-helmet";

export default function Expenses() {
  return (
    <>
      <Helmet>
        <title>Expenses</title>
        <meta name="description" content="Expenses" />
        <meta name="theme-color" content="#E6E6FA" />
      </Helmet>
      <main style={{ padding: "1rem 0" }}>
        <h2>Expenses</h2>
      </main>
    </>
  );
}
