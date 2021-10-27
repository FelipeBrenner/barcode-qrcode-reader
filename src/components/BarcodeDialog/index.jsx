import PropTypes from "prop-types";
import {
  Dialog as DialogMui,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { IoIosClose } from "react-icons/io";
import { BarcodeScanner } from "./BarcodeScanner";

export function BarcodeDialog({ open, setOpen, setCode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogMui
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth={"md"}
    >
      <DialogTitle id="alert-dialog-title">
        <Grid
          container
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item>
            <Typography>Leitor de Código de Barras</Typography>
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
        ) : (
          <BarcodeScanner setCode={setCode} open={open} setOpen={setOpen} />
        )}
      </DialogContent>
    </DialogMui>
  );
}

BarcodeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setCode: PropTypes.func.isRequired,
};
