import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, IconButton, SvgIcon, TextField } from "@mui/material";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { IoMdBarcode } from "react-icons/io";
import { BarcodeDialog } from "./BarcodeDialog";
import { QRCodeDialog } from "./QRCodeDialog";

const Root = styled("div")(() => ({
  [`& @global`]: {
    "*": {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
    },
    html: {
      height: "100%",
      width: "100%",
    },
    body: {
      height: "100%",
      width: "100%",
    },
    "#root": {
      height: "100%",
      width: "100%",
    },
  },
}));

export function Home() {
  const [code, setCode] = useState("");
  const [openBarcodeReader, setOpenBarcodeReader] = useState(false);
  const [openQrCodeReader, setOpenQrCodeReader] = useState(false);

  const handleOpenBarcodeReader = () => {
    setOpenBarcodeReader(true);
  };

  const handleOpenQrCodeReader = () => {
    setOpenQrCodeReader(true);
  };

  return (
    <Root>
      <Grid
        container
        spacing={2}
        textAlign="center"
        sx={{ position: "absolute", top: "calc(50% - 112px)" }}
      >
        <Grid item xs={6} textAlign="right">
          <IconButton onClick={handleOpenBarcodeReader}>
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
          <TextField
            value={code}
            label="Código escaneado"
            disabled
            sx={{ width: 320 }}
          />
        </Grid>
      </Grid>
      <BarcodeDialog
        open={openBarcodeReader}
        setOpen={setOpenBarcodeReader}
        setCode={setCode}
      />
      <QRCodeDialog
        open={openQrCodeReader}
        setOpen={setOpenQrCodeReader}
        setCode={setCode}
      />
    </Root>
  );
}
