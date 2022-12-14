import { Router } from "express";
import cart from "../../api/cart.js";
import sendMail from "../../nodeMailer/nodeMailer.js";
const authWebRouter = new Router();

// Passport
import passport from "passport";

import { infoLogger } from "../../logger/winston.js";

import path from "path";
const __dirname = path.resolve();

let sessionName;

authWebRouter.get("/", infoLogger, (req, res) => {
  res.send("Express server ready");
});

// Login
authWebRouter.get("/login", infoLogger, (req, res) => {
  if (req.isAuthenticated()) {
    // req.session.userName = req.user.username;

    res.redirect("/home");
  } else {
    res.sendFile(path.join(__dirname + "/views/login.html"));
  }
});

authWebRouter.post(
  "/login",
  [
    infoLogger,
    passport.authenticate("login", { failureRedirect: "/faillogin" }),
  ],
  (req, res) => {
    const user = req.user;
    // console.log(user);
    // req.session.userName = req.body.username;
    // sessionName = req.session.userName;
    sessionName = user.name;
    req.session.user = user;
    res.redirect("/home");
  }
);

authWebRouter.get("/faillogin", infoLogger, (req, res) => {
  console.log("Login error");
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.render(path.join(__dirname + "/views/pages/login-error"), {});
  });
});

// Sign up
authWebRouter.get("/signup", infoLogger, (req, res) => {
  res.sendFile(path.join(__dirname + "/views/signup.html"));
});

authWebRouter.post(
  "/signup",
  [
    infoLogger,
    passport.authenticate("signup", { failureRedirect: "/failsignup" }),
    passport.authenticate("login", { failureRedirect: "/faillogin" }),
  ],
  (req, res) => {
    const user = req.user;
    console.log(user);
    req.session.user = user;
    const mail = sendMail("New registration", `${user}`);
    console.log(mail);
    // req.session.userName = req.body.username;
    // sessionName = req.session.userName;
    sessionName = user.name;
    res.redirect("/home");
  }
);

authWebRouter.get("/failsignup", infoLogger, (req, res) => {
  console.log("Signup error");
  res.render(path.join(__dirname + "/views/pages/signup-error"), {});
});

// Logout

authWebRouter.get("/logout", infoLogger, (req, res) => {
  cart.deleteAll();
  req.session.destroy((err) => {
    if (err) {
      res.json({ status: "Logout error", body: err });
    } else {
      res.render(path.join(__dirname + "/views/pages/logout.ejs"), {
        sessionName,
      });
    }
  });
});

export default authWebRouter;
