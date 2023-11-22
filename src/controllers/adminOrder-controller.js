const prisma = require("../models/prisma");
const { upload } = require("../utils/cloudinary-services");
const fs = require("fs/promises");


exports.readOrderAdmin = async (req, res, next) => {
  try {
    const afterReadOrder = await prisma.order.findMany();

    return res.status(200).json(afterReadOrder);
  } catch (error) {
    console.log(error);
  }
};
exports.deleteOrderAdmin = async (req, res, next) => {
  try {
    const afterDelOrder = await prisma.order.delete({
        where: {
            id:+req.body.id
        }
    })

    return res.status(200).json(afterDelOrder)

  } catch (error) {
    console.log(error);
  }
};
exports.editOrderAdmin = async (req, res, next) => {
  try {
    console.log("editttt", req.body);
    let imageUrl;
    if (req?.file?.path) {
      imageUrl = await upload(req.file.path);
    }
    const afterEditOrder = await prisma.order.update({
      where: {
        id: +req.body.orderId,
      },
      data: {
        actualWeight: +req.body.editOrderActualWeight,
        noteAdmin: req.body.noteAdmin,
        totalPrice: +req.body.totalPrice,
        status: req.body.status,
        paymentPicture: imageUrl,
      },
    });

    return res.status(200).json(afterEditOrder);
  } catch (error) {
    console.log(error);
  }
};

exports.createOrderAdmin = async (req, res, next) => {
  try {

    let scrapImage;
    if (req.files.scrapPicture[0].path) {
      scrapImage = await upload(req.files.scrapPicture[0].path);
    }
    let paymentImage;
    if (req.files.paymentPictureCreateOrder[0].path) {
      paymentImage = await upload(req.files.paymentPictureCreateOrder[0].path);
    }

    const afterCreateOrder = await prisma.order.create({
      data: {
        buyOrSell: req.body.buyOrSell,
        status: req.body.statusCreateOrder,
        expectedWeight: req.body.expextedWeightCreateOrder,
        actualWeight: +req.body.actualWeightCreateOrder,
        note: req.body.noteUserCreateOrder,
        noteAdmin: req.body.noteAdminCreateOeder,
        payment: req.body.paymentCreateOeder,
        paymentPicture: paymentImage,
        scrapPicture: scrapImage,
        phoneNumber: +req.body.phoneNumberCreateOrder,
        productId: +req.body.scrap,
        totalPrice: +req.body.totalPriceCreateOrder,
        userId: +req.body.userId,
      },
    });
    return res.status(201).json(afterCreateOrder);
  } catch (error) {
    console.log(error);
  }finally {
    if (req.files.scrapPicture) {
        fs.unlink(req.files.scrapPicture[0].path)
    }
    if (req.files.paymentPictureCreateOrder) {
        fs.unlink(req.files.paymentPictureCreateOrder[0].path)
    }
  }
};
