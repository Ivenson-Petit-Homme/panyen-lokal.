# Advanced Admin Panel Expansion

This plan details the implementation of full CRUD operations for products and users, along with professional analytics and stock management tools in the Admin Panel.

## User Review Required

> [!IMPORTANT]
> **Product Images**: We will use a URL/Text field for images in the admin form. You will need to provide the path to your assets (e.g., `/src/assets/images/filename.jpg`).
> **Analytics**: The "Top Selling" chart will use mock data initially until enough real orders are placed in the database.

## Proposed Changes

### 1. Backend Infrastructure (SQL Refactor)

#### [MODIFY] [server.ts](file:///C:/Users/ECME/Documents/creation site web/panyen-lokal/server.ts)
- Implement `POST /api/admin/products` (Create product).
- Implement `PUT /api/admin/products/:id` (Update full product details).
- Implement `DELETE /api/admin/products/:id` (Remove product).
- Implement `GET /api/admin/users` (List all members).
- Implement `PUT /api/admin/users/:id/role` (Promote/Demote members).
- Implement `GET /api/admin/analytics` (Return data for charts).

---

### 2. Frontend Admin Panel Features

#### [MODIFY] [AdminProducts.tsx](file:///C:/Users/ECME/Documents/creation site web/panyen-lokal/src/components/admin/AdminProducts.tsx)
- Add a **Create/Edit Modal** with fields for:
    - Title, Slug, Category, Badge, Short/Full Description.
    - Highlights (JSON), Ingredients (JSON), Usage (JSON).
    - Image URL.
- Implement **Delete Confirmation**.

#### [MODIFY] [AdminDashboard.tsx](file:///C:/Users/ECME/Documents/creation site web/panyen-lokal/src/components/admin/AdminDashboard.tsx)
- Integrate `recharts` to display:
    - **Sales Performance Bar Chart** (Top products).
    - **Stock Levels Overview**.
- Real-time fetching of stats from the new analytics endpoint.

#### [MODIFY] [AdminUsers.tsx](file:///C:/Users/ECME/Documents/creation site web/panyen-lokal/src/components/admin/AdminUsers.tsx)
- Connect to real backend list of users.
- Add actions to manage roles (`user` vs `admin`).

---

### 3. Database Schema Sync

#### [MODIFY] [database.sql](file:///C:/Users/ECME/Documents/creation site web/panyen-lokal/database.sql)
- Ensure all fields (highlights, ingredients, etc.) are correctly typed as `TEXT` for JSON storage.

## Verification Plan

### Automated Tests
- `npm run lint` to ensure no component errors.
- Test JSON parsing in backend for complex product fields.

### Manual Verification
1. Open Admin Panel -> Products -> Add New.
2. Verify the product appears in the main Catalog.
3. Edit the product's price or description and verify live updates.
4. Check Dashboard for the new Analytics charts.
5. Manage a test user role.
