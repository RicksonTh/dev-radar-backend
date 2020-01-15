module.exports = function parseStringAsArray(arrayAsString) {
  return techs.split(",").map(techs => techs.trim());
};
