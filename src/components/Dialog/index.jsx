import {
  Dialog as DialogMui,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  SvgIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IoIosClose } from "react-icons/io";
import { BarcodeScanner } from "./BarcodeScanner";
import { QRCodeScanner } from "./QRCodeScanner";

export function Dialog({
  openBarcodeReader,
  openQrCodeReader,
  handleClose,
  setCode,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DialogMui
      open={openBarcodeReader || openQrCodeReader}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle id="alert-dialog-title">
        <Grid
          container
          justify="space-between"
          direction="row"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item>
            Leitor de {openBarcodeReader ? "Código de Barras" : "QR Code"}
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <SvgIcon>
                <IoIosClose />
              </SvgIcon>
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent>
        {isMobile && window.location.protocol !== "https:" ? (
          <DialogContentText id="alert-dialog-description">
            Essa funcionalidade requer https
          </DialogContentText>
        ) : openBarcodeReader ? (
          <BarcodeScanner handleClose={handleClose} setCode={setCode} />
        ) : (
          <QRCodeScanner handleClose={handleClose} setCode={setCode} />
        )}
      </DialogContent>
    </DialogMui>
  );
}
