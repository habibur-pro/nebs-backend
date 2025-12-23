import prisma from "../../../shared/prisma";
import QueryBuilder from "../../../helpers/queryBuilder";
import { Notice } from "@prisma/client";

const createNoticeIntoDB = async (payload: Notice) => {
  const newNotice = await prisma.notice.create({ data: payload });
  return newNotice;
};

const getAllNoticeFromDB = async (query: Record<string, unknown>) => {
  const allNoticeQuery = new QueryBuilder(prisma.notice, query);
  const result = await allNoticeQuery
    .search(["Notice"])
    .filter()
    .sort()
    .paginate()
    .execute();
  const pagination = await allNoticeQuery.countTotal();

  return {
    meta: pagination,
    data: result,
  };
};

const getSingleNoticeFromDB = async (id: string) => {
  return await prisma.notice.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
};

const updateNoticeIntoDB = async (id: string, payload: Partial<Notice>) => {
  const updatedNotice = await prisma.notice.update({
    where: { id },
    data: payload,
  });
  return updatedNotice;
};

const deleteNoticeFromDB = async (id: string) => {
  return await prisma.notice.delete({
    where: { id },
  });
};

export const NoticeServices = {
  createNoticeIntoDB,
  getAllNoticeFromDB,
  getSingleNoticeFromDB,
  updateNoticeIntoDB,
  deleteNoticeFromDB,
};
