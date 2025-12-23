import { RequestHandler } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { NoticeServices } from "./Notice.service";
import { ImageServices } from "../Image/Image.service";

const createNotice = catchAsync(async (req, res) => {
  if (req.file) {
    const url = await ImageServices.createImage(req.file);
    req.body.attachment = url.imageUrl;
  }
  const result = await NoticeServices.createNoticeIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Notice created successfully",
    data: result,
  });
});

const getAllNotice: RequestHandler = catchAsync(async (req, res) => {
  const result = await NoticeServices.getAllNoticeFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notices retrieved successfully",
    // meta: result.meta,
    data: result,
  });
});

const getSingleNotice: RequestHandler = catchAsync(async (req, res) => {
  const result = await NoticeServices.getSingleNoticeFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice retrieved successfully",
    data: result,
  });
});

const updateNotice: RequestHandler = catchAsync(async (req, res) => {
  const result = await NoticeServices.updateNoticeIntoDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice updated successfully",
    data: result,
  });
});

const deleteNotice: RequestHandler = catchAsync(async (req, res) => {
  const result = await NoticeServices.deleteNoticeFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Notice deleted successfully",
    data: result,
  });
});

export const NoticeControllers = {
  createNotice,
  getAllNotice,
  getSingleNotice,
  updateNotice,
  deleteNotice,
};
