import TodosController from '../utils/todos'
import { ToDateTime } from '../utils/intl'
import Head from 'next/head'

export default class extends React.Component {
  state = {
    todos: [],
    text: ''
  }

  todosController = new TodosController()

  async componentDidMount() {
    const todos = await this.todosController.getAll()
    this.setState({ todos })
  }

  onCompleteClick = async (id, done) => {
    const updated = await this.todosController.done(id, !done)
    const newTodos = this.state.todos.map(t => t.id == id ? { ...t, ...updated } : t)
    
    this.setState({ todos: newTodos })
  }

  onChange = (e) => {
    this.setState({ text: e.target.value })
  }

  formSubmit = async (e) => {
    e.preventDefault()

    const todo = await this.todosController.create(this.state.text)

    let copyTodos = [...this.state.todos]
    copyTodos.push(todo)

    this.setState({ todos: copyTodos })
  }

  onDeleteClick = async (id) => {
    const res = this.todosController.delete(id)
    if (res) {
      let filtered = this.state.todos.filter(todo => todo.id !== id)
      this.setState({ todos: filtered })
    }
  }

  render() {
    const { todos, text } = this.state

    console.table(todos)

    return (
      <div>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" />
        </Head>
        <h1>Todos</h1>
        <ul>
          {
            todos.map(todo =>
              <li key={todo.id}>
                {todo.id} {todo.name}{` `}
                <span onClick={() => this.onCompleteClick(todo.id, todo.done)}>
                  {todo.done ? <i className="fas fa-check-square"></i> : <i className="fas fa-square"></i>}
                </span>{` `}
                {ToDateTime(todo.createdAt)} {ToDateTime(todo.updatedAt)}
                <button onClick={() => this.onDeleteClick(todo.id)}>Удалить</button>
              </li>
            )}
        </ul>
        <form onSubmit={this.formSubmit}>
          <input type="text" name="text" value={text} onChange={this.onChange} />
          <input type="submit" value="Добавить" />
        </form>

        <style jsx>{`
          span {
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }
}