import { Router } from "express";
import { createNFakeProducts } from "../../mocks/products.js";
import products from "../../api/products.js";

const productsApiRouter = new Router();

productsApiRouter.get("/api/products-test", (req, res) => {
  if (req.session.user) {
    res.json(createNFakeProducts(5));
  }
  res.redirect("/none");
});

productsApiRouter.get("/api/products", async (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    const id = req.query.id;
    console.log(id);
    res.json(await products.list(id));
  } else{
    res.redirect("/none");
  }
});

export default productsApiRouter;
