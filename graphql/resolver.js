let todos = [
  { id: 1, name: "Изучить GraphQL", done: false, createdAt: Date.now(), updatedAt: Date.now() },
  { id: 2, name: "Изучить NodeJS", done: false, createdAt: Date.now(), updatedAt: Date.now() }
]

module.exports = {
  getAllTodos() {
    return [
      ...todos
    ]
  },

  addTodo({ name }) {
    const time = Date.now()

    const id = todos.length ? todos[todos.length-1].id : 0

    const todo = {
      id: id + 1,
      name,
      done: false,
      createdAt: time,
      updatedAt: time
    }
    todos.push(todo)
    return todo
  },

  doneTodo({ id, done }) {
    const time = Date.now()

    const newTodos = todos.map(t => t.id == +id ? { ...t, updatedAt: time, done } : t)

    todos = newTodos

    const todo = todos.filter(t => t.id == +id)

    console.table(todos)
    console.table(todo)

    return todo[0]
  },

  deleteTodo({ id }) {
    let filteredTodos = todos.filter(todo => todo.id !== +id)
    todos = [...filteredTodos]

    console.table(todos)
    
    return true
  }
}