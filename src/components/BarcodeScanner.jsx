import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Quagga from "quagga";
import {
  Box,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
} from "@material-ui/core";
import Loading from "./Loading";
// import useSettings from 'src/hooks/useSettings';

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
  },
  [`& .${classes.formControl}`]: {
    width: 180,
    margin: "8px 0 16px",
  },
  [`& .${classes.loading}`]: {
    marginBottom: "32px",
  },
});

// const barcodeTypes = [
//   { value: 'code_128_reader', name: 'Code 128' },
//   { value: 'ean_reader', name: 'EAN' },
//   { value: 'ean_8_reader', name: 'EAN-8' },
//   { value: 'code_39_reader', name: 'Code 39' },
//   { value: 'code_39_vin_reader', name: 'Code 39 VIN' },
//   { value: 'codabar_reader', name: 'Codabar' },
//   { value: 'upc_reader', name: 'UPC' },
//   { value: 'upc_e_reader', name: 'UPC-e' },
//   { value: 'i2of5_reader', name: 'I2of5' },
//   { value: '2of5_reader', name: 'Standard 2 of 5' },
//   { value: 'code_93_reader', name: 'Code 93' },
// ];

export function BarcodeScanner({
  open,
  setOpen,
  setCode,
  stopBarcodeScanner,
  setStopBarcodeScanner,
}) {
  // const { settings, saveSettings } = useSettings();
  // const [barcodeType, setBarcodeType] = useState(
  //   settings.barcodeType || 'code_128_reader'
  // );
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
          // area: {
          //   // defines rectangle of the detection/localization area
          //   top: '10%', // top offset
          //   right: '10%', // right offset
          //   left: '10%', // left offset
          //   bottom: '10%', // bottom offset
          // },
        },
        locator: {
          halfSample: true,
          patchSize: "large", // x-small, small, medium, large, x-large
        },
        numOfWorkers: navigator.hardwareConcurrency,
        decoder: {
          readers: ["code_39_reader"], // [`${barcodeType}`],
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
  }, [setCode, setOpen /* , barcodeType */]);

  useEffect(() => {
    if (!open || stopBarcodeScanner) {
      Quagga.offDetected();
      Quagga.offProcessed();
      Quagga.stop();
      setStopBarcodeScanner(false);
    }
  }, [open, stopBarcodeScanner, setStopBarcodeScanner]);

  // const handleChange = value => {
  //   setLoading(true);
  //   Quagga.offDetected();
  //   Quagga.offProcessed();
  //   Quagga.stop();
  //   setBarcodeType(value);
  //   saveSettings({ ...settings, barcodeType: value });
  // };

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
      {/* <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Tipo de código de barras</InputLabel>
        <Select
          value={barcodeType}
          onChange={event => {
            handleChange(String(event.target.value));
          }}
          label="Tipo de código de barras"
        >
          {barcodeTypes.map(type => (
            <MenuItem key={type.value} value={type.value}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
    </Root>
  );
}

BarcodeScanner.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setCode: PropTypes.func.isRequired,
  stopBarcodeScanner: PropTypes.bool.isRequired,
  setStopBarcodeScanner: PropTypes.func.isRequired,
};
