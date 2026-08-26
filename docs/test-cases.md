# API Test Cases

| ID | Endpoint | Scenario | Expected result |
| --- | --- | --- | --- |
| API-001 | `POST /auth/login` | Valid credentials | `200`, access and refresh tokens returned |
| API-002 | `GET /auth/me` | Valid bearer token | `200`, authenticated user profile returned |
| API-003 | `POST /auth/login` | Invalid password | `400`, error message returned |
| API-004 | `GET /products` | Paginated request with selected fields | `200`, five product records and valid field types |
| API-005 | `GET /products/1` | Existing product | `200`, matching ID and valid product fields |
| API-006 | `GET /products/999999` | Missing product | `404`, error message returned |
| API-007 | `POST /todos/add` | Create todo | `201`, returned todo reflects submitted data |
| API-008 | `PATCH /todos/1` | Mark todo complete | `200`, returned todo is complete |
