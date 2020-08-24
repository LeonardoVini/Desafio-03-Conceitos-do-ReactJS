import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(({ data: repositories }) => {
      setRepositories(repositories)
    })
  }, [])

  async function handleAddRepository() {
    const { data: repository } = await api.post('repositories', {
      title: "Desafio Node.js",
      url: "https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      techs: [
        "NodeJS",
        "ReactJS",
        "Angular"
      ]
    })

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    console.log(id)

    await api.delete(`repositories/${id}`)
    setRepositories([...repositories.filter(repository => repository.id !== id)])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
