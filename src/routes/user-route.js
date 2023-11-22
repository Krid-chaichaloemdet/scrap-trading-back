const express = require("express");
const createOrderController = require("../controllers/createOrder-controller");
const authenticateMiddleware = require("../middlewares/authenticate");

const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();





router.post(
  "/createFullOrder",
  authenticateMiddleware,
  uploadMiddleware.single("scrapPicture"),
  createOrderController.createFullOrder
);
router.post(
  "/deleteOrder",
  authenticateMiddleware,
  createOrderController.deleteOrder
);
router.patch(
  "/updateOrder",
  authenticateMiddleware,
  uploadMiddleware.single("scrapPicture"),
  createOrderController.updateOrder
);

router.post("/readOrder",authenticateMiddleware,createOrderController.readOrder)
// router.get("/readOrder", readOrderController.readOrder);

// router.post("/readOrderUser", readOrderController.readOrderUser);
// router.get("/readPendingOrder", readOrderController.readPendingOrder);
// // router.put("/readSingleOrder", readOrderController.readSingleOrder);
// // router.put("/updateSingleOrder", readOrderController.updateSingleOrder);

// router.get("/readUser", readUserController.readUser);


module.exports = router;
