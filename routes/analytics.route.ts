import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  generateCoursesAnalytics,
  generateOrdersAnalytics,
  generateUsersAnalytics,
} from "../controllers/analytics.controller";
import { updateAccessToken } from "../controllers/user.controller";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/generate-users-analytics",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  generateUsersAnalytics
);

analyticsRouter.get(
  "/generate-courses-analytics",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  generateCoursesAnalytics
);

analyticsRouter.get(
  "/generate-orders-analytics",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  generateOrdersAnalytics
);

export default analyticsRouter;
