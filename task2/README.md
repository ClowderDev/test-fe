## Cài đặt và chạy

```bash
# Cài đặt dependencies
cd .\task2\
npm install

# Chạy development server
npm run dev
```

Truy cập: http://localhost:3000

## Hướng dẫn sử dụng

1. **Chọn thời gian** giao dịch
2. **Nhập số lượng** xăng dầu bán
3. **Chọn trụ** xăng (từ Trụ 1 đến Trụ 12)
4. **Nhập doanh thu** từ giao dịch
5. **Nhập đơn giá** xăng dầu
6. **Click "Cập nhật"** để lưu giao dịch

## Ý tưởng thực hiện

**Bài toán:** Cần tool đơn giản để nhân viên cửa hàng xăng dầu nhập thông tin giao dịch bán hàng.

**Giải pháp:**

- Form nhập liệu với validation đầy đủ
- Giao diện thân thiện với Material-UI
- Xử lý dữ liệu với React Hook Form và Zod
- Thông báo thành công sau khi cập nhật

**Workflow:**

```
Nhập thời gian → Nhập số lượng → Chọn trụ → Nhập doanh thu → Nhập đơn giá → Cập nhật
```

## Thông tin giao dịch

Form bao gồm các trường sau:

| Trường    | Loại dữ liệu | Bắt buộc | Mô tả                         |
| --------- | ------------ | -------- | ----------------------------- |
| Thời gian | DateTime     | Có       | Thời điểm thực hiện giao dịch |
| Số lượng  | Number       | Có       | Lượng xăng dầu bán (lít)      |
| Trụ       | Select       | Có       | Trụ xăng thực hiện (1-12)     |
| Doanh thu | Number       | Có       | Tổng tiền thu được            |
| Đơn giá   | Number       | Có       | Giá bán mỗi lít               |
