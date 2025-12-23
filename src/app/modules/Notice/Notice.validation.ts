import { z } from "zod";

const createNoticeValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    type: z.string().min(1, "Notice type is required"),
    department: z.string().min(1, "Department is required"),
    status: z.enum(["Published", "Draft", "Archived"]).optional(),
    publishedOn: z.date({
      required_error: "Published date is required",
      invalid_type_error: "Invalid date",
    }),
    employeeId: z.string().min(1, "Employee ID is required"),
    employeeName: z.string().min(1, "Employee name is required"),
    employeeDepartment: z.string().min(1, "Employee department is required"),
    attachment: z.string().url("Attachment must be a valid URL").optional(),
  }),
});

export const NoticeValidation = {
  createNoticeValidationSchema,
};
