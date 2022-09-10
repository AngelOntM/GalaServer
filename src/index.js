import app from "./app.js"
const PORT = 3001

/**
 * Puerto donde funciona la app
 */
app.listen(process.env.PORT || PORT)
console.log('Server listening on port', process.env.PORT || PORT)