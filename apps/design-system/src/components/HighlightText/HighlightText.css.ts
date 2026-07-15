import { style } from "@vanilla-extract/css";
import { vars } from "@dc/theme/contract.css";

export const highlight = style({
  backgroundColor: vars.color.primary,
  color: vars.color.textInverse,
  borderRadius: vars.radius.sm,
  padding: "0 2px",
});
