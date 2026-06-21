import { CELL_SIZE, COLS, ROWS } from "../constants";
import { CellType } from "../enums";
import { Cell } from "./Cell";

export const Grid = ({
  grid,
  onMouseDown,
  onMouseEnter,
}: {
  grid: CellType[][];
  onMouseDown: (rowIndex: number, colIndex: number) => void;
  onMouseEnter: (rowIndex: number, colIndex: number) => void;
}) => {
  return (
    <div
      style={{
        width: COLS * CELL_SIZE,
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`,
        border: "1px solid #ccc",
        borderRadius: 8,
        overflow: "hidden",
        userSelect: "none", // không bôi đen text khi drag
        WebkitUserSelect: "none",
      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((cellType, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            type={cellType}
            onMouseDown={() => onMouseDown(rowIndex, colIndex)}
            onMouseEnter={() => onMouseEnter(rowIndex, colIndex)}
          />
        )),
      )}
    </div>
  );
};
