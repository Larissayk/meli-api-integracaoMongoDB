const app = require("./src/app")
const port = process.env.port || 5000

app.listen(port, function() {
  console.log(`app está rodando na porta ${port}`)
})
