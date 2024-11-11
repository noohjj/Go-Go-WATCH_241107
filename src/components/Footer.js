import { styled } from "styled-components";

const Container = styled.footer`
  width: 100%;
  height: 200px;
  background-color: black;
  font-size: 20px;
  text-align: center;
  line-height: 200px;
  margin-top: 150px;
`;

const Footer = () => {
  return <Container>@2024 NOOHJJ. All right resolve</Container>;
};

export default Footer;
