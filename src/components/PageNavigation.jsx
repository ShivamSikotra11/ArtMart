import { NavLink } from "react-router-dom";
import styled, { useTheme } from "styled-components";

const PageNavigation = ({ title }) => {
  // const theme = useTheme();
  // console.log(theme.colors.bg);
  return (
    <Wrapper>
      <NavLink to="/">Home</NavLink>/{title}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 6rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: flex-start;

  align-items: center;
  font-size: 3.2rem;
  padding-left: 2.2rem;
  margin-bottom: 0.5rem;
  a {
    font-size: 3.2rem;
  }
`;

export default PageNavigation;
