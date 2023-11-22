
const prisma = require("../models/prisma");
const { upload } = require("../utils/cloudinary-services");
const fs = require("fs/promises");

exports.readUserAdmin = async(req,res,next) => {
    try {
        const afterAdminReadUser = await prisma.user.findMany();

        return res.status(200).json(afterAdminReadUser);
    } catch (error) {
        console.log(error)
    }
}