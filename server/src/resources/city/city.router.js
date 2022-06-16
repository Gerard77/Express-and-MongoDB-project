const { Router } = require("express");

const cityControllers = require("./city.controllers");

const router = Router();

router.route("/").get(cityControllers.findMany)
                .post(cityControllers.createCity);

module.exports = router;