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
  z-index: 10;

  @media screen and (max-width: 1200px) {
    padding: 20px 5%;
  }

  @media screen and (max-width: 600px) {
    padding: 20px ${mainStyle.moPadding};
    height: 50px;
  }
`;

const Logo = styled.h3`
  font-size: 30px;
  font-family: "Racing Sans One", sans-serif;
  font-weight: 400;
  font-style: normal;
  a {
    color: #f90556;
  }
  @media screen and (max-width: 1200px) {
    padding: 20px calc(${mainStyle.pcPadding} / 2);
    font-size: 20px;
  }

  @media screen and (max-width: 600px) {
    padding: 20px ${mainStyle.moPadding};
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

    a {
      color: #fff;
    }
    @media screen and (max-width: 1000px) {
      margin-right: ${mainStyle.moPadding};
    }
    @media screen and (max-width: 600px) {
      font-size: 12px;
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
  @media screen and (max-width: 1200px) {
    font-size: 15px;
    width: 100px;
    height: 30px;
    line-height: 30px;
  }
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
