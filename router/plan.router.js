const { Router } = require("express");
const { planController } = require("../controller/plan.controller");
const { RequiredIdError, NotFoundCRUD } = require("../errors/errors");

const planRouter = new Router();
planRouter.get("/", planController.getAllPlans);
planRouter.get("/:id", planController.getPlan);
planRouter.post("/", planController.createPlan);
planRouter.put("/", (req, res, next) => {
  next(new RequiredIdError("put"));
});
planRouter.put("/:id", planController.updatePlan);
planRouter.delete("/", (req, res, next) => {
  next(new RequiredIdError("delete"));
});
planRouter.delete("/:id", planController.deletePlan);
planRouter.all("*", (req, res, next) => {
  next(new NotFoundCRUD());
});
module.exports = { planRouter };
