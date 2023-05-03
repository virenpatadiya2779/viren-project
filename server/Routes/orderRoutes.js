import express from "express";
import asyncHandler from "express-async-handler";
import Razorpay from "razorpay";
import shortid from "shortid";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import User from "./../Models/UserModel.js";
import Order from "./../Models/OrderModel.js";
import sendEmail from "../utils/sendEmail.js";
import Product from "./../Models/ProductModel.js";
import SendmailTransport from "nodemailer/lib/sendmail-transport/index.js";
// LIBRARIES FOR DESIGNING MAIL
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";


const orderRouter = express.Router();

// CREATE ORDER
orderRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    // GETTING THE DATA FROM THE BODY
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    // GETTING PRODUCT IDS FROM THE BODY
    const { productIds } = req.body;
    // REDUCING THE STOCK OF THE PRODUCTS
    const deleted = productIds.map(async (data) => {
      const product = await Product.findById(data.productId);
      if(product) {
        product.countInStock = product.countInStock - data.quantity;
        if(product.countInStock < 11) {
          const user = await User.find({});
          const result = user.map( async (data) => {
            if(data.isAdmin) {
              const product = await Product.find({});
              // FOR THE TEMPLATE IN EMAIL
              const __filename = fileURLToPath(import.meta.url);
              const __dirname = path.dirname(__filename);
              const templatePath = path.join(__dirname, "../views/LowInStock.ejs");
              const templateLoaded = await ejs.renderFile(templatePath, {product});
              sendEmail(data.email,"Low In Stock", templateLoaded)
            }
          })
        }
        let reduceStock = await product.save();
        return reduceStock;
      }
    });
    // CHECKING IF THERE ARE ANY ORDER ITMES OR NOT
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
      return;
    } else {
      // CREATING THE ORDER
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      // SAVING THE ORDER IN THE DATABASE
      const createOrder = await order.save();
      // GETTING THE USER EMAIL FROM THE USER ID
      const user = await User.findById(req.user._id);
      // SENDING THE MAIL TO USER
      if(user) {

        // FOR THE TEMPLATE IN EMAIL
        const __filename = fileURLToPath(import.meta.url);

        const __dirname = path.dirname(__filename);

        const templatePath = path.join(__dirname, "../views/OrderConfirmed.ejs");

        const data = await ejs.renderFile(templatePath, createOrder);

        await sendEmail(user.email, "Order Placed", data);
      }
      // RETURNING THE 
      res.status(201).json(createOrder);
    }
  })
);

// ADMIN GET ALL ORDERS
orderRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({})
      .sort({ _id: -1 }).populate("user", "id name email number");
    console.log(orders)
    res.json(orders);
  })
);

// ADMIN GET ALL CANCELLED ORDERS
orderRouter.get(
  "/cancelled",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({
      status: "Cancelled",
      isPaid: true,
      paymentMethod: "Razorpay",
      isRefunded: false

    })
      .sort({ _id: -1 })
      .populate("user", "id name email number");
    console.log(orders)
    res.json(orders);
  })
);
// USER LOGIN ORDERS
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(order);
  })
);

// GET ORDER BY ID
orderRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email number"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// ORDER IS PAID
orderRouter.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email number");

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.razorpay_payment_id,
        status: "COMPLETED",
      };

      const updatedOrder = await order.save();
      // Sending Payment Id To the user
      if(order.user.email) {
        const __filename = fileURLToPath(import.meta.url);

        const __dirname = path.dirname(__filename);

        const templatePath = path.join(__dirname, "../views/PaymentDone.ejs");

        const data = await ejs.renderFile(templatePath, updatedOrder);
        sendEmail(order.user.email, "Payment Done", data )
      }
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// ORDER IS DELIVERED
orderRouter.put(
  "/:id/delivered",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// AMOUNT REFUND MAIL
orderRouter.put(
  "/:id/refundedMail",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email number"
    );

    if (order) {
      order.isRefunded = true;

      const updatedOrder = await order.save();
      console.log(updatedOrder);
      // SENDING MAIL TO CONFIRM REFUND
      if(order.user.email) {
        const __filename = fileURLToPath(import.meta.url);

        const __dirname = path.dirname(__filename);

        const templatePath = path.join(__dirname, "../views/RefundNotification.ejs");

        const data = await ejs.renderFile(templatePath, updatedOrder);

        await sendEmail(order.user.email, "Order Cancelled And Refunded", data);
      }
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

export default orderRouter;

// CHANGE ORDER STATUS
orderRouter.put(
  "/:id/status",
  protect,
  asyncHandler(async (req, res) => {
    const { status } = req.body
    const order = await Order.findById(req.params.id);

    if(order) {
      order.status = status;

      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Status Not Changed")
    }
  })
);

// CANCEL ORDER
orderRouter.put(
  "/:id/cancelled",
  protect,
  asyncHandler(async (req, res) => {
    // FINDING THE ORDER IN THE DATABASE
    const order = await Order.findById(req.params.id).populate("user", "id name number email");
    
    // SENDING MAIL AND CANCELLING THE ORDER
    if (order) {
      const user = await User.findById(order.user);       
      if(user) {
        const __filename = fileURLToPath(import.meta.url);
  
        const __dirname = path.dirname(__filename);
  
        const templatePath = path.join(__dirname, "../views/OrderCancelled.ejs");
  
        const data = await ejs.renderFile(templatePath, order);
        await sendEmail(user.email, "Order Cancelled", data);
      }
      order.status = "Cancelled";
      const updatedOrder = await order.save();

      // GETTING PRODUCT IDS FROM THE BODY
      const { productData } = req.body;
      // INCREASING THE STOCK OF THE PRODUCTS AFTER CANCELLING THE ORDER
      const increasingStock = productData.map(async (data) => {
        const product = await Product.findById(data.productId);
        if(product) {
          product.countInStock = product.countInStock + data.quantity;
          let reduceStock = await product.save();
          return reduceStock;
        }
      });

      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

// RAZORPAY
const razorpay = new Razorpay({
	key_id: 'rzp_test_V4GGLSjJ4QGPxv',
	key_secret: 'IP8wdz5ZVlGUja0OrtXQ8R1X'
})

orderRouter.post(
  "/razorpay/:id",
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email number"
    );

    if (order) {
      const payment_capture = 1;
      const amount = order.totalPrice;
      const currency = 'INR';

      const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
      }

      const response = await razorpay.orders.create(options)
      // console.log(response)
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        userName: order.user.name,
        userEmail: order.user.email,
        number: order.user.number
      })
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
)