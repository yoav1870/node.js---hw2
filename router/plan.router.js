const { Router } = require("express");
const { planController } = require("../controller/plan.controller");

const planRouter = new Router();
planRouter.get("/", planController.getAllPlans);
planRouter.get("/:id", planController.getPlan);
planRouter.post("/", planController.createPlan);
planRouter.put("/", (req, res) => res.status(404).json("required id"));
planRouter.put("/:id", planController.updatePlan);
planRouter.delete("/", (req, res) => res.status(404).json("required id"));
planRouter.delete("/:id", planController.deletePlan);
planRouter.all("*", (req, res) => res.status(404).json("Not Found"));

module.exports = { planRouter };
