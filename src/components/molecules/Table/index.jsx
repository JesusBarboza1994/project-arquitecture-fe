import TableRow from "../../atoms/TableRow";
import { TableWrapper } from "./styles";

export default function Table({headers, data, selectedItems, onSelectItem, onQuantityChange}){
  if(headers.length === 0) return <p>No hay datos</p>
  return(
    <TableWrapper>
      <thead>
        <TableRow dataRow={ headers} isHeader={true}/>
      </thead>
      <tbody>
        {
          data.length === 0 ? 
          <tr>
            <td 
              colSpan={headers.length}
              style={{
                textAlign: "center", 
                border: "1px solid #ccc",
                padding: "8px"}}
            >
              No hay datos
            </td>
          </tr> 
          :
          data.map((item, index) => (
            <TableRow 
              key={index} 
              dataRow={item}
              selected={selectedItems.has(item.id_producto)}
              onSelect={onSelectItem}
              onQuantityChange={onQuantityChange}
            />
          ))
        }
      </tbody>
    </TableWrapper>
  )
}