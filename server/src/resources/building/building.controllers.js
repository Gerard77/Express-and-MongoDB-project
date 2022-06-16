const Building = require('./building.model');
const cityControllers = require("../city/city.controllers");

const findMany = async (req, res) => {
    try {
      const buildings_docs = await Building.find().lean().exec();
      res.status(200).json({ results: buildings_docs });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: 'Internal error' });
    }
}
  
const createBuilding = async(req, res) => {
    try {
      const newBuilding = req.body;
      const city = await cityControllers.findOneForBuilding(newBuilding.city_id);
      if(city === undefined){
        res.status(500).json({ error: "Creation failed" });
        return;
      }
      const building_doc = await Building.create(
            {
            city: city,
            name: newBuilding.name,
            text: newBuilding.text
            }
        );
      res.status(200).json({results: [building_doc] });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Creation failed" });
    }
  }

  const findAllBuildingsFromCity = async(req, res) =>{
    try {
        const {id} = req.params;
        const building_doc = await Building.find({"city._id":id},{"city.$": 1});
        res.status(200).json({ results: building_doc });
    } catch (e) {
        console.log(e);
      res.status(500).json({ error: "Internal error" });
    }
  }

  module.exports = {
    createBuilding,
    findAllBuildingsFromCity,
    findMany
  }