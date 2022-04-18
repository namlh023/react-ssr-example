import React from "react";
import { Helmet } from "react-helmet";

export default function Invoices() {
  return (
    <>
      <Helmet>
        <title>Invoices</title>
        <meta name="description" content="Invoices" />
        <meta name="theme-color" content="#E6E6FA" />
      </Helmet>
      <main style={{ padding: "1rem 0" }}>
        <h2>Invoices</h2>
      </main>
    </>
  );
}
