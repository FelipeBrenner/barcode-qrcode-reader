import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  IconButton,
  SvgIcon,
  TextField,
} from "@mui/material";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { IoMdBarcode } from "react-icons/io";

export function Home() {
  const [code, setCode] = useState("");
  const [openBarcodeReader, setOpenBarcodeReader] = useState(false);
  const [openQrCodeReader, setOpenQrCodeReader] = useState(false);

  const handleBarcodeReader = () => {
    setOpenBarcodeReader(true);
  };

  const handleOpenQrCodeReader = () => {
    setOpenQrCodeReader(true);
  };

  return (
    <Grid
      container
      spacing={2}
      textAlign="center"
      sx={{ position: "absolute", top: "calc(50% - 112px)" }}
    >
      <Grid item xs={6} textAlign="right">
        <IconButton onClick={handleBarcodeReader}>
          <SvgIcon>
            <IoMdBarcode />
          </SvgIcon>
        </IconButton>
      </Grid>
      <Grid item xs={6} textAlign="left">
        <IconButton onClick={handleOpenQrCodeReader}>
          <SvgIcon>
            <MdOutlineQrCodeScanner />
          </SvgIcon>
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <TextField value={code} label="Código escaneado" disabled />
      </Grid>
    </Grid>
  );
}
