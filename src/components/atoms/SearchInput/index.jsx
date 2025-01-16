import { SearchIcon } from "../../../icons/Icons";
import { StyledInput, Wrapper } from "./styles";

export default function SearchInput({value, onChange}) {
  return (
    <Wrapper>
      <SearchIcon size={20} color="black"/>
      <StyledInput type="text" placeholder="Buscar" value={value} onChange={onChange}/>
    </Wrapper>
  )
}