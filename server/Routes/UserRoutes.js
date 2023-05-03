import express, { Router } from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "./../Models/UserModel.js";
import crypto from "crypto";
import Token from "../Models/Token.js";
import sendEmail from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
const userRouter = express.Router();
// LIBRARIES FOR DESIGNING MAIL
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if(user.verified === true) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          isAdmin: user.isAdmin,
          isSuperAdmin: user.isSuperAdmin,
          token: generateToken(user._id),
          createdAt: user.createdAt,
        });
      } else {
        res.status(401);
        throw new Error("Email Not Verified");
      }
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password, number } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      if(userExists.verified === false) {
        // DELETING THE OLD TOKEN IN THE DATABASE
        const oldToken = await Token.deleteMany({
          email: { $regex: email }
        })
        
        // SAVING TOKEN IN THE DATABASE
        // if(oldToken.deletedCount > 0) {
        // }
        const token = await new Token({
          userId: userExists._id,
          token: crypto.randomBytes(32).toString("hex")
        }).save();
        // SENDING MAIL TO THE USER
        const __filename = fileURLToPath(import.meta.url);

        const __dirname = path.dirname(__filename);

        const templatePath = path.join(__dirname, "../views/VerifyEmail.ejs");

        const url = `${process.env.BASE_URL}users/${userExists._id}/verify/${token.token}`;

        const data = await ejs.renderFile(templatePath, {url, userExists});

        await sendEmail(userExists.email, "Verify Email", data);
        res.status(201).json({
          _id: userExists._id,
          name: userExists.name,
          email: userExists.email,
          number: userExists.number,
          isAdmin: userExists.isAdmin,
          isSuperAdmin: userExists.isSuperAdmin,
          message: "Email Sent For Verification",
          token: generateToken(userExists._id),
        });
        
      } else {
        res.status(400);
        throw new Error("User already exists");
      }
    } else {
      const user = await User.create({
        name,
        email,
        password,
        number
      });
  
      if (user) {  
        // SEND MAIL AFTER CREATING TOKEN
        const token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex")
        }).save();

        const __filename = fileURLToPath(import.meta.url);

        const __dirname = path.dirname(__filename);

        const templatePath = path.join(__dirname, "../views/VerifyEmail.ejs");

        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;

        const data = await ejs.renderFile(templatePath, {url, user});

        await sendEmail(user.email, "Verify Email", data);
  
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          number: user.number,
          isAdmin: user.isAdmin,
          isSuperAdmin: user.isSuperAdmin,
          message: "Email Sent For Verification",
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid User Data");
      }
    }
  })

);


// RESET PASSWORD EMAIL
userRouter.post(
  "/resetPassword",
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      if(userExists.verified === true) {
        // DELETING THE OLD TOKEN IN THE DATABASE
        const oldToken = await Token.deleteMany({
          email: { $regex: email }
        })
        
        // SAVING TOKEN IN THE DATABASE
        // if(oldToken.deletedCount > 0) {
        // }
        const token = await new Token({
          userId: userExists._id,
          token: crypto.randomBytes(32).toString("hex")
        }).save();
        // SENDING MAIL TO THE USER
        const __filename = fileURLToPath(import.meta.url);

        const __dirname = path.dirname(__filename);

        const templatePath = path.join(__dirname, "../views/ResetPassword.ejs");

        const url = `${process.env.BASE_URL}users/${userExists._id}/resetPassword/${token.token}`;
        const data = await ejs.renderFile(templatePath, {url, userExists});
        await sendEmail(userExists.email, "Reset Password", data);
        res.status(201).json({
          message: "Reset Email Has Been Sent"
          // _id: userExists._id,
          // name: userExists.name,
          // email: userExists.email,
          // isAdmin: userExists.isAdmin,
          // isSuperAdmin: userExists.isSuperAdmin,
          // token: generateToken(userExists._id),
        });
        
      } else {
        res.status(400);
        throw new Error("User is not verified");
      }
    } else {
        res.status(400);
        throw new Error("Email does not exist");
    }
  })

);

// VERIFICATION OF EMAIL ID USING TOKEN
userRouter.get("/:id/verify/:token",
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({_id: req.params.id});
      if(!user) {
        res.status(400)
        throw new Error("Invalid Link");
      }

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token
      });

      if(!token) {
        res.status(400)
        throw new Error("Invalid Link")
      }

      await User.updateOne({_id: user._id},{ $set: {verified: true}})
      await token.remove()

      res.status(200).send({
        verified: user.verified,
        message: "Email verified Successfully"
      })
    } catch(error) {
      console.log(error.message)
    }
  })
)

// VERIFICATION OF EMAIL ID USING TOKEN FOR RESETTING PASSWORD
userRouter.get("/:id/resetPassword/:token",
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({_id: req.params.id});
      if(!user) {
        res.status(400)
        throw new Error("Invalid Link");
      }

      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token
      });

      if(!token) {
        res.status(400)
        throw new Error("Invalid Link")
      }

      // await User.updateOne({_id: user._id},{ $set: {verified: true}})
      await token.remove()

      res.status(200).send({
        verified: user.verified,
        message: "Email verified Successfully"
      })
    } catch(error) {
      console.log(error.message)
    }
  })
)

// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        number: user.number,
        image: user.image,
        isAdmin: user.isAdmin,
        isSuperAdmin: user.isSuperAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.number = req.body.number || user.number;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        number: updatedUser.number,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        isSuperAdmin: updatedUser.isSuperAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE IMAGE
userRouter.put(
  "/image",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id);
    console.log(req.body.id);
    console.log('hello');
    console.log(req.body.imageUrl);
    if (user) {
      user.image = req.body.imageUrl;
      const updatedUser = await user.save();
      console.log(updatedUser)
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        number: updatedUser.number,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// RESET PASSWORD
userRouter.put(
  "/passwordReset/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.password = req.body.password.password;
      const updatedUser = await user.save();
      console.log(updatedUser)
      res.json({
        message: "Password Reset Successfully"
      });
    } else {
      res.status(404);
      
      throw new Error("User not found");
    }
  })
);

// GET ALL USER ADMIN
userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

// GET USER BY ID FOR ADMIN
userRouter.get(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.findById(req.params.id);
    res.json(users);
  })
);

// CHANGE USER TO ADMIN
userRouter.get(
  "/:id/admin",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.isAdmin = true;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  })
);

// REMOVE USER
userRouter.get(
  "/:id/remove",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const result = await User.deleteOne({_id: req.params.id});

    if (result.deletedCount > 1) {
      res.json({
        message: "User Successfully Deleted"
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  })
);


export default userRouter;
