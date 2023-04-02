import { useState } from "react";

import "./App.css";
import "react-material-symbols/dist/rounded.css";

import Header from "./Component/Header/Header";
import Content from "./Component/Content/Content";

function App() {
  const [mode, setMode] = useState(false);
  return (
    <div className={`App ${mode && "lightMode"}`}>
      <Header mode={mode} setMode={setMode}></Header>
      <main className="content">
        <Content mode={mode}></Content>
      </main>
    </div>
  );
}

export default App;
