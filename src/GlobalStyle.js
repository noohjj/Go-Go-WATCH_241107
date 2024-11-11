import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const mainStyle = {
  pcPadding: "10%",
  moPadding: "20px",
};

export const GlobalStyled = createGlobalStyle`
${reset}
*{
    box-sizing: border-box;
}

.racing-sans-one-regular {
  font-family: "Racing Sans One", sans-serif;
  font-weight: 400;
  font-style: normal;
}

body{
    font-family: "Noto Sans KR", sans-serif;
    letter-spacing: -1px;
    background-color: #1d1d1d;
    color: white;
}

img{
    width: 100%;
    display: block;
}

a{
    text-decoration: none;
}

`;
