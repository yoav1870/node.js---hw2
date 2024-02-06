const app = require("../server");
const { planRepository } = require("../repository/plan.repository");
const request = require("supertest");
jest.mock("../repository/plan.repository.js");

describe("GET /api/plans", () => {
  it("should return all plans with status 200", async () => {
    const mockPlans = [
      { id: 1, namePlan: "Basic" },
      { id: 2, namePlan: "Premium" },
    ];

    planRepository.find.mockResolvedValue(mockPlans);

    const res = await request(app).get("/api/plans");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPlans);
  });
  it("should return status 400 when the id is invalid", async () => {
    const res = await request(app).get("/api/plans/0");
    expect(res.status).toBe(400);
    expect(res.body).toBe("Invalid id, received id: 0 .");
  });
  it("should return status 404 when no plans are found", async () => {
    planRepository.find.mockResolvedValue([]);

    const res = await request(app).get("/api/plans");
    expect(res.status).toBe(404);
    expect(res.body).toBe("No data found");
  });
  it("should return status 500 when the server encountered an unexpected condition that prevented it from fulfilling the request", async () => {
    planRepository.find.mockRejectedValue(
      new Error(
        "server encountered an unexpected condition that prevented it from fulfilling the request."
      )
    );

    const res = await request(app).get("/api/plans");
    expect(res.status).toBe(500);
    expect(res.body).toBe(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
  });
});
describe("GET /api/plans/:id", () => {
  it("should return a plan with status 200", async () => {
    const mockPlan = [
      { id: 1, namePlan: "Basic" },
      { id: 2, namePlan: "Premium" },
    ];
    planRepository.retrieve.mockResolvedValue(mockPlan);

    const res = await request(app).get("/api/plans/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPlan);
  });
});
describe("POST /api/plans", () => {
  it("should return status 201 when the plan is created", async () => {
    const mockPlan = { id: 1, namePlan: "Basic" };
    planRepository.find.mockResolvedValue([]);
    planRepository.create.mockResolvedValue(mockPlan);

    const res = await request(app).post("/api/plans").send(mockPlan);
    expect(res.status).toBe(201);
    expect(res.body).toEqual("created");
  });
  it("should return status 404 when the id is not provided", async () => {
    const mockPlan = { namePlan: "Basic" };
    planRepository.find.mockResolvedValue([mockPlan]);
    planRepository.create.mockResolvedValue(mockPlan);
    const res = await request(app).post("/api/plans").send(mockPlan);
    expect(res.status).toBe(404);
    expect(res.body).toBe("required id to create the plan.");
  });
  it("should return status 409 when the id is taken", async () => {
    const mockPlan = { id: 1, namePlan: "Basic" };
    planRepository.find.mockResolvedValue([mockPlan]);
    planRepository.create.mockResolvedValue(mockPlan);

    const res = await request(app).post("/api/plans").send(mockPlan);
    expect(res.status).toBe(409);
    expect(res.body).toBe("Plan with id : " + mockPlan.id + " already exists");
  });
  it("should return status 500 when the server encountered an unexpected condition that prevented it from fulfilling the request", async () => {
    const mockPlan = { id: 1, namePlan: "Basic" };
    planRepository.find.mockResolvedValue([]);
    planRepository.create.mockRejectedValue(
      new Error(
        "server encountered an unexpected condition that prevented it from fulfilling the request."
      )
    );
    const res = await request(app).post("/api/plans").send(mockPlan);
    expect(res.status).toBe(500);
    expect(res.body).toBe(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
  });
});
describe("DELETE /api/plans/:id", () => {
  it("should return status 200 when the plan is deleted", async () => {
    const mockPlan = { id: 1, namePlan: "Basic" };
    planRepository.find.mockResolvedValue([mockPlan]);
    planRepository.delete.mockResolvedValue(mockPlan);

    const res = await request(app).delete("/api/plans/1");
    expect(res.status).toBe(200);
  });
  it("should return status 400 when the id is invalid", async () => {
    const mockPlan = { id: 0, namePlan: "Basic" };
    const res = await request(app).delete("/api/plans/0");
    expect(res.status).toBe(400);
    expect(res.body).toBe("Invalid id, received id: " + mockPlan.id + " .");
  });
  it("should return status 404 when the plan is not found", async () => {
    const mockPlan = { id: 1, namePlan: "Basic" };
    planRepository.find.mockResolvedValue([mockPlan]);
    planRepository.delete.mockResolvedValue(mockPlan);

    const res = await request(app).delete("/api/plans/2");
    expect(res.status).toBe(404);
    expect(res.body).toBe("Plan with id: 2 does not exist");
  });
  it("should return status 500 when the server encountered an unexpected condition that prevented it from fulfilling the request", async () => {
    planRepository.delete.mockRejectedValue(
      new Error(
        "server encountered an unexpected condition that prevented it from fulfilling the request."
      )
    );

    const res = await request(app).delete("/api/plans/1");
    expect(res.status).toBe(500);
    expect(res.body).toBe(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
  });
});
describe("PUT /api/plans/:id", () => {
  it("should return status 200 when the plan is updated", async () => {
    const mockPlan = { id: 1, namePlan: "Basic" };
    planRepository.find.mockResolvedValue([mockPlan]);
    planRepository.update.mockResolvedValue(mockPlan);

    const res = await request(app).put("/api/plans/1").send(mockPlan);
    expect(res.status).toBe(200);
  });
  it("should return status 400 when the id is invalid", async () => {
    const mockPlan = { id: 0, namePlan: "Basic" };
    const res = await request(app).put("/api/plans/0").send(mockPlan);
    expect(res.status).toBe(400);
    expect(res.body).toBe("Invalid id, received id: " + mockPlan.id + " .");
  });
  it("should return status 404 when the plan is not found", async () => {
    const mockPlan = { id: 1, namePlan: "Basic" };
    planRepository.find.mockResolvedValue([mockPlan]);
    planRepository.update.mockResolvedValue(mockPlan);

    const res = await request(app).put("/api/plans/2").send(mockPlan);
    expect(res.status).toBe(404);
    expect(res.body).toBe("Plan with id: 2 does not exist");
  });
  it("should return status 404 when the id is not provided", async () => {
    const mockPlan = { namePlan: "Basic" };
    const res = await request(app).put("/api/plans").send(mockPlan);
    expect(res.status).toBe(404);
    expect(res.body).toBe("required id to put the plan.");
  });
  it("should return status 500 when the server encountered an unexpected condition that prevented it from fulfilling the request", async () => {
    const mockPlan = { id: 1, namePlan: "Basic" };
    planRepository.update.mockRejectedValue(
      new Error(
        "server encountered an unexpected condition that prevented it from fulfilling the request."
      )
    );

    const res = await request(app).put("/api/plans/1").send(mockPlan);
    expect(res.status).toBe(500);
    expect(res.body).toBe(
      "server encountered an unexpected condition that prevented it from fulfilling the request."
    );
  });
});
describe("OTHER errors /api/plans", () => {
  it("should return status 404 when the path is not found", async () => {
    const res = await request(app).get("/api");
    expect(res.status).toBe(404);
    expect(res.body).toBe("Not Found");
  });
  it("should return status 404 when the crud is not found", async () => {
    const res = await request(app).patch("/api/plans/1");
    expect(res.status).toBe(404);
    expect(res.body).toBe("Not Found");
  });
});
