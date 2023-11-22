const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const { upload } = require("../utils/cloudinary-services");
const fs = require("fs/promises");
const { create } = require("domain");

exports.readOrder = async(req,res,next) => {
    try {

        console.log("resresr",req.body.id)
        const afterUserReadOrder = await prisma.order.findMany({
            where: {
                userId: +req.body.id
            }
        });
console.log("sss",afterUserReadOrder)
        return res.status(200).json(afterUserReadOrder);
    } catch (error) {
        console.log(error)
    }
}


exports.deleteOrder = async (req, res, next) => {
  try {
    const deleteOrder = await prisma.order.delete({
      where: {
        id: +req.body.id,
      },
    });

    return res.status(200).json(deleteOrder);
  } catch (err) {
    next(err);
  }
};

exports.createFullOrder = async (req, res, next) => {
  try {
    let imageUrl;
    if (req?.file?.path) {
      imageUrl = await upload(req.file.path);
    }
    // const user = await prisma.user.findFirst({

    const result = await prisma.order.create({
      data: {
        status: "PENDING",
        buyOrSell: req.body.buyOrSell,

        payment: req.body.newPayment,
        expectedWeight: req.body.expectedWeight,
        note: req.body.note,

        scrapPicture: imageUrl,
        userId: +req.body.userId,
        productId: +req.body.scrap,
      },
    });

    // result.productId = produst
    return res.status(200).json({ message: result });
  } catch (err) {
    next(err);
  } finally {
    if (req?.file?.path) {
      fs.unlink(req?.file?.path);
    }
  }
};
exports.updateOrder = async (req, res, next) => {
  try {
    console.log("kuy wwww", req.body);

    let imageUrl;
    if (req?.file?.path) {
      imageUrl = await upload(req.file.path);
    }

    const result = await prisma.order.update({
      where: {
        id: +req.body.orderId,
      },
      data: {
        status: "PENDING",
        buyOrSell: req?.body?.buyOrSell,

        payment: req?.body?.newPayment,
        expectedWeight: req.body.expectedWeight,
        note: req.body.note,

        scrapPicture: imageUrl,
        userId: +req.body.userId
      },
    });

    return res.status(200).json(result);
    // return res.status(200).json({ message: result });
  } catch (err) {
    next(err);
  } finally {
    if (req?.file?.path) {
      fs.unlink(req?.file?.path);
    }
  }
};
