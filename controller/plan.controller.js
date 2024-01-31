const PlanRepository = require("../repositories/plan.repository");
const planRepository = new PlanRepository();

exports.planController = {
  async getAllPlans(req, res) {
    try {
      const result = {
        status: 200,
        data: await planRepository.find(),
      };
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
      // console.log(id);
      const result = {
        status: 200,
        data: await planRepository.retrieve(id),
      };
      res.status(result.status);
      res.json(result.data);
    } catch (error) {
      if (error.message === "Plan not found") {
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
      // console.log(body);
      const result = {
        status: 201,
        message: "created",
        data: await planRepository.create(body),
      };
      res.status(result.status);
      res.json(result.message);
    } catch (error) {
      if (error.message === "Plan already exists") {
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
      const result = {
        status: 200,
        message: "updeated successfully plan with id: " + id + ".",
        data: await planRepository.update(id, plan),
      };
      res.status(result.status);
      res.json(result.message);
    } catch (error) {
      if (error.message === "Plan not found") {
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
      const result = {
        status: 200,
        message: "deleted successfully plan with id: " + id + ".",
        data: await planRepository.delete(id),
      };
      res.status(result.status);
      res.json(result.message);
    } catch (error) {
      if (error.message === "Plan not found") {
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
