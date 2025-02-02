import { useState } from "react";
import SearchInput from "../../components/atoms/SearchInput";
import Table from "../../components/molecules/Table";
import { Wrapper } from "./styles";
import { useEffect } from "react";
import { socketOff, socketOn } from "../../sockets/sockets";
import { useCallback } from "react";
import { getProducts } from "../../services/getProducts.service";
import Pagination from "../../components/molecules/Pagination";

const headers = [ "SKU", "Descripción", "Stock", "Fecha actualización"]
export default function SearchPage() {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [pages, setPages] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const updateStock = useCallback((payload) => {
    console.log(payload)
    console.log(data)
    setData(prev =>{
      return prev.map(item => {
        if(item.id_producto == payload.id){
          return {
            ...item,
            stock_actual: payload.stock
          }
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
    const handlerSearch = setTimeout(() => {
      getProducts({page: currentPage, search}).then(res => {
        setData(res.data)
        setPages(res.pages)
      })
      setCurrentPage(1)

    }, 2000)

    return () => {
      clearTimeout(handlerSearch)
    }
  }, [search])

  useEffect(() => {
    getProducts({page: currentPage, search}).then(res => {
      setData(res.data)
      setPages(res.pages)
    })

  }, [currentPage])
  
  return (
    <Wrapper>
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)}/>
      <Table headers={headers} data={data}/>
      <Pagination totalPages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </Wrapper>
  )
}