import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  generateCoursesAnalytics,
  generateOrdersAnalytics,
  generateUsersAnalytics,
} from "../controllers/analytics.controller";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/generate-users-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  generateUsersAnalytics
);

analyticsRouter.get(
  "/generate-courses-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  generateCoursesAnalytics
);

analyticsRouter.get(
  "/generate-orders-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  generateOrdersAnalytics
);

export default analyticsRouter;
