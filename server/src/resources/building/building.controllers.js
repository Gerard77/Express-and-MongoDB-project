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
      const city = await cityControllers.exportedfunc.findOne_ForBuilding(newBuilding.city_id);
      if(city === undefined){
        res.status(500).json({ error: "Creation failed, city unexistant" });
        return;
      }
      const building_doc = await Building.create(
            {
            name: newBuilding.name,
            text: newBuilding.text,
            city: city
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
        const building_doc = await Building.find({"city._id":id});
        res.status(200).json({ results: building_doc });
    } catch (e) {
        console.log(e);
      res.status(500).json({ error: "Internal error" });
    }
  }

  const findAllBuildingsFromCity_ForCity = async(id) =>{
    try {
        const building_doc = await Building.find({"city._id":id},{"city.$": 1});
        return building_doc;
    } catch (e) {
        console.log(e);
    }
  }

  const deleteBuilding = async(req, res) => {
    try {
      const { id } = req.params;
      const building_doc = await Building.findByIdAndDelete(id);
      if (!building_doc) {
        return res.status(404).json({ error: "Not found" });
      }
      res.status(200).json({results: [building_doc] });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Deletion failed" });
    }
  }

  const deleteBuildings_ForCity = async(data) => {
    try {
      console.log("data:" + data);
      var building_doc = "";
      data.forEach(async(item)=>{
        building_doc = await Building.findByIdAndDelete(item._id);
        console.log("deleted");
      });
      if (!building_doc) {
        console.log("No building found");
        return undefined;
      }
      return building_doc;
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Deletion failed" });
    }
  }

  const updateBuilding = async (req, res) => {
    try {
      const { id } = req.params;
      if('city' in req.body){
        //Avoid user trying to inject city
        delete req.body['city'];
      }
      const building_doc = await Building.findOneAndUpdate({ _id: id }, req.body, { new: true });
      if (!building_doc) {
        return res.status(404).json({ error: "Building not found" });
      }
      res.status(200).json({ results: [building_doc] });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Cannot update required building" });
    }
  }

  const updateBuilding_ForCity = async(id, city) =>{
    try {
      const building_doc = await Building.findOneAndUpdate({ _id: id }, {city: city}, { new: true });
      if (!building_doc) {
        console.log("No buildings to update");
        return undefined;
      }
    } catch (e) {
        console.log(e);
    }
  }

  const findOne = async(req, res) => {
    try {
      const {id} = req.params;
      const building_doc = await Building.findOne({"id":id})
      if(!building_doc){
        return res.status(404).json({ error: "Building not found" });
      }
      res.status(200).json({ results: [building_doc] });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "Internal error" });
    }
  }

  module.exports = {
    createBuilding,
    findAllBuildingsFromCity,
    findMany,
    findAllBuildingsFromCity_ForCity,
    updateBuilding_ForCity,
    findOne,
    updateBuilding,
    deleteBuilding,
    deleteBuildings_ForCity
  }