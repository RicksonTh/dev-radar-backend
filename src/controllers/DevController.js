const axios = require("axios");
const Dev = require("../models/Dev");

/* 5 Funções do Controller:
    1. index: listar dados
    2. show: mostrar um único dado
    3. store: criar
    4. update: atualizar
    5. destroy: deletar
 */

module.exports = {
  //Criar dev
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  //Add dev
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
    //Variável com a req do usuário

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiRes = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      //Aqui as crases `` são usadas porque permite que variáveis sejam adicionadas
      //Variável que vai receber a resposta do GitHub

      const { name = login, avatar_url, bio } = apiRes.data;
      //Seleciona os dados que vou utilizar da req

      const techsArray = techs.split(",").map(techs => techs.trim());
      //split() corta o que eu quero da string
      //map() percorre o array
      //trim() corta os espaços antes e

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      //Adiciona um user ao db
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return res.send({ dev });
  },

  //Atualizar dev
  async update(req, res) {
    const { github_username, name, latitude, longitude, techs } = req.query;

    let dev = await Dev.findOne({ github_username });

    const techsArray = techs.split(",").map(techs => techs.trim());

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    dev = await Dev.update({
      name,
      techs: techsArray,
      location
    });

    return res.send({ message: "Dev atualizado com sucesso!" });
  },

  //Deletar dev
  async delete(req, res) {
    const { github_username } = req.query;

    let dev = await Dev.findOne({ github_username });

    dev = await Dev.deleteOne({ github_username: github_username });

    return res.send({ message: "Dev deletado com sucesso!" });
  }
};
