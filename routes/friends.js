const express = require("express");
const router = express.Router();
const friendsController = require("../controllers/friendsController");

router.post("/", friendsController.insert);

router.put("/", friendsController.update);

router.get("/paginatedcall", friendsController.paginatedCall);

router.get("/search", friendsController.search);

router.get("/:id", friendsController.selectById);

router.delete("/:id", friendsController.delete);

module.exports = router;
