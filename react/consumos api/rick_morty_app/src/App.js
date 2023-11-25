import logo from 'https://commons.wikimedia.org/wiki/File:Rick_and_Morty.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Conheça <code> O UNIVERSO </code> de Ricky and Morty.
        </p>
        <a
          className="btn"
          href="./home"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
