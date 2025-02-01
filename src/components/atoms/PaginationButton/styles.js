import newStyled from "@emotion/styled";

export const Wrapper = newStyled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  padding: 0.125rem;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "gray" : "white")};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  font-size: 0.75rem;
  font-weight: bold;
  width: 2rem;
`;
