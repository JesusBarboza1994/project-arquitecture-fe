import PaginationButton from "../../atoms/PaginationButton";
import { Wrapper } from "./styles";

export default function Pagination({totalPages, currentPage, setCurrentPage}) {
  const getVisiblePages = (totalPages, currentPage) => {
    const maxPages = 10; // Máximo de páginas visibles
    const pages = [];
    const start = Math.max(1, currentPage - 3); // 3 páginas atrás
    const end = Math.min(totalPages, currentPage + 7); // 7 páginas adelante

    // Si el total de páginas es menor o igual al máximo, mostrar todas las páginas
    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Si hay más páginas por detrás
      if (start > 1) {
        pages.push(1); // Siempre incluir la primera página
        if (start > 2) pages.push('...'); // Agregar puntos suspensivos si no está cerca de la primera página
      }

      // Páginas visibles
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Si hay más páginas por delante
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...'); // Agregar puntos suspensivos si no está cerca de la última página
        pages.push(totalPages); // Siempre incluir la última página
      }
    }

    return pages;
  };

  const pages = getVisiblePages(totalPages, currentPage);
  console.log(pages)
  return (
    <Wrapper>
      {
       pages.map((item, index) => {
          if(item == currentPage) {
            return <PaginationButton key={index} text={item} onClick={() => setCurrentPage(item)} isSelected={true}/>
          }
        return <PaginationButton key={index} text={item} onClick={() => setCurrentPage(item)} isSelected={false}/>
        })
      }
    </Wrapper>
  )
}