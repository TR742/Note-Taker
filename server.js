const express = require('express')
const PORT = process.env.PORT || 3001
const noteRoutes  = require('./routes')

const app = express()

app.use(noteRoutes)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);