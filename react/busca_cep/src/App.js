import './App.css';
import {FiSearch} from 'react-icons/fi'

function App() {
  return (
    <div className="App">
      <h1 className>Busca Cep :</h1>
      <div>
        <input
        type="text"
        placeHolder="Digite seu Cep"
        />

        <button ><FiSearch size={25} color='#fff'/></button>
        <div>
          <h2>Cep : </h2>

        </div>
        
      </div>
    </div>
  );
}

export default App;
