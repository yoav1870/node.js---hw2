const { planRepository } = require("../repository/plan.repository");
const {
  NoDataError,
  InvalidIdError,
  PlanDoesNotExistError,
  RequiredIdError,
  PlanAlreadyExistsError,
} = require("../errors/errors");

exports.planController = {
  async getAllPlans(req, res) {
    try {
      const result = {
        status: 200,
        data: await planRepository.find(),
      };
      if (result.data.length === 0) {
        throw new NoDataError();
      }
      res.status(result.status);
      res.json(result.data);
    } catch (error) {
      res.status(error?.status || 500).json(error.message);
    }
  },
  async getPlan(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id) || id <= 0) {
        throw new InvalidIdError(id);
      }
      const result = {
        status: 200,
        data: await planRepository.retrieve(id),
      };
      if (result.data.length === 0) {
        throw new PlanDoesNotExistError(id);
      }
      res.status(result.status);
      res.json(result.data);
    } catch (error) {
      res.status(error?.status || 500).json(error.message);
      // if (error.message === "Invalid id") {
      //   res.status(400);
      //   res.json("Invalid id");
      // } else if (error.message === "Plan not found") {
      //   res.status(404);
      //   res.json("Plan not found");
      // } else {
      //   res.status(500);
      //   res.json(
      //     "server encountered an unexpected condition that prevented it from fulfilling the request."
      //   );
      // }
    }
  },
  async createPlan(req, res) {
    try {
      const { body } = req;
      if (!body.id) {
        throw new RequiredIdError("create");
      }
      if (isNaN(body.id) || body.id <= 0) {
        throw new InvalidIdError(body.id);
      }
      const plans = await planRepository.find();
      const planExists = plans.find((plan) => plan.id == body.id);
      if (planExists) {
        throw new PlanAlreadyExistsError(body.id);
      }
      const result = {
        status: 201,
        message: "created",
        data: await planRepository.create(body),
      };
      res.status(result.status);
      res.json(result.message);
    } catch (error) {
      res.status(error?.status || 500).json(error.message);
    }
  },
  async updatePlan(req, res) {
    try {
      const {
        body: plan,
        params: { id },
      } = req;
      if (isNaN(id) || id <= 0) {
        throw new InvalidIdError(id);
      }
      const plans = await planRepository.find();
      const planExists = plans.find((plan) => plan.id == Number(id));
      if (!planExists) {
        throw new PlanDoesNotExistError(id);
      }
      const result = {
        status: 200,
        message: "updeated successfully plan with id: " + id + ".",
        data: await planRepository.update(id, plan),
      };
      res.status(result.status);
      res.json(result.message);
    } catch (error) {
      res.status(error?.status || 500).json(error.message);
    }
  },
  async deletePlan(req, res) {
    try {
      const { id } = req.params;
      if (isNaN(id) || id <= 0) {
        throw new InvalidIdError(id);
      }
      const plans = await planRepository.find();
      const planExists = plans.find((plan) => plan.id == Number(id));
      if (!planExists) {
        throw new PlanDoesNotExistError(id);
      }
      const result = {
        status: 200,
        message: "deleted successfully plan with id: " + id + ".",
        data: await planRepository.delete(id),
      };
      res.status(result.status);
      res.json(result.message);
    } catch (error) {
      res.status(error?.status || 500).json(error.message);
    }
  },
};
