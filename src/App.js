import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  // requisição assincrona 
  async function handleSearch() {

    if (input === '') {
      alert("Preencha algum cep!")
      return;
    }

    // try é a tentativa de algo e caso de errado entra na rota do catch
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    } catch {
      alert("Erro ao buscar o CEP...");
      // Retorna o valor do input para vazio.
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className='title'>Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        // (e) = Evento
        //No React, o onChange é um evento utilizado principalmente em elementos de formulário, como <input>, <textarea> e <select>. Ele é disparado sempre que o valor do elemento é alterado, permitindo que você capture essas mudanças e atualize o estado do componente.
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>logradouro: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade/Estado: {cep.localidade} - {cep.uf}</span>

        </main>
      )}

    </div>
  );
}

export default App;
