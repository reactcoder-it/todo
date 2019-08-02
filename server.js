const express = require('express')
const next = require('next')
const graphqlHTTP = require('express-graphql')
const resolver = require('./graphql/resolver')
const schema = require('./graphql/schema')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(express.json())

    server.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: resolver,
      graphiql: true
    }))

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost: ${port}`)
    })
  })