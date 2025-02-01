import { TableRowWrapper } from "./styles";

export default function TableRow({dataRow, isHeader = false }) {

  return (
    <>
      {
        isHeader ?
        <TableRowWrapper>
          {dataRow.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </TableRowWrapper>
        :  
        <TableRowWrapper>
          {
          dataRow.length === undefined ?
          Object.values(dataRow).map((item, index) => (
            <td key={index}>{item}</td>
          ))
          :
          dataRow.map((item, index) => (
            <td key={index}>{item}</td>
          ))
          }
        </TableRowWrapper>
      }
    </>
  )
}