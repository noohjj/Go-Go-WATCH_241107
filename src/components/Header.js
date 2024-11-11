import { Link } from "react-router-dom";
import styled from "styled-components";
import { mainStyle } from "../GlobalStyle";
import { useEffect, useRef } from "react";

const Container = styled.header`
  padding: 20px ${mainStyle.pcPadding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: black;
  @media screen and (max-width: 650px) {
    padding: 20px ${mainStyle.moPadding};
  }
  z-index: 10;
`;

const Logo = styled.h3`
  font-size: 26px;
  font-family: "Racing Sans One", sans-serif;
  font-weight: 400;
  font-style: normal;
  a {
    color: #f90556;
  }
`;

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  li {
    margin-right: 100px;
    font-size: 24px;
    font-weight: bold;
    @media screen and (max-width: 650px) {
      margin-left: 50px;
    }
    a {
      color: #fff;
    }
  }
`;

const LoginBox = styled.div`
  width: 200px;
  height: 40px;
  color: #fff;
  background-color: #f90556;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 30px;
`;

const Header = () => {
  const headerRef = useRef();

  const scrollHandler = () => {
    const pageY = window.scrollY;
    const current = headerRef.current;
    console.log(pageY);

    if (pageY >= 300) {
      current.style.position = "fixed";
      current.style.backgroundColor = "rgba(0,0,0,0.5)";
      current.style.backgroundFilter = "blur(10px)";
    } else {
      current.style.position = "absolute";
      current.style.backgroundColor = "transparent";
      current.style.backgroundFilter = "blur(0px)";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
  });

  return (
    <Container ref={headerRef}>
      <Logo>
        <Link to={"/"}>Go-Go WATCH</Link>
      </Logo>

      <Menu>
        <li>
          <Link to={"/search"}>검색</Link>
        </li>
        <li>
          <Link to={"/signup"}>회원가입</Link>
        </li>
        <Link to={"/login"}>
          <LoginBox>
            <h3>Go-Go Login</h3>
          </LoginBox>
        </Link>
      </Menu>
    </Container>
  );
};

export default Header;
