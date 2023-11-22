const prisma = require("../models/prisma");
const { upload } = require("../utils/cloudinary-services");

exports.createProductAdmin = async (req, res, next) => {
  try {

    console.log("create her e" , req.body)
    let imageUrl;
    if (req?.file?.path) {
      imageUrl = await upload(req.file.path);
    }

    const afterCreateProduct = await prisma.product.create({
      data: {
        name: req.body.creareProductScrapName,
        productInfo: req.body.createProductScrapInfo,
        productPicture: imageUrl,
        price: +req.body.createProductScrapPrice,
      },
    });

    console.log("afterCreateProduct",afterCreateProduct)
    return res.status(201).json(afterCreateProduct);
  } catch (err) {
    console.log(err);
  }
};

exports.readProduct = async (req, res, next) => {
  try {
    // console.log(req.data)
    const afterReadProductAdmin = await prisma.product.findMany({
      where: {
        price: {
          gt: 0,
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    //   console.log(result)

    return res.status(200).json(afterReadProductAdmin);
  } catch (err) {
    console.log(err);
  }
};

exports.editProductAdmin = async (req, res, next) => {
    try {
      let imageUrl;
      if (req?.file?.path) {
        imageUrl = await upload(req.file.path);
      }
      console.log("req.body", req.body);
      const faterEditProduct = await prisma.product.update({
        where: { id: +req.body.productId },
        data: {
          name: req.body.productName,
          price: +req?.body?.price,
          productPicture: imageUrl,
          productInfo: req?.body?.productInfo,
        },
      });
      return res.status(200).json(faterEditProduct);
    } catch (error) {
      console.log(error);
    }
  };

  
exports.deleteProductAdmin = async (req,res,next) => {


    try {
        
        const deleteProduct = await prisma.product.delete({
            where: {
                id:+req.body.id
            }
        })

        return res.status(200).json(deleteProduct)

    } catch (err) {
        console.log(err)
    }
}