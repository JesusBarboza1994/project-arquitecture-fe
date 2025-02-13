import { useState } from "react";
import SearchInput from "../../components/atoms/SearchInput";
import Table from "../../components/molecules/Table";
import { Wrapper } from "./styles";
import { useEffect } from "react";
import { socketOff, socketOn } from "../../sockets/sockets";
import { useCallback } from "react";
import { getProducts } from "../../services/getProducts.service";
import Pagination from "../../components/molecules/Pagination";
import PurchaseSummary from "../../components/molecules/PurchaseSummary";
import { purchaseProducts } from "../../services/purchaseProducts.service";

const headers = [
  "SKU",
  "Descripción",
  "Stock",
  "Fecha actualización",
  "Adquirir",
];
export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Map());
  const [allProducts, setAllProducts] = useState([]);

  const fetchData = async ({ page, searchTerm }) => {
    try {
      const res = await getProducts({ page, search: searchTerm });
      setData(res.data);
      setPages(res.pages);
      setAllProducts((prev) => {
        const newProducts = res.data.filter(
          (p) => !prev.some((ep) => ep.id_producto === p.id_producto)
        );
        return [...prev, ...newProducts];
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData({ page: currentPage, searchTerm: search });
  }, [currentPage]);

  useEffect(() => {
    if (search) {
      const handler = setTimeout(() => {
        fetchData({ page: 1, searchTerm: search });
        setCurrentPage(1);
      }, 1000);

      return () => clearTimeout(handler);
    } else {
      fetchData({ page: currentPage, searchTerm: "" });
    }
  }, [search]);

  useEffect(() => {
    socketOn("stockUpdate", updateStock);
    return () => {
      socketOff("stockUpdate", updateStock);
    };
  }, []);

  const updateStock = useCallback((payload) => {
    console.log("payload", payload);
    setData((prev) => {
      return prev.map((item) => {
        if (item.id_producto === Number(payload.id)) {
          return {
            ...item,
            stock_actual: payload.stock,
            fecha_actualizacion: payload.fecha_actualizacion,
          };
        }
        return item;
      });
    });

    setAllProducts((prev) => {
      return prev.map((item) => {
        if (item.id_producto === Number(payload.id)) {
          return {
            ...item,
            stock_actual: payload.stock,
            fecha_actualizacion: payload.fecha_actualizacion,
          };
        }
        return item;
      });
    });
  }, []);

  const handleSelectItem = (id, isSelected) => {
    setSelectedItems((prev) => {
      const newMap = new Map(prev);
      if (isSelected) {
        newMap.set(id, 1);
      } else {
        newMap.delete(id);
      }
      return newMap;
    });
  };

  const handleQuantityChange = (id, quantity) => {
    setSelectedItems((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, quantity);
      return newMap;
    });
  };

  const handlePurchase = async () => {
    try {
      const response = await purchaseProducts(selectedItems);
      setData((prev) => {
        const ids = response.map((item) => item.id_producto);
        return prev.map((item) => {
          if (ids.includes(item.id_producto)) {
            const modifyValue = response.find(
              (r) => r.id_producto === item.id_producto
            );
            return {
              ...item,
              stock_actual: modifyValue.stock_actual,
              fecha_actualizacion: modifyValue.fecha_actualizacion,
            };
          }
          return item;
        });
      });
      setSelectedItems(new Map());
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      alert("Error al realizar la compra");
    }
  };

  return (
    <Wrapper>
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      <Table
        headers={headers}
        data={data}
        selectedItems={selectedItems}
        onSelectItem={handleSelectItem}
        onQuantityChange={handleQuantityChange}
      />
      {selectedItems.size > 0 && (
        <PurchaseSummary
          selectedItems={selectedItems}
          products={allProducts}
          onPurchase={handlePurchase}
          onSelect={handleSelectItem}
        />
      )}
      <Pagination
        totalPages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Wrapper>
  );
}
