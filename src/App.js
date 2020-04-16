import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  // Valor inicial, decorator set
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);
  
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      likes: 0,
      techs: [ 'PHP' ],
      title: `Respositório ${Date.now()}`,
      url: 'https://github.com/DaviGSilva/reactjs_challenger01'
    });

    const repos = response.data;

    setRepositories([...repositories, repos]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`, {});

    if (response.status === 204)
    setRepositories(
      repositories.filter(repos => repos.id !== id)
    );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repos =>
            <li key={repos.id}>
              {repos.title}

              <button onClick={() => handleRemoveRepository(repos.id)}>Remover</button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
