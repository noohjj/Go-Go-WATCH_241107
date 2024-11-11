import { styled } from "styled-components";

const Container = styled.footer`
  width: 100%;
  height: 200px;
  margin-top: 150px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const Footer = () => {
  return <Container>@2024 NOOHJJ. All right resolve</Container>;
};

export default Footer;
