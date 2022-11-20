import { Router } from "express";

const userApiRouter = new Router();

userApiRouter.get("/api/user", (req, res) => {
  console.log(req.session.user);
  res.json(req.session.user);
});

export default userApiRouter;
