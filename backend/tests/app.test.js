import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("GET /", () => {
    it("should return hello world", async () => {
        const response = await request(app).get("/");

        expect(response.status).toBe(200);
        expect(response.text).toBe("hello world");
    });
});


describe("GET /invalid-route", () => {
    it("should return 404 for an unknown route", async () => {
        const response = await request(app).get("/invalid-route");

        expect(response.status).toBe(404);
    });
});