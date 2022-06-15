const mongodb = require('mongodb');

const url = "mongodb://gerard:olakease@localhost:27017";
const client = new mongodb.MongoClient(url, { useUnifiedTopology: true }); 


async function main() {
  await client.connect();
  const db = client.db("maindb");
  const result = await db.collection("cities").insertMany([
    { city_id: 1, name: "Barcelona", created: new Date() },
    { city_id: 2, name: "Madrid", created: new Date() },
  ]);
  const result2 = await db.collection("buildings").insertMany([
    { building_id: 1, city_id: 1, building_name: "Sagrada Família", text: "The forever unfinished house of God", created: new Date() },
    { building_id: 2, city_id: 1, building_name: "Torre Agbar", text: "Is that a pickle or something else?...", created: new Date() },
    { building_id: 3, city_id: 1, building_name: "Camp Now", text: "Not so New Anymore", created: new Date() },
    { building_id: 4, city_id: 2, building_name: "Santiago Bernabeu", text: "Last minute scoring: +200%", created: new Date() },
    { building_id: 5, city_id: 2, building_name: "Museo del Prado", text: "Museums can`t get bigger than this", created: new Date() },
    { building_id: 6, city_id: 2, building_name: "Templo de Debod", text: "Cheap alternative to going to Egypt", created: new Date() }
  ]);
  console.log(result);
  console.log(result2);
  client.close();
}

main();