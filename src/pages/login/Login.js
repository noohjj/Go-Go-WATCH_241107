import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import useScrollTop from "../../lib/UseScrollTop";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mainStyle } from "../../GlobalStyle";
import { Link } from "react-router-dom";
import slate from "../../img/slate.jpg";
import PageTitle from "../../components/PageTitle";

const Container = styled.div`
  height: 100vh;
  background: url(${slate}) no-repeat center / cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 0;
`;

const BackBG = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  position: absolute;
  top: 0;
  left: 0;
  z-index: -99;
`;

const Wrap = styled.section`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 650px;
  background-color: black;
  margin: 0 auto;
  margin-top: 10%;
  border-radius: 20px;
  padding: 0 ${mainStyle.moPadding};
  align-items: center;
  @media screen and (max-width: 600px) {
    width: 400px;
    height: 600px;
  }
`;

const Box = styled.div`
  margin-top: 40px;
  h3 {
    font-size: 30px;
    font-family: "Racing Sans One", sans-serif;
    font-weight: 500;
  }
`;
const Form = styled.form`
  margin-top: 30px;
  input {
    all: unset;
    width: 100%;
    height: 50px;
    background-color: rgba(68, 68, 68, 0.4);
    margin-bottom: 10px;
    border-radius: 3px;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 1;
    &::placeholder {
      font-size: 18px;
      font-weight: 600;
    }
  }
  button {
    all: unset;
    width: 100%;
    height: 60px;
    font-size: 18px;
    background-color: #f90556;
    text-align: center;
    margin-top: 30px;
    border-radius: 3px;
    cursor: pointer;
    margin-bottom: 10px;
  }
`;

const ErrorMessage = styled.div`
  color: #f90556;
  margin-top:10px;
  margin-bottom: 10px;
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

const SignGo = styled.div`
  margin-top: 30px;
  h4 {
    margin-top: 5px;
    font-size: 20px;
    color: #f90556;
  }
  p {
    margin-top: 20px;
  }
`;

const Login = () => {
  useScrollTop();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const navi = useNavigate();
  const goUsername = localStorage.getItem("username");
  const goPassword = localStorage.getItem("password");

  const [isLogin, setIsLogin] = useState();

  const loginHandler = ({ username, password }) => {
    if (goUsername === username && goPassword === password) {
      alert("로그인 되었습니다 Go-Go");
      navi("/");
      localStorage.setItem("login", "isLogin");
    } else {
      setIsLogin("아이디 비밀번호를 다시 확인해주세요");
    }
  };

  return (
    <Container>
      <PageTitle title="로그인"/>
      <BackBG />
      <Wrap>
        <Box>
          <h3>Go-Go 로그인</h3>
          <Form onSubmit={handleSubmit(loginHandler)}>
            <input
              {...register("username", {
                required: "아이디를 입력해주세요",
              })}
              type="text"
              placeholder="아이디"
            />
            <ErrorMessage>{errors?.username?.message}</ErrorMessage>

            <input
              {...register("password", {
                required: "비밀번호를 입력해주세요",
              })}
              type="password"
              placeholder="비밀번호"
            />
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>

            <button>로그인</button>
            <ErrorMessage style={{ textAlign: "center" }}>
              {isLogin}
            </ErrorMessage>
            <SignGo>
              Go-Go WATCH 회원이 아닌가요?{" "}
              <Link to={"/signup"}>
                <h4>회원가입</h4>
              </Link>
              <p>
                이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 로봇이
                아님을 확인합니다.
              </p>
            </SignGo>
          </Form>
        </Box>
      </Wrap>
    </Container>
  );
};

export default Login;
