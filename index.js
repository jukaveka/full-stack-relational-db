const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const { syncModels } = require('./models')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

const errorHandler = require('./middleware/errorHandler')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  await syncModels()
  app.listen(PORT, () => {
    console.log(`Server connected at port ${ PORT }`)
  })
}

start()
