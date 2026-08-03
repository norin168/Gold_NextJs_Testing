# Gold NextJS System (Phase 1 - Frontend Prototype)

## Project Objective

Build a lightweight Gold NextJS System prototype to demonstrate the user
interface and workflow to the customer.

> **Phase 1 is frontend only.**
>
> No backend, no database, and no API integration. All data will be
> mocked locally.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Project Scope](#project-scope)
- [Module 1 - Buy & Stock](#module-1---buy--stock)
- [Module 2 - Orders](#module-2---orders)
- [Mock Data](#mock-data)
- [Folder Structure](#folder-structure)
- [Development Rules](#development-rules)
- [Login](#login)
- [Future Phase (Phase 2)](#future-phase-phase-2)
- [Demo Goal](#demo-goal)

---

# Technology Stack

| Category         | Choice                     |
| ----------------- | --------------------------- |
| Framework         | Next.js 16, React 19, TypeScript |
| UI                 | Tailwind CSS v4, shadcn/ui, Lucide React |
| Form Validation    | React Hook Form, Zod        |
| State Management   | Zustand                     |
| Data Source        | Local mock data (TypeScript / JSON) |

---

# Project Scope

After login, display a simple application layout.

## Sidebar Menu

- Buy & Stock
- Orders
- Logout

No dashboard is required.

---

# Module 1 - Buy & Stock

## Layout

```text
------------------------------------------------------------
| Buy Gold                    | Stock                      |
|                              |                             |
------------------------------------------------------------
| Report Table                                              |
------------------------------------------------------------
```

## Buy Gold

### Form Fields

- **Type** — Dropdown
  - Buy (ទិញមាស)
  - Existing (មាសស្រាប់)
- **Price** — Number + currency dropdown (USD, KHR)
- **Weight** (លី)
- **Purify** (%)
- **Date**
- **Submit** — "Save Report"

Conditional fields based on `Type`:

| Type | Additional Fields |
| --- | --- |
| Buy | Price + currency (USD/KHR), Weight (លី), Purify (%), Date Purchase |
| Existing | Weight (លី), Purify (%), Date |

## Stock

### Fields

- **Weight** (លី)
- **Purify** (%)
- **Date Stock** (ថ្ងៃដាក់ចូល Stock)

## Report

- **Search**
- **Filter**
  - Type: All / Buy / Stock
  - Date Range
  - Gold Type (only shown when Type = "Buy"): All / Buy / Existing — filters the "Buy" rows down to the sub-type recorded on the Buy Gold form (`Type` field: Buy vs Existing)
- **Report Table**
  - Columns: No, Type, Gold Type (Buy only), Weight (លី), Purify (%), Price, Date
- **Totals**
  - Total Weight (លី): sum of all weights in the table
  - Total Price (default USD): sum of all prices in the table
  - Print button
- Selecting a row (e.g. "No. 1") shows totals for that item only.

### Report Layout

```text
------------------------------------------------------------
| Report Table                | Total                      |
------------------------------------------------------------
```

---

# Module 2 - Orders

## Layout

```text
------------------------------------------------------------
| Customer Order Buy          | Customer Order Sell        |
|                              |                             |
------------------------------------------------------------
| Report Table                                              |
------------------------------------------------------------
```

## Customer Order Buy

### Customer Information

- Name
- Phone
- Address

### Order Information

- Shop Name
- Odds (USD only, no currency dropdown) — today's base market price
- Weight (លី)
- Purify (%) — see [Price Calculation](#price-calculation)
- Deposit + currency dropdown (USD, KHR)
- Payment Method — Dropdown (Cash, ABA, ACLEDA)
- Date Order
- Price — calculated and displayed at the bottom of Order Information (read-only, see [Price Calculation](#price-calculation))

- **Submit** — "Save Report"

## Customer Order Sell

### Customer Information

- Name
- Phone
- Address

### Order Information

- Shop Name
- Weight (លី)
- Purify (%) — see [Price Calculation](#price-calculation)
- Odds (USD only, no currency dropdown) — today's base market price
- Deposit + currency dropdown (USD, KHR)
- Payment Method — Dropdown (Cash, ABA, ACLEDA)
- Date Order
- Price — calculated and displayed at the bottom of Order Information (read-only, see [Price Calculation](#price-calculation))

- **Submit** — "Save Report"

## Price Calculation

Price is not entered by the user — it is derived from `Odds`, `Weight`, and `Purify` and shown live at the bottom of the Order Information section.

- `Odds`: base market price today, USD only.
- `Weight`: entered in លី (grams).
- `Purify`: gold purity, e.g. `30`, `50`, or `9999` for full/100% gold.

```text
If Purify = 9999 (100% gold):
    Price = (Weight ÷ 1000) × Odds

Otherwise:
    Price = (Weight ÷ 1000) × (Purify ÷ 100) × Odds
```

Example: Odds = $9000, Weight = 1000, Purify = 30 → Price = (1000 ÷ 1000) × (30 ÷ 100) × 9000 = $2,700.

This same formula applies to both Customer Order Buy and Customer Order Sell.

## Report

- **Search**
- **Filter**
  - Type: All / Order Buy / Order Sell
  - Date Range
- **Report Table**
  - Columns: No, Type, Name + Phone + Location, Shop, Weight (លី), Purify (%), Odds (USD), Price (calculated, default USD, small KHR text e.g. `$100 (400,000៛)`), Deposit, Date
- **Totals**
  - Weight
    - Total Weight Sell — Customer Booked (លី): sum of all "sell" weights
    - Total Weight Buy — Customer Booked (លី): sum of all "buy" weights
  - Deposit (default USD, small KHR text e.g. `$100 (400,000៛)`)
    - Total Cash
    - Total ABA
    - Total ACLEDA
  - Print button
- Selecting a row (e.g. "No. 1") shows totals for that item only.

### Report Layout

```text
------------------------------------------------------------
| Report Table                | Total                      |
------------------------------------------------------------
```

---

# Mock Data

Use a dedicated mock folder:

```text
src/
└── mock/
    ├── buy.ts
    ├── stock.ts
    ├── orders.ts
    ├── customers.ts
    └── suppliers.ts
```

Example:

```ts
export const buyTransactions = [
  {
    id: 1,
    supplier: "ABC Gold",
    goldType: "buy", // "buy" | "existing"
    weight: 10,
    price: 4500,
  },
];
```

---

# Folder Structure

```text
src/
├── app/
│   ├── login/
│   ├── buy-stock/
│   └── orders/
│
├── components/
├── features/
├── mock/
├── stores/
├── types/
├── lib/
└── utils/
```

---

# Development Rules

- Build reusable components.
- Keep business logic separated from UI.
- Use mock data for every feature.
- Simulate CRUD operations using local state.
- Design components so they can later connect to a real database.

---

# Login

Phase 1 login is a UI mockup only — no real authentication, user accounts, or session handling. A static login screen leads straight into the app shell. Real auth is out of scope until a later phase.

---

# Future Phase (Phase 2)

After customer approval:

- Integrate MySQL
- Integrate Prisma ORM
- Replace mock data with database operations
- Keep the existing UI and user workflow unchanged

Architecture:

```text
Next.js
   │
Server Actions
   │
Prisma ORM
   │
MySQL
```

---

# Demo Goal

The prototype should allow the customer to:

- Login
- Navigate between modules
- Fill in forms
- Create records
- Edit records
- Delete records
- Search and filter reports

The application should behave like a real system while using only mock
data.
