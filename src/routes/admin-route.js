const express = require("express");
const uploadMiddleware = require("../middlewares/upload");
const authenticateMiddleware = require("../middlewares/authenticate");
const adminProductController = require("../controllers/adminProduct-controller");
const adminOrderController = require("../controllers/adminOrder-controller");
const adminReadUserController = require("../controllers/adminReadUser-controller");
const router = express.Router();

router.post(
  "/createProductAdmin",
  uploadMiddleware.single("createProductScrapPic"),
  adminProductController.createProductAdmin
);
router.post(
  "/deleteProductAdmin",
  authenticateMiddleware,
  adminProductController.deleteProductAdmin
);

router.patch(
  "/editProductAdmin",
  uploadMiddleware.single("scrapPicture"),
  adminProductController.editProductAdmin
);

router.get("/readProduct", adminProductController.readProduct);

router.get("/readOrder", adminOrderController.readOrderAdmin);
router.patch(
  "/editOrderAdmin",
  uploadMiddleware.single("paymentPicture"),
  adminOrderController.editOrderAdmin
);
router.post(
  "/createOrderAdmin",
  uploadMiddleware.fields([
    { name: "scrapPicture", maxCount: 1 },
    { name: "paymentPictureCreateOrder", maxCount: 1 },
  ]),
  adminOrderController.createOrderAdmin
);

router.post(
  "/deleteOrderAdmin",
  authenticateMiddleware,
  adminOrderController.deleteOrderAdmin
);

router.get(
  "/readUserAdmin",
  authenticateMiddleware,
  adminReadUserController.readUserAdmin
);

module.exports = router;
