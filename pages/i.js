import fetch from 'isomorphic-unfetch'

export default class IndexPage extends React.Component {
  state = {
    users: [],
    name: '',
    email: ''
  }

  async componentDidMount() {
    const query = `
      query {
        test {
          users {
            email
            name
          }
        }
      }
    `

    const res = await fetch('/graphql', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ query })
    })

    const {
      data: {
        test: {
          users
        }
      }
    } = await res.json()

    this.setState({ users })
  }

  onChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState({
      [name]: value
    })
  }

  onSubmit = async (e) => {
    e.preventDefault()

    const { name, email, users } = this.state

    const query = `
      mutation {
        addTestUser(user: { name: "${name}", email: "${email}" }) {
          email
        }
      }
    `

    const res = await fetch('/graphql', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ query })
    })

    const { data: { addTestUser : { email: newEmail } } } = await res.json()

    const addUsers = [...users]
    addUsers.push({ email: newEmail })

    this.setState({ users: addUsers })

  }

  render() {
    const { users, name, email } = this.state
    return (
      <div>
        <h1>Hello world!</h1>
        <ul>
          {
            users && users.map((user, i) => <li key={i}>{user.name} [{user.email}]</li>)
          }
        </ul>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="name" value={name} onChange={this.onChange} />
          <input type="email" name="email" value={email} onChange={this.onChange} />
          <input type="submit" value="Отправить" />
        </form>
      </div>
    )
  }
}