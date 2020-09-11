const express = require("express");
const router = express.Router();
const addressesController = require("../controllers/adressesController");

//													This redirects to the controller
router.post("/", addressesController.insert);

router.put("/", addressesController.update);

router.get("/random5", addressesController.selectRandom5);

router.get("/:id", addressesController.selectById);

router.delete("/:id", addressesController.delete);

module.exports = router;
