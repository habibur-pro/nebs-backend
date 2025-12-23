import { UserRole } from "@prisma/client";
import express from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";
import { parseBodyData } from "../../middlewares/parseBodyData";
import fileUploaderCloud from "../../../helpers/fileUploaderCloud";

const router = express.Router();

// const uploadSingle = fileUploader.upload.single("profileImage");

router.get("/get-me", auth(), UserController.getMe);
// get single user
router.get("/:id", auth(), UserController.getUserById);
router.patch(
  "/update-me",
  auth(),
  fileUploaderCloud.upload.single("profileImage"),
  parseBodyData,
  validateRequest(UserValidation.updateMeSchema),
  UserController.updateMe
);

// block user
router.post("/:id", auth(UserRole.Admin), UserController.blockUser);

// delete user
router.delete("/:id", auth(UserRole.Admin), UserController.deleteUser);

// get all user
router.get("/", auth(UserRole.Admin), UserController.getAllUsers);

export const UserRoutes = router;
