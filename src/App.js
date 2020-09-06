import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    var now = Date.now().toString();
    const response = await api.post('repositories', {
      "title": `Meu repositorio - ${now}`,
      "url": `http://github.com/meu_repositorio_${now}`,
      "techs": [ "NodeJS", "React", "React Native" ]
    });

    const repo = response.data;
    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    var newRepositories = [...repositories];
    newRepositories = newRepositories.filter(repo => repo.id !== id);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => <li key={repo.id}>
          {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
