const { Router } = require("express");

const buildingControllers = require("./building.controllers");

const router = Router();

router.post("/", buildingControllers.createBuilding);
router.get("/", buildingControllers.findMany);
router.get("/allfromcity/:id", buildingControllers.findAllBuildingsFromCity);

router.delete("/:id",buildingControllers.deleteBuilding);
router.post("/:id",buildingControllers.updateBuilding);
router.get("/:id",buildingControllers.findOne);

module.exports = router;
