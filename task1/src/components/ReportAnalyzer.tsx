import React, { useState } from "react";
import * as XLSX from "xlsx";

interface Transaction {
  ThoiGian: string;
  ThanhTien: number;
}

function parseTime(str: string): number {
  const [h, m, s] = str.split(":").map(Number);
  return h * 3600 + m * 60 + s;
}

const ReportAnalyzer: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("23:59:59");
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = evt.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Đọc tất cả dữ liệu dạng array, bao gồm cả header
        const rawData: string[][] = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          defval: "",
        });

        // Tìm dòng header thực sự (dòng có chứa "Giờ", "Thành tiền")
        let headerRowIndex = -1;
        let headerRow: string[] = [];

        for (let i = 0; i < Math.min(rawData.length, 10); i++) {
          // Chỉ tìm trong 10 dòng đầu
          const row = rawData[i];
          if (
            row &&
            row.some((cell) => {
              const cellStr = String(cell).toLowerCase();
              return (
                cellStr.includes("giờ") ||
                cellStr.includes("gio") ||
                cellStr.includes("thành tiền") ||
                cellStr.includes("thanh tien")
              );
            })
          ) {
            headerRowIndex = i;
            headerRow = row.map((cell) => String(cell));
            break;
          }
        }

        if (headerRowIndex === -1) {
          setError(
            "Không tìm thấy header hợp lệ trong file Excel. Vui lòng kiểm tra file có chứa cột 'Giờ' và 'Thành tiền'"
          );
          return;
        }

        // Tìm index của cột "Giờ" và "Thành tiền"
        const gioIndex = headerRow.findIndex((h) => {
          const hStr = String(h).toLowerCase();
          return hStr.includes("giờ") || hStr.includes("gio");
        });
        const tienIndex = headerRow.findIndex((h) => {
          const hStr = String(h).toLowerCase();
          return hStr.includes("thành tiền") || hStr.includes("thanh tien");
        });

        if (gioIndex === -1 || tienIndex === -1) {
          setError("Không tìm thấy cột cần thiết.");
          return;
        }

        // Lấy dữ liệu từ dòng sau header
        const dataRows = rawData.slice(headerRowIndex + 1);

        const mapped: Transaction[] = dataRows
          .map((row) => {
            const gio = gioIndex >= 0 ? String(row[gioIndex] || "").trim() : "";
            let thanhTienRaw =
              tienIndex >= 0 ? String(row[tienIndex] || "0") : "0";
            thanhTienRaw = thanhTienRaw.replace(/[,\s]/g, "");
            const thanhTien = Number(thanhTienRaw);
            return {
              ThoiGian: gio,
              ThanhTien: isNaN(thanhTien) ? 0 : thanhTien,
            };
          })
          .filter(
            (tran) =>
              tran.ThoiGian && !isNaN(tran.ThanhTien) && tran.ThanhTien > 0
          );

        if (mapped.length === 0) {
          setError("Không tìm thấy dữ liệu giao dịch hợp lệ trong file.");
        } else {
          setTransactions(mapped);
          setTotal(null);
          setError(null);
        }
      } catch (err) {
        setError("Lỗi khi đọc file. Vui lòng kiểm tra lại file Excel.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleCalculate = () => {
    if (!transactions.length) {
      setError("Vui lòng upload file báo cáo");
      return;
    }

    if (
      !startTime.match(/^\d{2}:\d{2}:\d{2}$/) ||
      !endTime.match(/^\d{2}:\d{2}:\d{2}$/)
    ) {
      setError("Định dạng thời gian không hợp lệ");
      return;
    }

    const start = parseTime(startTime);
    const end = parseTime(endTime);

    if (start > end) {
      setError("Giờ bắt đầu phải nhỏ hơn giờ kết thúc");
      return;
    }

    const filtered = transactions.filter((tran) => {
      const t = parseTime(tran.ThoiGian);
      return t >= start && t <= end;
    });

    const sum = filtered.reduce((acc, curr) => acc + curr.ThanhTien, 0);
    setTotal(sum);
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-center text-black mb-3">
        Phân tích báo cáo giao dịch
      </h2>

      <div className="mb-6">
        <label className="block mb-2 text-black">Chọn file báo cáo</label>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          disabled={loading}
          className="w-full p-2 border-2 border-gray-600 rounded-md bg-white text-gray-600"
        />
        {fileName && (
          <p className="mt-2 text-black text-sm">Đã tải: {fileName}</p>
        )}
        {loading && (
          <p className="mt-2 text-blue-600 text-sm">Đang xử lý file...</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-black">Khoảng thời gian</label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <label className="mr-2 text-black">Từ: </label>
            <input
              type="time"
              value={startTime.slice(0, 5)}
              onChange={(e) => setStartTime(e.target.value + ":00")}
              className="p-2 border-2 border-gray-600 rounded-md bg-white text-gray-600"
            />
          </div>
          <div>
            <label className="mr-2 text-black">Đến: </label>
            <input
              type="time"
              value={endTime.slice(0, 5)}
              onChange={(e) => setEndTime(e.target.value + ":00")}
              className="p-2 border-2 border-gray-600 rounded-md bg-white text-gray-600"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        disabled={loading || !transactions.length}
        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Đang xử lý..." : "Tính tổng Thành tiền"}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {total !== null && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <div className="text-center">
            Tổng Thành tiền:{" "}
            <strong className="text-green-600 text-lg">
              {total.toLocaleString("vi-VN")} VND
            </strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportAnalyzer;
