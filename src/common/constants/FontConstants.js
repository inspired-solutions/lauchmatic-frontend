import React from "react";
import { ReactComponent as LeftAlignment } from "../../svgs/align_left.svg";
import { ReactComponent as CenterAlignment } from "../../svgs/align_center.svg";
import { ReactComponent as RightAlignment } from "../../svgs/align_right.svg";

export const FONTS_FAMILIES = [
  { label: "Arial", value: "Arial" },
  { label: "Monserrat", value: "Monserrat" },
  { label: "Poppins", value: "Poppins" },
  { label: "Raleway", value: "Raleway" },
  { label: "Roboto", value: "Roboto" },
  { label: "Ubuntu", value: "Ubuntu" }
];

export const FONT_STYLES = [
  { label: "Normal", value: 1 },
  { label: "Bold", value: 2 },
  { label: "Italic", value: 3 }
];

export const FONT_SIZES = [
  { label: "12", value: 12 },
  { label: "14", value: 14 },
  { label: "16", value: 16 },
  { label: "18", value: 18 },
  { label: "20", value: 20 },
  { label: "24", value: 24 },
  { label: "26", value: 26 },
  { label: "32", value: 32 },
  { label: "48", value: 48 },
  { label: "56", value: 56 },
  { label: "72", value: 72 }
];

export const TEXT_ALIGN = [
  { icon: <LeftAlignment />, label: "left", value: 1 },
  { icon: <RightAlignment />, label: "center", value: 2 },
  { icon: <CenterAlignment />, label: "right", value: 3 }
];
