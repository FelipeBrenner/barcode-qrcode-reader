import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import QrReader from "react-qr-reader";
import Loading from "./Loading";

const PREFIX = "QRCodeScanner";

const classes = {
  qrreader: `${PREFIX}-qrreader`,
  loading: `${PREFIX}-loading`,
};

const Root = styled("div")({
  [`& .${classes.qrreader}`]: {
    "& section > div": {
      "box-shadow": "white 0px 0px 0px 2px inset !important",
    },
  },
  [`& .${classes.loading}`]: {
    marginBottom: "32px",
  },
});

export function QRCodeScanner({ setOpen, setCode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleScan = (data) => {
    if (data) {
      setCode(data);
      setOpen(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Root sx={{ marginBottom: 1 }}>
      {loading ? (
        <Loading className={classes.loading} />
      ) : (
        <QrReader
          className={classes.qrreader}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      )}
    </Root>
  );
}

QRCodeScanner.propTypes = {
  setOpen: PropTypes.func.isRequired,
  setCode: PropTypes.func.isRequired,
};
