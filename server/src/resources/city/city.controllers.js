const CityStructures = require('./city.model');
const City = CityStructures.model_city;
const Building = require('../building/building.controllers');

//find all cities
const findAll = async (req, res) => {
  try {
    const cities_docs = await City.find().lean().exec();
    res.status(200).json({ results: cities_docs });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal error' });
  }
}

//createCity
const createCity = async(req, res) => {
  try {
    const newCity = req.body;
    const city_doc = await City.create(newCity);
    res.status(200).json({results: [city_doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Creation failed" });
  }
}

//Delete city and its buildings
const deleteCity = async(req, res) => {
  try {
    const { id } = req.params;
    const city_doc = await City.findByIdAndDelete(id);
    if (!city_doc) {
      return res.status(404).json({ error: "Not found" });
    }
    const building_doc_all = await Building.findAllBuildingsFromCity_ForCity(city_doc._id);
    const building_doc_delete = await Building.deleteBuildings_ForCity(building_doc_all);
    res.status(200).json({results: [city_doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Deletion failed" });
  }
}

//update city and its buildings if necessary
const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city_doc = await City.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!city_doc) {
      return res.status(404).json({ error: "City not found" });
    }else{
      const building_doc = await Building.findAllBuildingsFromCity_ForCity(city_doc._id);
      var building_doc2 = "";
      building_doc.forEach(async(item) => {
        building_doc2 = await Building.updateBuilding_ForCity(item._id,city_doc);
      });
    }
    res.status(200).json({ results: [city_doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Cannot update required city" });
  }
}

const findOne = async(req, res) => {
  try {
    const {id} = req.params;
    const city_doc = await City.findOne({_id:id})
    if(!city_doc){
      return res.status(404).json({ error: "City not found" });
    }
    res.status(200).json({ results: [city_doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal error" });
  }
}

//Used in building.controllers
const findOne_ForBuilding = async(id) =>{
  try {
    const city_doc = await City.findOne({_id:id})
    if(!city_doc){
      return { error: "City not found" };
    }
    return city_doc;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  findAll,
  createCity,
  deleteCity,
  updateCity,
  findOne
}

//If I tried importing this into buildings.controller the normal way I got circular dependency and crashed hard
//Doing it this way seems to avoid it:
//https://stackoverflow.com/questions/67477093/accessing-non-existent-property-of-module-exports-inside-circular-dependency-nod
exports.exportedfunc = {findOne_ForBuilding}