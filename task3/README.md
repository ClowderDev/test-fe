## Thiết kế cơ sở dữ liệu

Database schema cho hệ thống quản lý cửa hàng xăng dầu

## Cấu trúc bảng

### Station (Trạm xăng)

```sql
- StationID: ID trạm (Primary Key)
- Name: Tên trạm xăng
- Address: Địa chỉ
- Phone: Số điện thoại
```

### Product (Sản phẩm)

```sql
- ProductID: ID sản phẩm (Primary Key)
- Name: Tên sản phẩm (xăng, dầu...)
- UnitPrice: Đơn giá
- Unit: Đơn vị tính
```

### Column\_ (Trụ bơm)

```sql
- ColumnID: ID trụ bơm (Primary Key)
- StationID: ID trạm xăng (Foreign Key)
- ProductID: ID sản phẩm (Foreign Key)
```

### Transaction (Giao dịch)

```sql
- TransactionID: ID giao dịch (Primary Key)
- ColumnID: ID trụ bơm (Foreign Key)
- ProductID: ID sản phẩm (Foreign Key)
- StationID: ID trạm xăng (Foreign Key)
- Quantity: Số lượng bán
- Price: Đơn giá tại thời điểm bán
- TotalAmount: Tổng tiền (tự động tính)
- TransactionDate: Thời gian giao dịch
```
