import { styled } from "styled-components";
import { mainStyle } from "../GlobalStyle";

const Container = styled.div`
  padding: 100px ${mainStyle.pcPadding};
  @media screen and (max-width: 600px) {
    padding: 100px ${mainStyle.moPadding};
  }
`;

const Wrapper = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Wrapper;
