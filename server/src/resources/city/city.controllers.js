const City = require('./city.model');

const findMany = async (req, res) => {
  try {
    const cities_docs = await City.find().lean().exec();
    res.status(200).json({ results: cities_docs });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Internal error' });
  }
}

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

const deleteCity = async(req, res) => {
  try {
    const { id } = req.params;
    const city_doc = await City.findByIdAndDelete(id);
    if (!city_doc) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({results: [city_doc] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Deletion failed" });
  }
}

const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const city_doc = await City.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (!city_doc) {
      return res.status(404).json({ error: "City not found" });
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
    const city_doc = City.findOne({"id":id})
    if(!city_doc){
      return res.status(404).json({ error: "City not found" });
    }
  } catch (error) {
    console.log(e);
    res.status(500).json({ error: "Internal error" });
  }
}

module.exports = {
  findMany,
  createCity,
  deleteCity,
  updateCity,
  findOne
}