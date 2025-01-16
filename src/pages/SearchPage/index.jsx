import { useState } from "react";
import SearchInput from "../../components/atoms/SearchInput";
import Table from "../../components/molecules/Table";
import { Wrapper } from "./styles";
import { useEffect } from "react";
import { socketOff, socketOn } from "../../sockets/sockets";
import { useCallback } from "react";

const fakeData = [
  ["123", "lapiz", 10, "UMB"],
  ["456", "lapicero", 8, "UMB"],
  ["789", "borrador", 23, "UMB"],
]
const headers = [ "SKU", "Descripción", "Stock", "UMB"]
export default function SearchPage() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])

  const updateStock = useCallback((payload) => {
    setData(prev =>{
      return prev.map(item => {
        if(item[0] === payload.id){
          return [item[0], item[1], payload.stock, item[3]]
        }
        return item
      })
    })
  }, [])

  useEffect(() => {
    socketOn('stockUpdate', updateStock)
    return () => {
      socketOff('stockUpdate', updateStock)
    }
  },[socketOn, updateStock])

  useEffect(() => {
    setTimeout(() => {
      setData(fakeData.filter(item => item[0].includes(search) || item[1].includes(search)
      ))
    }, 2000)
  }, [search])
  
  return (
    <Wrapper>
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)}/>
      <Table headers={headers} data={data}/>
    </Wrapper>
  )
}