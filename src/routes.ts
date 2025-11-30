import React, { lazy, createElement } from "react";
import type { RouteObject } from "react-router-dom";
import TemplateCreatePage from "./pages/admin/template-create";

// ...existing imports...

export const routes: RouteObject[] = [
  // ...existing routes...
  {
    path: "/admin/template-create",
    element: createElement(TemplateCreatePage),
  },
];

export default routes;
