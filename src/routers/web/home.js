import { Router } from "express";
import { webAuth } from "../../auth/index.js";
import sendMail from "../../nodeMailer/nodeMailer.js";
import sendWhatsapp from "../../twilio/whatsapp.js";
import sendSMS from "../../twilio/sms.js";
import cart from "../../api/cart.js";

import { infoLogger } from "../../logger/winston.js";

import path from "path";
import products from "../../api/products.js";
const __dirname = path.resolve();
const productsWebRouter = new Router();

productsWebRouter.get("/home", [infoLogger, webAuth], (req, res) => {
  if (req.session.user) {
    res.render(path.join(__dirname + "/views/pages/home.ejs"), {
      userName: req.session.user.name,
      thumbnail: req.session.user.photo,
    });
  } else {
    res.sendFile(path.join(__dirname + "/views/login.html"));
  }
});

productsWebRouter.get("/products-test-view", infoLogger, (req, res) => {
  res.sendFile(path.join(__dirname + "/views/products-test-view.html"));
});

productsWebRouter.get("/cart", [infoLogger, webAuth], (req, res) => {
  if (req.session.user) {
    res.render(path.join(__dirname + "/views/pages/cart.ejs"));
  } else {
    res.sendFile(path.join(__dirname + "/views/login.html"));
  }
});

productsWebRouter.get("/buy", [infoLogger, webAuth], (req, res) => {
  if (req.session.user) {
    const name = req.session.user.name;
    const email = req.session.user.username;
    const buyedCart = cart.listAll();
    buyedCart.forEach((elem) => {
      delete elem.thumbnail;
      delete elem.id;
      delete elem.timestamp;
    });
    sendMail(
      `New order from ${name} | ${email}`,
      `${JSON.stringify(buyedCart)}`
    );
    sendWhatsapp(`${JSON.stringify(buyedCart)}`);
    sendSMS(req.session.user.phone);

    res.render(path.join(__dirname + "/views/pages/buy-ok.ejs"));
  } else {
    res.sendFile(path.join(__dirname + "/views/login.html"));
  }
});

export default productsWebRouter;
