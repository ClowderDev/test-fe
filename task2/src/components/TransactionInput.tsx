"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { formSchema } from "@/schema/form.schema";
import dayjs from "dayjs";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function TransactionInput() {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: "",
      quantity: 0,
      column: "",
      revenue: 0,
      unitPrice: 0,
    },
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted:", data);
    setState({ ...state, open: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        p: 3,
      }}
      suppressHydrationWarning
    >
      <Box
        component="form"
        id="transaction-form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          backgroundColor: "white",
          overflow: "hidden",
          maxWidth: 800,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 3,
            borderBottom: "1px solid #f0f0f0",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box>
            <IconButton sx={{ color: "#333", mr: 1, fontSize: "1.2rem" }}>
              ← Đóng
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#333" }}>
              Nhập giao dịch
            </Typography>
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#0066FF",
              borderRadius: "8px",
              textTransform: "none",
              px: 3,
              py: 1,
              fontWeight: 600,
            }}
          >
            Cập nhật
          </Button>
        </Box>

        {/* Form  */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Thời gian */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="time"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DateTimePicker
                  label="Thời gian"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => {
                    field.onChange(newValue ? newValue.toISOString() : "");
                  }}
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error?.message,
                      fullWidth: true,
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          "& fieldset": {
                            borderRadius: "10px",
                          },
                          "&:hover fieldset": {
                            borderRadius: "10px",
                          },
                          "&.Mui-focused fieldset": {
                            borderRadius: "10px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          borderRadius: "10px",
                        },
                      },
                    },
                    popper: {
                      sx: {
                        "& .MuiPaper-root": {
                          borderRadius: "10px",
                        },
                      },
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* Số lượng */}
          <TextField
            label="Số lượng"
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />

          {/* Trụ */}
          <FormControl fullWidth variant="outlined" error={!!errors.column}>
            <InputLabel>Trụ</InputLabel>
            <Select
              {...register("column")}
              label="Trụ"
              sx={{
                borderRadius: "10px",
              }}
            >
              <MenuItem value="tru1">Trụ 1</MenuItem>
              <MenuItem value="tru2">Trụ 2</MenuItem>
              <MenuItem value="tru3">Trụ 3</MenuItem>
              <MenuItem value="tru4">Trụ 4</MenuItem>
              <MenuItem value="tru5">Trụ 5</MenuItem>
              <MenuItem value="tru6">Trụ 6</MenuItem>
              <MenuItem value="tru7">Trụ 7</MenuItem>
              <MenuItem value="tru8">Trụ 8</MenuItem>
              <MenuItem value="tru9">Trụ 9</MenuItem>
              <MenuItem value="tru10">Trụ 10</MenuItem>
              <MenuItem value="tru11">Trụ 11</MenuItem>
              <MenuItem value="tru12">Trụ 12</MenuItem>
            </Select>
            {errors.column && (
              <FormHelperText>{errors.column.message}</FormHelperText>
            )}
          </FormControl>

          {/* Doanh thu */}
          <TextField
            label="Doanh thu"
            type="number"
            {...register("revenue", { valueAsNumber: true })}
            error={!!errors.revenue}
            helperText={errors.revenue?.message}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />

          {/* Đơn giá */}
          <TextField
            label="Đơn giá"
            type="number"
            {...register("unitPrice", { valueAsNumber: true })}
            error={!!errors.unitPrice}
            helperText={errors.unitPrice?.message}
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Cập nhật giao dịch thành công"
        key={vertical + horizontal}
      />
    </Box>
  );
}
