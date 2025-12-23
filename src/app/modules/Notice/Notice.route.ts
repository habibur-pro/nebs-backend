import express from "express";
import { NoticeControllers } from "./Notice.controller";
import fileUploaderCloud from "../../../helpers/fileUploaderCloud";
import { parseBodyData } from "../../middlewares/parseBodyData";
import { NoticeValidation } from "./Notice.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/",
  fileUploaderCloud.upload.single("attachment"),
  parseBodyData,
  validateRequest(NoticeValidation.createNoticeValidationSchema),
  NoticeControllers.createNotice
);

router.get("/", NoticeControllers.getAllNotice);

router.get("/:id", NoticeControllers.getSingleNotice);

router.patch(
  "/:id",
  //  validateRequest(NoticeValidation.createNoticeValidationSchema),
  NoticeControllers.updateNotice
);

router.delete("/:id", NoticeControllers.deleteNotice);

export const NoticeRoutes = router;
