const { planController } = require("../controller/plan.controller");
const PlanRepository = require("../repositories/plan.repository");

jest.mock("../repositories/plan.repository");

describe("getAllPlans", () => {
  it("should return all plans", async () => {
    // Mocking the behavior of the PlanRepository
    const mockPlans = [{ id: 1 }, { id: 2 }];
    PlanRepository.prototype.find.mockResolvedValue(mockPlans);

    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await planController.getAllPlans(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPlans);
  });

  it("should handle the case when there are no plans", async () => {
    // Mocking the behavior of the PlanRepository when there are no plans
    PlanRepository.prototype.find.mockRejectedValue(
      new Error("There are no plans")
    );

    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await planController.getAllPlans(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("There are no plans");
  });

  it("should handle internal server error", async () => {
    // Mocking the behavior of the PlanRepository for internal server error
    PlanRepository.prototype.find.mockRejectedValue(
      new Error("Internal Server Error")
    );

    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await planController.getAllPlans(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
  });
});

describe("getPlan", () => {
  it("should return a plan", async () => {
    // Mocking the behavior of the PlanRepository
    const mockPlan = { id: 1, name: "Plan A" };
    PlanRepository.prototype.retrieve.mockResolvedValue(mockPlan);

    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await planController.getPlan(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPlan);
  });

  it("should handle the case when the plan does not exist", async () => {
    // Mocking the behavior of the PlanRepository when the plan does not exist
    PlanRepository.prototype.retrieve.mockRejectedValue(
      new Error("Plan not found")
    );

    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await planController.getPlan(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith("Plan not found");
  });

  it("should handle internal server error", async () => {
    // Mocking the behavior of the PlanRepository for internal server error
    PlanRepository.prototype.retrieve.mockRejectedValue(
      new Error("Internal Server Error")
    );

    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await planController.getPlan(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
  });
});

describe("createPlan", () => {
  it("should create a new plan ", async () => {
    const mockPlan = { id: 5, namePlan: "Plan A" };
    PlanRepository.prototype.create.mockResolvedValue(mockPlan);

    const req = { body: { id: 5, namePlan: "plan A" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await planController.createPlan(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("created");
  });
  it("should handle the case when the plan id already exists", async () => {
    PlanRepository.prototype.create.mockRejectedValue(
      new Error("Plan already exists")
    );

    const req = { body: { id: "1" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await planController.createPlan(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith("Plan already exists");
  });
  it("should handle the case when the plan id already exists", async () => {
    PlanRepository.prototype.create.mockRejectedValue(
      new Error("Plan already exists")
    );

    const req = { body: { id: "1" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await planController.createPlan(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith("Plan already exists");
  });
  it("should handle internal server error", async () => {
    PlanRepository.prototype.create.mockRejectedValue(
      new Error("Internal Server Error")
    );

    const req = { body: { id: "5" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await planController.createPlan(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
  });
});
// describe("updatePlan", () => {
//   it("should update a plan", async () => {
//     const mockPlan = { id: 1, name: "Plan A" };
//     PlanRepository.prototype.update.mockResolvedValue(mockPlan);

//     const req = { body: { id: 1, name: "Plan A" }, params: { id: 1 } };
//     const res = {
//       status: jest.fn(() => res),
//       json: jest.fn(),
//     };

//     await planController.updatePlan(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(
//       "updeated successfully plan with id: 1."
//     );
//   });
//   it("should handle the case when the plan does not exist", async () => {
//     PlanRepository.prototype.update.mockRejectedValue(
//       new Error("Plan not found")
//     );

//     const req = { body: { id: 1, name: "Plan A" }, params: { id: 1 } };
//     const res = {
//       status: jest.fn(() => res),
//       json: jest.fn(),
//     };

//     await planController.updatePlan(req, res);

//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith("Plan not found");
//   });
//   it("should handle internal server error", async () => {
//     PlanRepository.prototype.update.mockRejectedValue(
//       new Error("Internal Server Error")
//     );

//     const req = { body: { id: 1, name: "Plan A" }, params: { id: 1 } };
//     const res = {
//       status: jest.fn(() => res),
//       json: jest.fn(),
//     };

//     await planController.updatePlan(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith(
//       "server encountered an unexpected condition that prevented it from fulfilling the request."
//     );
//   });
// });
