const express = require("express")
const router = express.Router()

const carController = require('./controllers/carroController')


router.get("/cars", carController.searchAllCars)
router.get("/car/:codigo", carController.searchOne )
router.post("/car",  carController.insertCar )
router.put("/car/:codigo", carController.alterCar)
router.delete("/car/:codigo", carController.deleteCar)

module.exports = router

