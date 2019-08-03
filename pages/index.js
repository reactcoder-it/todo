import TodosController from '../utils/todos'
import Head from 'next/head'
import TodoCard from '../components/TodoCard'

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

  onComplete = async (id, done) => {
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

  onDelete = async (id) => {
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
        <div className="todolist">
          <h1>Список задач</h1>
          <form onSubmit={this.formSubmit}>
            <input type="text" name="text" value={text} onChange={this.onChange} />
            <input type="submit" value="Добавить" />
          </form>
          <div className="todoitems">
            {
              todos.map(todo =>
                <TodoCard key={todo.id} todo={todo} onComplete={this.onComplete} onDelete={this.onDelete} />
              )
            }
          </div>
        </div>

        <style jsx global>{`
          *, *:after, *:before {
            box-sizing: border-box;
          }
          body {
            padding: 0;
            margin: 0;
            font-family: "Futura PT", Verdana, sans-serif;
          }
        `}</style>
        <style jsx>{`
          .todolist {
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          form {
            width: 100%;
            box-shadow: 0px 3px 6px rgba(0,0,0,.2);
            padding: .5rem;
            border-radius: 5px;
            margin-bottom: .5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          input[type=text] {
            flex: 1;
            font-family: "Futura PT", Verdana, sans-serif;
            border: none;
            background: none;
            padding: .5rem;
            outline: 0;
            border-bottom: 2px solid rgba(0,0,0,.2);
          }
          .input[type=text]:focus {
            background-color: rgba(0,0,0,.17);
          }
          input[type=submit] {
            margin-left: .5rem;
          }
          .todoitems {
            display: flex;
            flex-direction: column-reverse;
          }
        `}</style>
      </div>
    )
  }
}