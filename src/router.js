const { Router } = require("express");
// {} Importar apenas a função de roteamento do Express
const axios = require("axios");
const Dev = require("./models/Dev");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);
routes.put("/devs", DevController.update);
routes.delete("/devs", DevController.delete);

routes.get("/devs", SearchController.index);

module.exports = routes;
