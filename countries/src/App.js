import "./App.css";
import "react-material-symbols/dist/rounded.css";

import Header from "./Component/Header/Header";
import Content from "./Component/Content/Content";

function App() {
  return (
    <div className="App">
      <main className="content">
        <Header></Header>
        <Content></Content>
      </main>
    </div>
  );
}

export default App;
