const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./router");

const app = express();

//conexão com o banco de dados
mongoose.connect(
  "mongodb+srv://dev-rick:rcts1721@cluster0-5nyvr.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    //Dois atributos para removerem mensagens de warning do mongodb
  }
);

app.use(cors());
app.use(express.json());
//Para quer a API entenda reqs em json
app.use(routes);
//Para usar as rotas importadas de Router

app.listen(3333);
//Port utilizada

/*Tipos de parâmetros:
 * 1. Query Params: req.query (filtros, ordenação, paginação...)
 * 2. Route Params: req.params (identificar um recurso no put ou delete)
 * 3. Body: req.body (valores informados por meio da req)
 */
