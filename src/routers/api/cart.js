import { Router } from "express";
import cart from "../../api/cart.js";
const cartApiRouter = new Router();

cartApiRouter.get("/api/cart", (req, res) => {
  res.json(cart.listAll());
});

cartApiRouter.put("/api/cart", (req, res) => {
  cart.add(req.body);
  res.json(cart);
});

export default cartApiRouter;
