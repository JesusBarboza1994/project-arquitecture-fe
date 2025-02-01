import { Wrapper } from "./styles";

export default function PaginationButton({ text = "...", onClick, isSelected = false }) {
  return <Wrapper onClick={onClick} isSelected={isSelected}>{text}</Wrapper>;
}
