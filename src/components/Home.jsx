import React, { useState } from "react";
import { Grid, IconButton, SvgIcon, TextField } from "@mui/material";
// import QrCodeIcon from "@mui/icons-material/QrCode";
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
    <Grid container>
      <Grid item>
        <IconButton onClick={handleBarcodeReader}>
          <SvgIcon>
            <MdOutlineQrCodeScanner />
          </SvgIcon>
        </IconButton>
        <IconButton onClick={handleOpenQrCodeReader}>
          <SvgIcon>
            <IoMdBarcode />
          </SvgIcon>
        </IconButton>
      </Grid>
      <Grid item>
        <TextField value={code} label="Código escaneado" disabled />
      </Grid>
    </Grid>
  );
}
