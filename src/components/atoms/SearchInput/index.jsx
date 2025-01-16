import { SearchIcon } from "../../../icons/Icons";

export default function SearchInput({value, onChange}) {
  return (
    <div>
      <SearchIcon size={20} color="black"/>
      <input type="text" placeholder="Buscar" value={value} onChange={onChange}/>
    </div>
  )
}