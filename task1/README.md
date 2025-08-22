## Cài đặt và chạy

```bash
# Cài đặt dependencies
cd .\task1\
npm install

# Chạy development server
npm run dev
```

Truy cập: http://localhost:3000

## Hướng dẫn sử dụng

1. **Upload file Excel** có cột "Giờ" và "Thành tiền"
2. **Nhập khoảng thời gian** (VD: từ 08:00 đến 18:00)
3. **Click "Tính tổng"** để xem kết quả

## Ý tưởng thực hiện

**Bài toán:** Cần tool đơn giản để nhân viên cửa hàng xăng dầu phân tích doanh thu theo giờ.

**Giải pháp:**

- Xử lý file Excel ngay trên browser (không cần server)
- Tự động tìm header trong file Excel
- Lọc dữ liệu theo khoảng thời gian và tính tổng

**Workflow:**

```
Upload Excel → Tìm header → Lọc theo thời gian → Tính tổng → Hiển thị kết quả
```

## Format file Excel

File cần có 2 cột chính:

| Cột        | Ví dụ                  |
| ---------- | ---------------------- |
| Giờ        | 08:30:00, 14:15:20     |
| Thành tiền | 1,290,432 hoặc 1290432 |
