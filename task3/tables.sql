CREATE TABLE Station (
    StationID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100) NOT NULL,
    Address VARCHAR(200),
    Phone VARCHAR(20)
);

CREATE TABLE Product (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    UnitPrice DECIMAL(12,2) NOT NULL,
    Unit VARCHAR(20) NOT NULL
);

CREATE TABLE Column_ (
    ColumnID INT PRIMARY KEY AUTO_INCREMENT,
    StationID INT NOT NULL,
    ProductID INT NOT NULL,
    FOREIGN KEY (StationID) REFERENCES Station(StationID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

CREATE TABLE Transaction (
    TransactionID INT PRIMARY KEY AUTO_INCREMENT,
    ColumnID INT NOT NULL,
    ProductID INT NOT NULL,
    StationID INT NOT NULL,
    Quantity DECIMAL(12,2) NOT NULL,
    Price DECIMAL(12,2) NOT NULL,
    TotalAmount DECIMAL(14,2) GENERATED ALWAYS AS (Quantity * Price) STORED,
    TransactionDate DATETIME NOT NULL,
    FOREIGN KEY (StationID) REFERENCES Station(StationID),
    FOREIGN KEY (ColumnID) REFERENCES Column_(ColumnID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
    INDEX idx_date (TransactionDate),
    INDEX idx_station (StationID),
    INDEX idx_column (ColumnID),
    INDEX idx_product (ProductID)
);

-- Lay giao dich trong khoang ngay cua 1 tram
SELECT TransactionID, StationID, ColumnID, ProductID, Quantity, Price, TotalAmount, TransactionDate
FROM Transaction
WHERE StationID = 1 AND TransactionDate BETWEEN '2025-08-01' AND '2025-08-30'
ORDER BY TransactionDate;

-- Tong doanh thu theo ngay cua 1 tru bom
SELECT DATE(TransactionDate) AS TransactionDay, SUM(TotalAmount) AS TotalRevenue
FROM Transaction
WHERE ColumnID = 1
GROUP BY DATE(TransactionDate)
ORDER BY TransactionDay;

-- Tong doanh thu theo ngay cua 1 tram
SELECT DATE(TransactionDate) AS TransactionDay, SUM(TotalAmount) AS TotalRevenue
FROM Transaction
WHERE StationID = 1
GROUP BY DATE(TransactionDate)
ORDER BY TransactionDay;

-- Top 3 hang hoa ban chay nhat va tong so lit tai 1 tram trong thang
SELECT p.Name AS ProductName, SUM(t.Quantity) AS TotalQuantity
FROM Transaction t
JOIN Product p ON t.ProductID = p.ProductID
WHERE t.StationID = 1 AND t.TransactionDate BETWEEN '2025-08-01' AND '2025-08-30'
GROUP BY p.ProductID, p.Name
ORDER BY TotalQuantity DESC
LIMIT 3;