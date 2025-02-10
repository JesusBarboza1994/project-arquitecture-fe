import { useState } from "react";
import { TableRowWrapper } from "./styles";

export default function TableRow({
  dataRow,
  isHeader = false,
  onSelect,
  selected,
  onQuantityChange,
}) {

  return (
    <>
      {isHeader ? (
        <TableRowWrapper>
          <th>
            <input type="checkbox" disabled />
          </th>
          {dataRow.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </TableRowWrapper>
      ) : (
        <TableRowWrapper>
          {dataRow.stock_actual > 0 ? (
            <td>
              <input
                type="checkbox"
                checked={selected}
                onChange={(e) =>
                  onSelect(dataRow.id_producto, e.target.checked)
                }
              />
            </td>
          ) : (
            <td></td>
          )}
          {dataRow.length === undefined
            ? Object.values(dataRow).map((item, index) => (
                <td key={index}>{item}</td>
              ))
            : dataRow.map((item, index) => <td key={index}>{item}</td>)}
          <td>
            {selected && (
              <input
                type="number"
                min="1"
                max={dataRow.stock_actual}
                defaultValue="1"
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value <= dataRow.stock_actual) {
                    onQuantityChange(dataRow.id_producto, value);
                  } else {
                    e.target.value = dataRow.stock_actual;
                    onQuantityChange(dataRow.id_producto, dataRow.stock_actual);
                  }
                }}
                style={{ width: "60px" }}
              />
            )}
          </td>
        </TableRowWrapper>
      )}
    </>
  );
}
