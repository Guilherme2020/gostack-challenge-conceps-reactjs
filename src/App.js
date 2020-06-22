import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositorys, setRepositorys] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositorys(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const body = {
      title: "github",
      url: "www.github.com",
      techs: ["Angular", "NestJs", "Flutter"],
    };
    const response = await api.post("/repositories", body);
    const repository = response.data;

    setRepositorys([...repositorys, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newRepositories = repositorys.filter(
      (repository) => repository.id !== id
    );
    setRepositorys(newRepositories);
  }
  return (
    <div>
      <ul data-testid="repository-list">
        {repositorys.map((repository) => (
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
