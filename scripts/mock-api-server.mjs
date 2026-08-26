import http from "node:http";

const port = Number(process.env.MOCK_API_PORT ?? 4173);

const sendJson = (response, status, body) => {
  response.writeHead(status, { "content-type": "application/json" });
  response.end(JSON.stringify(body));
};

const readBody = async (request) => {
  let raw = "";
  for await (const chunk of request) raw += chunk;
  return raw ? JSON.parse(raw) : {};
};

const products = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  title: `Sample product ${index + 1}`,
  price: 10 + index,
  category: "test-category"
}));

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);
  const { method } = request;

  if (method === "POST" && url.pathname === "/auth/login") {
    const credentials = await readBody(request);
    if (credentials.username === "emilys" && credentials.password === "emilyspass") {
      return sendJson(response, 200, {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        id: 1,
        username: "emilys",
        email: "emilys@example.test",
        firstName: "Emily",
        lastName: "Johnson"
      });
    }
    return sendJson(response, 400, { message: "Invalid credentials" });
  }

  if (method === "GET" && url.pathname === "/auth/me") {
    if (request.headers.authorization === "Bearer mock-access-token") {
      return sendJson(response, 200, {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        id: 1,
        username: "emilys",
        email: "emilys@example.test",
        firstName: "Emily",
        lastName: "Johnson"
      });
    }
    return sendJson(response, 401, { message: "Unauthorized" });
  }

  if (method === "GET" && url.pathname === "/products") {
    return sendJson(response, 200, { products, total: 50, skip: 0, limit: 5 });
  }

  if (method === "GET" && url.pathname === "/products/1") {
    return sendJson(response, 200, products[0]);
  }

  if (method === "GET" && url.pathname === "/products/999999") {
    return sendJson(response, 404, { message: "Product with id '999999' not found" });
  }

  if (method === "POST" && url.pathname === "/todos/add") {
    const todo = await readBody(request);
    return sendJson(response, 201, { id: 201, ...todo });
  }

  if (method === "PATCH" && url.pathname === "/todos/1") {
    const update = await readBody(request);
    return sendJson(response, 200, {
      id: 1,
      todo: "Review API response contract",
      completed: update.completed,
      userId: 5
    });
  }

  return sendJson(response, 404, { message: "Route not found" });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Mock API available at http://127.0.0.1:${port}`);
});
