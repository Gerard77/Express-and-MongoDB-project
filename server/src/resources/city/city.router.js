const { Router } = require("express");

const cityControllers = require("./city.controllers");

const router = Router();

router.get("/", cityControllers.findMany)
router.post("/", cityControllers.createCity);

router.delete("/:id",cityControllers.deleteCity);
router.post("/:id",cityControllers.updateCity);
router.get("/:id",cityControllers.findOne);

module.exports = router;