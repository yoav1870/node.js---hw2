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
    expect(res.body).toBe("Invalid id");
  });
  it("should return status 404 when no plans are found", async () => {
    planRepository.find.mockResolvedValue([]);

    const res = await request(app).get("/api/plans");
    expect(res.status).toBe(404);
    expect(res.body).toBe("There are no plans");
  });
  it("should return status 500 when an error occurs", async () => {
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
