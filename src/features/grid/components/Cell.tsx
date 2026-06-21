import { memo } from "react";
import { CELL_SIZE, COLOR } from "../constants";
import { CellType } from "../enums";

export const Cell = memo(
  ({
    type,
    onMouseDown,
    onMouseEnter,
  }: {
    type: CellType;
    onMouseDown: () => void;
    onMouseEnter: () => void;
  }) => {
    return (
      <div
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
          background: COLOR[type],
          border: "0.5px solid #e0e0e0",
        }}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
      />
    );
  },
);
