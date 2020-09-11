const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.post("/", usersController.insert);

router.put("/", usersController.update);

router.get("/:id", usersController.selectById);

router.delete("/:id", usersController.delete);

module.exports = router;
