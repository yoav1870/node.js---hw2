const app = require("../index");
const PlanRepository = require("../repositories/plan.repository");
const request = require("supertest");
jest.mock("../repositories/plan.repository");

describe("GET / plans", () => {
  beforeEach(() => jest.clearAllMocks());
  it("should return all plans", async () => {
    const mockPlans = [{ id: 1 }, { id: 2 }];

    PlanRepository.prototype.find.mockResolvedValue(mockPlans);

    const res = await request(app).get("/api/plans");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPlans);
  });
  it("should handle the case when there are no plans", async () => {
    PlanRepository.prototype.find.mockRejectedValue(
      new Error("There are no plans")
    );

    const res = await request(app).get("/api/plans");
    expect(res.status).toBe(404);
    expect(res.body).toEqual("There are no plans");
  });
  it("should handle internal server error", async () => {
    PlanRepository.prototype.find.mockRejectedValue(
      new Error("Internal Server Error")
    );

    const res = await request(app).get("/api/plans");
    expect(res.status).toBe(500);
    expect(res.body).toEqual(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
  });
});
describe("GET / plans/:id", () => {
  it("should return a plan", async () => {
    const mockPlan = [
      { id: 1, name: "Plan A" },
      { id: 2, name: "Plan B" },
    ];
    PlanRepository.prototype.retrieve.mockResolvedValue(mockPlan);

    const res = await request(app).get("/api/plans/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPlan);
  });
  it("should handle the case when the plan does not exist", async () => {
    PlanRepository.prototype.retrieve.mockRejectedValue(
      new Error("Plan not found")
    );

    const res = await request(app).get("/api/plans/1");
    expect(res.status).toBe(404);
    expect(res.body).toEqual("Plan not found");
  });
  it("should handle internal server error", async () => {
    PlanRepository.prototype.retrieve.mockRejectedValue(
      new Error("Internal Server Error")
    );

    const res = await request(app).get("/api/plans/1");
    expect(res.status).toBe(500);
    expect(res.body).toEqual(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
  });
  it("should handle the case when the id is invalid", async () => {
    PlanRepository.prototype.retrieve.mockRejectedValue(
      new Error("Invalid id")
    );

    const res = await request(app).get("/api/plans/0");
    expect(res.status).toBe(400);
    expect(res.body).toEqual("Invalid id");
  });
});
describe("POST / plans", () => {
  it("should create a new plan ", async () => {
    const mockPlan = { id: 5, namePlan: "Plan A" };
    PlanRepository.prototype.create.mockResolvedValue(mockPlan);

    const res = await request(app).post("/api/plans").send(mockPlan);
    expect(res.status).toBe(201);
    expect(res.body).toEqual("created");
  });
  it("should handle the case when the plan id already exists", async () => {
    PlanRepository.prototype.create.mockRejectedValue(
      new Error("Plan already exists")
    );

    const res = await request(app).post("/api/plans").send({ id: "1" });
    expect(res.status).toBe(409);
    expect(res.body).toEqual("Plan already exists");
  });
  it("should handle internal server error", async () => {
    PlanRepository.prototype.create.mockRejectedValue(
      new Error("Internal Server Error")
    );

    const res = await request(app).post("/api/plans").send({ id: "5" });
    expect(res.status).toBe(500);
    expect(res.body).toEqual(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
  });
});
describe("PUT / plans/:id", () => {
  it("should update a plan", async () => {
    const mockPlan = { id: 1, name: "Plan A" };
    PlanRepository.prototype.update.mockResolvedValue(mockPlan);

    const res = await request(app).put("/api/plans/1").send(mockPlan);
    expect(res.status).toBe(200);
    expect(res.body).toEqual("updeated successfully plan with id: 1.");
  });
  it("should handle the case when the plan does not exist", async () => {
    PlanRepository.prototype.update.mockRejectedValue(
      new Error("Plan not found")
    );

    const res = await request(app).put("/api/plans/1").send({ id: "1" });
    expect(res.status).toBe(404);
    expect(res.body).toEqual("Plan not found");
  });
  it("should handle internal server error", async () => {
    PlanRepository.prototype.update.mockRejectedValue(
      new Error("Internal Server Error")
    );

    const res = await request(app).put("/api/plans/1").send({ id: "1" });
    expect(res.status).toBe(500);
    expect(res.body).toEqual(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
  });
  it("should handle the case when the id is invalid", async () => {
    PlanRepository.prototype.update.mockRejectedValue(new Error("Invalid id"));

    const res = await request(app).put("/api/plans/0").send({ id: "0" });
    expect(res.status).toBe(400);
    expect(res.body).toEqual("Invalid id");
  });
});
describe("DELETE / plans/:id", () => {
  it("should delete a plan", async () => {
    const mockPlan = { id: 1, name: "Plan A" };
    PlanRepository.prototype.delete.mockResolvedValue({ id: "1" });

    const res = await request(app).delete("/api/plans/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      "deleted successfully plan with id: " + mockPlan.id + "."
    );
  });
  it("should handle the case when the plan does not exist", async () => {
    PlanRepository.prototype.delete.mockRejectedValue(
      new Error("Plan not found")
    );

    const res = await request(app).delete("/api/plans/1");
    expect(res.status).toBe(404);
    expect(res.body).toEqual("Plan not found");
  });
  it("should handle internal server error", async () => {
    PlanRepository.prototype.delete.mockRejectedValue(
      new Error("Internal Server Error")
    );

    const res = await request(app).delete("/api/plans/1");
    expect(res.status).toBe(500);
    expect(res.body).toEqual(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
  });
  it("should handle the case when the id is invalid", async () => {
    PlanRepository.prototype.delete.mockRejectedValue(new Error("Invalid id"));

    const res = await request(app).delete("/api/plans/0");
    expect(res.status).toBe(400);
    expect(res.body).toEqual("Invalid id");
  });
});
describe("ALL other routes", () => {
  it("should return 404", async () => {
    const res = await request(app).patch("/api/plan");
    expect(res.status).toBe(404);
    expect(res.body).toEqual("Not Found");
  });
});
