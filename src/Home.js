import Row from "./Row";
import Banner from "./Banner";
import Nav from "./Nav";
import requests from "./requests";
import React from "react";

function Home() {
  return (
    <div>
      <Nav />
      <Banner />
      <Row isTrending title="Trending" fetchUrl={requests.fetchTrending} />
      <Row title="Action Movies" fetchUrl={requests.fetchAction} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedy} />
      <Row title="Sci-Fi Movies" fetchUrl={requests.fetchSciFi} />
    </div>
  );
}

export default Home;
