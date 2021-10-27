import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Quagga from "quagga";
import { Box } from "@mui/material";
import Loading from "../Loading";

const PREFIX = "BarcodeScanner";

const classes = {
  box: `${PREFIX}-box`,
  formControl: `${PREFIX}-formControl`,
  loading: `${PREFIX}-loading`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")({
  [`& .${classes.box}`]: {
    display: "block",
    position: "relative",
    alignItems: "left",
    overflow: "hidden",
    "& video, & canvas": {
      maxWidth: "100%",
      width: "100%",
    },
    "& canvas.drawing, & canvas.drawingBuffer": {
      position: "absolute",
      left: "0",
      top: "0",
    },
    marginBottom: 0,
  },
  [`& .${classes.formControl}`]: {
    width: 180,
    margin: "8px 0 16px",
  },
  [`& .${classes.loading}`]: {
    marginBottom: "32px",
  },
});

export function BarcodeScanner({ setCode, open, setOpen }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment",
          },
          target: document.querySelector("#barcode-scanner"),
        },
        locator: {
          halfSample: true,
          patchSize: "large", // x-small, small, medium, large, x-large
        },
        numOfWorkers: navigator.hardwareConcurrency,
        decoder: {
          readers: ["code_39_reader", "code_128_reader", "ean_reader"],
        },
        locate: true,
        multiple: false,
        frequency: 10,
      },
      (err) => {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
        return () => {
          Quagga.stop();
        };
      }
    );

    setTimeout(() => {
      setLoading(false);
    }, 500);

    Quagga.onProcessed((result) => {
      const drawingCtx = Quagga.canvas.ctx.overlay;
      const drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute("width")),
            Number(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter((box) => {
              return box !== result.box;
            })
            .forEach((box) => {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "#E0E0E0",
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2,
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected((result) => {
      setCode(result.codeResult.code);
      setOpen(false);
      Quagga.offDetected();
      Quagga.offProcessed();
      Quagga.stop();
    });
  }, [setCode, setOpen]);

  useEffect(() => {
    if (!open) {
      Quagga.offDetected();
      Quagga.offProcessed();
      Quagga.stop();
    }
  }, [open]);

  return (
    <Root>
      <Box
        id="barcode-scanner"
        mb={2}
        className={classes.box}
        visibility={loading ? "hidden" : "visible"}
        maxHeight={loading ? "0px" : "800px"}
      />
      {loading && <Loading className={classes.loading} />}
    </Root>
  );
}

BarcodeScanner.propTypes = {
  setCode: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
