import { styled } from "styled-components";

const NotFound = styled.div`
  padding: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  font-family: "Racing Sans One", sans-serif;
  color: #f90556;
  h3 {
    margin-top: 30px;
    font-size: 40px;
  }
`;

const PageNotFound = () => {
  return (
    <NotFound>
      404 Not Found
      <br />
      <h3>페이지 잘못 들어왔습니데이~ 왼쪽 위에 로고 눌러 홈으로 Go-Go</h3>
    </NotFound>
  );
};

export default PageNotFound;
