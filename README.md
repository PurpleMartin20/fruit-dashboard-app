# Fruit Dashboard App

A full-stack fruit inventory management app. Add, buy, and delete fruits through a React Native (Expo) web frontend backed by a FastAPI REST API. Cypress covers both UI and API test suites.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Reference](#api-reference)
- [Cypress Tests](#cypress-tests)

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React Native (Expo), TypeScript, GlueStack UI, NativeWind |
| Backend  | Python, FastAPI                   |
| Testing  | Cypress, Faker.js                 |

---

## Installation

### Prerequisites

- Node.js 18+
- Python 3.11+
- npm or yarn

---

### Backend

```bash
cd backend
python -m venv .venv
```

**Windows:**
```bash
.venv\Scripts\activate
```

**Mac/Linux:**
```bash
source .venv/bin/activate
```

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

---

### Frontend

```bash
cd frontend
npm install
npm run web
```

The app will open at `http://localhost:8081`.

---

### Cypress

From the project root:

```bash
npm install
npx cypress open
```

> Both the backend (`localhost:8000`) and frontend (`localhost:8081`) must be running before executing tests.

---

## API Reference

Base URL: `http://localhost:8000`

### Fruit Status Enum

| Value | Integer | Description |
|-------|---------|-------------|
| Available | `0` | Fruit is available to buy |
| Reserved  | `1` | Fruit is reserved |
| Sold      | `2` | Fruit has been sold |

---

### `GET /fruits`

Returns all fruits in the inventory.

**Response `200`:**
```json
[
  {
    "id": 1,
    "name": "Apple",
    "price": 2.99,
    "status": 0
  }
]
```

---

### `POST /fruits`

Adds a new fruit.

**Request body:**
```json
{
  "name": "Apple",
  "price": 2.99,
  "status": 0
}
```

> `status` is optional — defaults to `0` (Available) if omitted.

**Response `200`:**
```json
{
  "id": 1,
  "name": "Apple",
  "price": 2.99,
  "status": 0
}
```

**Response `422`** — missing required fields or invalid status value.

---

### `PATCH /fruits/{fruit_id}/buy`

Marks a fruit as sold. Only works if the fruit's current status is `Available (0)`.

**Response `200`:**
```json
{
  "id": 1,
  "name": "Apple",
  "price": 2.99,
  "status": 2
}
```

**Response `404`** — fruit ID not found.  
**Response `400`** — fruit is not available (`"Fruit is not available"`).

---

### `DELETE /fruits/{fruit_id}`

Removes a fruit from the inventory.

**Response `200`:**
```json
{
  "message": "Fruit deleted successfully",
  "id": 1
}
```

**Response `404`** — fruit ID not found.

---

### `POST /reset`

Clears all fruits and resets the ID counter back to `1`. Intended for test use only.

**Response `200`:**
```json
{
  "message": "Database reset"
}
```

---

## Cypress Tests

Test files live in `cypress/e2e/`. A shared `cy.resetDB()` custom command (defined in `cypress/support/commands.js`) hits `POST /reset` before each test to ensure a clean state.

---

### `api.cy.js` — API Tests

Tests the FastAPI endpoints directly using `cy.request()`, no UI involved.

| Test | Description |
|------|-------------|
| Add Fruit (Available) | `POST /fruits` with status `0` returns correct body |
| Add Fruit (Reserved) | `POST /fruits` with status `1` returns correct body |
| Add Fruit (Sold) | `POST /fruits` with status `2` returns correct body |
| Add Fruit (Invalid Status) | `POST /fruits` with status `3` returns `422` |
| Add Fruit (No Name) | `POST /fruits` missing `name` returns `422` |
| Add Fruit (No Price) | `POST /fruits` missing `price` returns `422` |
| Add Fruit (No Status) | `POST /fruits` missing `status` defaults to `Available` |
| Buy Fruit | `PATCH /fruits/1/buy` returns `200` |
| Buy Fruit (Wrong ID) | `PATCH /fruits/0/buy` returns `404` with `"Fruit not found"` |
| Buy Fruit (Not Available) | `PATCH` on a Reserved fruit returns `400` with `"Fruit is not available"` |
| Delete Fruit | `DELETE /fruits/2` returns success message |
| Delete Fruit (Wrong ID) | `DELETE` on a non-existent ID returns `404` |

---

### `add_fruit.cy.js` — UI Tests

Tests the Add Fruit form end-to-end through the browser.

| Test | Description |
|------|-------------|
| Add Fruit (Available) | Fills form, submits, and asserts the new fruit card appears with correct name, price, and status |
