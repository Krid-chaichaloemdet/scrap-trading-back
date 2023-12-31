const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validators/auth-validator");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  console.log(req)
  try {
    const { value, error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    value.password = await bcrypt.hash(value.password, 12);
    const user = await prisma.user.create({
      data: value,
    });
    console.log(user);

    const transactionId = `n${user.id}`;

    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "1kldvlsadjbwiu3hqiasb",
      { expiresIn: process.env.JWT_EXPIRE }
    );
    delete user.password;
    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);


    console.log("errrerer",error)
    if (error) {
      return next(error);
    }
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: value.emailOrMobile }, { mobile: value.emailOrMobile }],
      },
    });

    if (!user) {
      return next(createError("invalid credential ", 400));
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return next(createError("invalid credential", 400));
    }
    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "123456",
      { expiresIn: process.env.JWT_EXPIRE }
    );
  

    delete user.password;
    res.status(200).json({ accessToken, user });
    console.log("here",user)
  } catch (err) {
console.log(err)  }
};
// exports.loginAdmin = async (req, res, next) => {
//   try {
//     const { value, error } = loginSchema.validate(req.body);

//     if (error) {
//       return next(error);
//     }
//     const user = await prisma.user.findFirst({
//       where: {
//         OR: [{ email: value.emailOrMobile }, { mobile: value.emailOrMobile }],
//       },
//     });

//     if (!user) {
//       return next(createError("invalid credential ", 400));
//     }

//     const isMatch = await bcrypt.compare(value.password, user.password);
//     if (!isMatch) {
//       return next(createError("invalid credential", 400));
//     }
//     const payload = { userId: user.id };
//     const accessToken = jwt.sign(
//       payload,
//       process.env.JWT_SECRET_KEY || "123456",
//       { expiresIn: process.env.JWT_EXPIRE }
//     );
  

//     delete user.password;
//     res.status(200).json({ accessToken, user });
//     console.log("here",user)
//   } catch (err) {
//     next(err);
//   }
// };

exports.getMe = (req, res) => {
  try {
    
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(error)
  }
};
