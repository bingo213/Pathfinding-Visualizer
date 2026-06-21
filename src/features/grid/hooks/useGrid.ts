import { useCallback, useEffect, useState } from "react";
import { CellType } from "../enums";
import { COLS, ROWS } from "../constants";

const createGrid = (rows: number, cols: number): CellType[][] =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => CellType.EMPTY),
  );

const enum MouseMode {
  NONE,
  MOVE_START,
  MOVE_END,
  DRAW_WALL,
  ERASE_WALL,
}

const defaultStart = [0, 0];
const defaultEnd = [ROWS - 1, COLS - 1];
const useGrid = () => {
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [start, setStart] = useState<number[]>(defaultStart);
  const [end, setEnd] = useState<number[]>(defaultEnd);
  const [mouseMode, setMouseMode] = useState<MouseMode>(MouseMode.NONE);

  useEffect(() => {
    const newGrid = createGrid(ROWS, COLS);
    newGrid[defaultStart[0]][defaultStart[1]] = CellType.START;
    newGrid[defaultEnd[0]][defaultEnd[1]] = CellType.END;
    setGrid(newGrid);

    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const setCell = useCallback(
    (rowIndex: number, colIndex: number, type: CellType) => {
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        next[rowIndex][colIndex] = type;
        return next;
      });
    },
    [],
  );

  const onMouseDownCell = useCallback(
    (rowIndex: number, colIndex: number) => {
      const cellType = grid[rowIndex][colIndex];
      switch (cellType) {
        case CellType.START:
          setMouseMode(MouseMode.MOVE_START);
          break;
        case CellType.END:
          setMouseMode(MouseMode.MOVE_END);
          break;
        case CellType.WALL:
          setMouseMode(MouseMode.ERASE_WALL);
          break;
        default:
          setMouseMode(MouseMode.DRAW_WALL);
      }
    },
    [grid],
  );

  const onMouseEnterCell = useCallback(
    (rowIndex: number, colIndex: number) => {
      switch (mouseMode) {
        case MouseMode.MOVE_START:
          if (grid[rowIndex][colIndex] !== CellType.END) {
            setCell(rowIndex, colIndex, CellType.START);
            setCell(start[0], start[1], CellType.EMPTY);
            setStart([rowIndex, colIndex]);
          }
          break;
        case MouseMode.MOVE_END:
          if (grid[rowIndex][colIndex] !== CellType.START) {
            setCell(rowIndex, colIndex, CellType.END);
            setCell(end[0], end[1], CellType.EMPTY);
            setEnd([rowIndex, colIndex]);
          }
          break;
        case MouseMode.DRAW_WALL:
          if (
            grid[rowIndex][colIndex] !== CellType.START &&
            grid[rowIndex][colIndex] !== CellType.END
          ) {
            setCell(rowIndex, colIndex, CellType.WALL);
          }
          break;
        case MouseMode.ERASE_WALL:
          if (grid[rowIndex][colIndex] === CellType.WALL) {
            setCell(rowIndex, colIndex, CellType.EMPTY);
          }
          break;
      }
    },
    [mouseMode, grid, start, end],
  );

  const onMouseUp = useCallback(() => {
    setMouseMode(MouseMode.NONE);
  }, []);

  const resetGrid = useCallback(() => {
    const newGrid = createGrid(ROWS, COLS);
    newGrid[defaultStart[0]][defaultStart[1]] = CellType.START;
    newGrid[defaultEnd[0]][defaultEnd[1]] = CellType.END;
    setStart(defaultStart);
    setEnd(defaultEnd);
    setGrid(newGrid);
  }, []);

  return { grid, setGrid, resetGrid, onMouseDownCell, onMouseEnterCell };
};

export default useGrid;
