import z from "zod";

export const formSchema = z.object({
  time: z.string().min(1, "Thời gian không được để trống"),
  quantity: z.number().min(1, "Số lượng phải lớn hơn 0"),
  column: z.string().min(1, "Trụ không được để trống"),
  revenue: z.number().min(1, "Doanh thu phải lớn hơn hoặc bằng 0"),
  unitPrice: z.number().min(1, "Đơn giá phải lớn hơn hoặc bằng 0"),
});
