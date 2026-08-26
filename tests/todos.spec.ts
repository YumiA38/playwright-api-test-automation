import { expect, test } from "@playwright/test";
import type { Todo } from "../src/types/api.types";

test.describe("Todos API", () => {
  test("creates a todo and validates the API response", async ({ request }) => {
    const payload = {
      todo: "Review API response contract",
      completed: false,
      userId: 5
    };

    const response = await request.post("/todos/add", { data: payload });

    expect(response.status()).toBe(201);
    const todo = (await response.json()) as Todo;
    expect(todo.id).toEqual(expect.any(Number));
    expect(todo.todo).toBe(payload.todo);
    expect(todo.completed).toBe(false);
    expect(todo.userId).toBe(payload.userId);
  });

  test("updates a todo state", async ({ request }) => {
    const response = await request.patch("/todos/1", {
      data: { completed: true }
    });

    expect(response.status()).toBe(200);
    const todo = (await response.json()) as Todo;
    expect(todo.id).toBe(1);
    expect(todo.completed).toBe(true);
  });
});
