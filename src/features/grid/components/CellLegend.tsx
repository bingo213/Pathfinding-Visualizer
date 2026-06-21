import { COLOR } from "../constants";
import { CellType } from "../enums";

export const CellLegend = () => {
  return (
    <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
      {[
        CellType.EMPTY,
        CellType.WALL,
        CellType.START,
        CellType.END,
        CellType.VISITED,
        CellType.PATH,
      ].map((cellType) => (
        <div
          key={cellType}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 8px",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              border: "1px solid #ccc",
              backgroundColor: COLOR[cellType],
            }}
          />
          <span>{cellType}</span>
        </div>
      ))}
    </div>
  );
};
