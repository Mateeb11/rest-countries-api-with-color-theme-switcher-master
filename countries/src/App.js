import "./App.css";

import Header from "./Component/Header/Header";
import Filter from "./Component/Filter/Filter";
import Countries from "./Component/Countries/Countries";

function App() {
  return (
    <div className="App">
      <main className="content">
        <Header></Header>
        <Filter></Filter>
        <Countries></Countries>
      </main>
    </div>
  );
}

export default App;
