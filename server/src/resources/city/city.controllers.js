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

module.exports = {
  findMany
}