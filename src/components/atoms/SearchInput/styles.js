import newStyled from "@emotion/styled";

export const Wrapper = newStyled("div")`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
`;

export const StyledInput = newStyled("input")`
  border: none;
  outline: none;
`;