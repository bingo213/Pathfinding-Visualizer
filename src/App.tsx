import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Grid } from "./features/grid/components/Grid";
import useGrid from "./features/grid/hooks/useGrid";
import { CellLegend } from "./features/grid/components/CellLegend";

function App() {
  const { grid, setGrid, onMouseDownCell, onMouseEnterCell, resetGrid } =
    useGrid();
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 12, display: "flex", gap: 8 }}></div>
      <button onClick={resetGrid}>Reset Grid</button>
      <Grid
        grid={grid}
        onMouseDown={onMouseDownCell}
        onMouseEnter={onMouseEnterCell}
      />
      <CellLegend />
    </div>
  );
}

export default App;
