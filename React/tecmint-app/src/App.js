import logo from "./logo001.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <strong>Hi Welcome</strong>&nbsp;to my project{" "}
        </p>
        <a className="App-link" href="./slide">
          Show Details
        </a>
      </header>
    </div>
  );
}

export default App;
