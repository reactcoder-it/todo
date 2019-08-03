import fetch from 'isomorphic-unfetch'

class Todo {
  static async run(query) {
    const res = await fetch('/graphql', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ query })
    })
    return await res.json()
  }

  async create(name) {
    const query = `
      mutation {
        addTodo(name: "${name}") {
          id name done createdAt updatedAt
        }
      }
    `
    
    const { data: { addTodo } } = await Todo.run(query)

    return addTodo ? addTodo : null
  }

  async getAll() {
    const query = `
      query {
        getAllTodos {
          id name done createdAt updatedAt
        }
      }
    `

    const { data: { getAllTodos } } = await Todo.run(query)

    return getAllTodos ? getAllTodos : []
  }

  async done(id, value) {
    const query = `
      mutation {
        doneTodo(id: ${id}, done: ${value}) {
          id name done createdAt updatedAt
        }
      }
    `

    const { data: { doneTodo } } = await Todo.run(query)
    return doneTodo ? doneTodo : null
  }

  async delete(id) {
    const query = `
      mutation {
        deleteTodo(id: ${id})
      }
    `

    const { data: { deleteTodo } } = await Todo.run(query)
    return deleteTodo ? deleteTodo : null
  }
}

export default Todo