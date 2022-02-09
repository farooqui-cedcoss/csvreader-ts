import React from "react";
import "./App.css";
import FetchButton from "./components/FetchButton";
import GetCSVFile from "./components/GetCSVFile";

function App() {
  return (
    <div className="App">
      {/* <h1>Click button to fetch all data</h1> */}
      <FetchButton />
      <GetCSVFile />
    </div>
  );
}
export default App;
