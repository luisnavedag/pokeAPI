const axios = require("axios");
const { Type } = require("../db");

const getAllTypes = async () => {
    let dbTypes = await Type.findAll();
  
    if (dbTypes.length === 0) {
      const apiResponse = await axios.get("https://pokeapi.co/api/v2/type");
      const apiTypes = apiResponse.data.results;
  
      dbTypes = await Promise.all(
        apiTypes.map(async (type) => {
          const createdType = await Type.create({ name: type.name }, { fields: ['name'] });
          return createdType;
        })
      );
    }
  
    const types = dbTypes.map((type) => type.name);
    return types;
  };

module.exports = { getAllTypes };