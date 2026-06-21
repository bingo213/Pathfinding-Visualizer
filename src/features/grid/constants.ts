import { CellType } from "./enums";

export const ROWS = 20;
export const COLS = 40;
export const COLOR = {
  [CellType.EMPTY]: "#ffffff",
  [CellType.WALL]: "#2C2C2A",
  [CellType.START]: "#1D9E75",
  [CellType.END]: "#E24B4A",
  [CellType.VISITED]: "#B5D4F4",
  [CellType.PATH]: "#EF9F27",
};
export const CELL_SIZE = 24;
