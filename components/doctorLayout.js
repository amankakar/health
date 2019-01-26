import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "./HeaderDoctor";

export default props => {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};
