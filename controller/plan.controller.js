const { planRepository } = require("../repository/plan.repository");

exports.planController = {
  async getAllPlans(req, res) {
    try {
      const result = {
        status: 200,
        data: await planRepository.find(),
      };
      if (result.data.length === 0) {
        throw new Error("There are no plans");
      }
      res.status(result.status);
      res.json(result.data);
    } catch (error) {
      if (error.message === "There are no plans") {
        res.status(404);
        res.json("There are no plans");
      } else {
        res.status(500);
        res.json(
          "server encountered an unexpected condition that prevented it from fulfilling the request."
        );
      }
    }
  },
  async getPlan(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id) || id <= 0) {
        throw new Error("Invalid id");
      }
      const result = {
        status: 200,
        data: await planRepository.retrieve(id),
      };
      if (result.data.length === 0) {
        throw new Error("Plan not found");
      }
      res.status(result.status);
      res.json(result.data);
    } catch (error) {
      if (error.message === "Invalid id") {
        res.status(400);
        res.json("Invalid id");
      } else if (error.message === "Plan not found") {
        res.status(404);
        res.json("Plan not found");
      } else {
        res.status(500);
        res.json(
          "server encountered an unexpected condition that prevented it from fulfilling the request."
        );
      }
    }
  },
  async createPlan(req, res) {
    try {
      const { body } = req;
      if (!body.id) {
        throw new Error("Id is required");
      }
      const plans = await planRepository.find();
      const planExists = plans.find((plan) => plan.id == body.id);
      if (planExists) {
        throw new Error("Plan already exists");
      }
      const result = {
        status: 201,
        message: "created",
        data: await planRepository.create(body),
      };
      res.status(result.status);
      res.json(result.message);
    } catch (error) {
      if (error.message === "Id is required") {
        res.status(400);
        res.json("Id is required");
      } else if (error.message === "Plan already exists") {
        res.status(409);
        res.json("Plan already exists");
      } else {
        res.status(500);
        res.json(
          "server encountered an unexpected condition that prevented it from fulfilling the request."
        );
      }
    }
  },
  async updatePlan(req, res) {
    try {
      const {
        body: plan,
        params: { id },
      } = req;
      if (isNaN(id) || id <= 0) {
        throw new Error("Invalid id");
      }
      const plans = await planRepository.find();
      const planExists = plans.find((plan) => plan.id == Number(id));
      if (!planExists) {
        throw new Error("Plan not found");
      }
      const result = {
        status: 200,
        message: "updeated successfully plan with id: " + id + ".",
        data: await planRepository.update(id, plan),
      };
      res.status(result.status);
      res.json(result.message);
    } catch (error) {
      if (error.message === "Invalid id") {
        res.status(400);
        res.json("Invalid id");
      } else if (error.message === "Plan not found") {
        res.status(404);
        res.json("Plan not found");
      } else {
        res.status(500);
        res.json(
          "server encountered an unexpected condition that prevented it from fulfilling the request."
        );
      }
    }
  },
  async deletePlan(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id) || id <= 0) {
        throw new Error("Invalid id");
      }
      const plans = await planRepository.find();
      const planExists = plans.find((plan) => plan.id == Number(id));
      if (!planExists) {
        throw new Error("Plan not found");
      }
      const result = {
        status: 200,
        message: "deleted successfully plan with id: " + id + ".",
        data: await planRepository.delete(id),
      };
      res.status(result.status);
      res.json(result.message);
    } catch (error) {
      if (error.message === "Invalid id") {
        res.status(400);
        res.json("Invalid id");
      } else if (error.message === "Plan not found") {
        res.status(404);
        res.json("Plan not found");
      } else {
        res.status(500);
        res.json(
          "server encountered an unexpected condition that prevented it from fulfilling the request."
        );
      }
    }
  },
};
