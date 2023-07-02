const axios = require("axios");
const { Type } = require("../db");

const getAllTypes = async () => {

  // //Los traigo en un Array [name]
  // let dbTypes = await Type.findAll();

  // if (dbTypes.length === 0) {
  //   const apiResponse = await axios.get("https://pokeapi.co/api/v2/type");
  //   const apiTypes = apiResponse.data.results;

  //   dbTypes = await Promise.all(
  //     apiTypes.map(async (type) => {
  //       const createdType = await Type.create({ name: type.name }, { fields: ['name'] });
  //       return createdType;
  //     })
  //   );
  // }

  // const types = dbTypes.map((type) => type.name);
  // return types;




// Me los traigo en objetos {id, name}
const typesApi = await axios.get("https://pokeapi.co/api/v2/type");
  const types = typesApi.data.results;

  types.forEach( el => {
    Type.findOrCreate({
      where: {name: el.name}
    })
  })

  const allTypes = await Type.findAll();
  return allTypes;
};
module.exports = { getAllTypes };