const express = require('express')
const app = express()
const port = 3001

app.get('/health-check', (req, res) => {
  res.send('Hello World!')
})

app.get('/foo', (req, res) => {
  res.send('🎙️ ⚽︎')
})

app.get('/', (req, res) => {
  res.send('This is the starting point 🌤️')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})