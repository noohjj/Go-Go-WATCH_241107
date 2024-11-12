import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Wrapper from "../../components/Wrapper";
import { searchMovie } from "../../api";
import { useState } from "react";
import { NO_IMG, W500_URL } from "../../constants/ImageUrl";
import { mainStyle } from "../../GlobalStyle";
import PageTitle from "../../components/PageTitle";

const Form = styled.form`
  input {
    all: unset;
    width: 100%;
    height: 50px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-sizing: border-box;
    padding: 0 20px;
    &::placeholder {
      font-size: 18px;
    }
  }
`;

const Text = styled.div`
  padding: 300px ${mainStyle.pcPadding};
  font-size: 50px;
  font-weight: 500;
  text-align: center;
  @media screen and (max-width:1000px){
    font-size: 30px;
    padding: 150px ${mainStyle.moPadding};
  }
`;

const ConWrap = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 50px;
  column-gap: 30px;
  @media screen and (max-width:600px){
    margin-top:50px;
    display:grid;
    grid-template-columns:repeat(3, 0.5fr);
    row-gap: 20px;
    column-gap:10px;
  }
`;

const Con = styled.div`
  a {
    color: white;
  }
  h3 {
    margin-top: 10px;
    font-size: 18px;
  }
  height: 415px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width:600px){
    img{
    width:100%;
    height:50%;
  }
`;

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [term, setTerm] = useState();

  const onSearch = async (data) => {
    const { search: keyword } = data;

    try {
      const { results } = await searchMovie(keyword);
      setTerm(results);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(term);

  return (
    <Wrapper>
      <PageTitle title = "검색"/>
      <Form onSubmit={handleSubmit(onSearch)}>
        <input
          {...register("search", {
            required: "영화 제목은 필수 입니다.",
          })}
          type="text"
          placeholder="영화 제목"
        />
      </Form>

      {!term && <Text>검색어를 입력해주세요!</Text>}

      {term && (
        <ConWrap>
          {term.map((data) => (
            <Con key={data.id}>
              <Link to={`/detail/${data.id}`}>
                <img
                  src={data.poster_path ? W500_URL + data.poster_path : NO_IMG}
                  alt={data.title}
                />
                <h3>{data.title}</h3>
              </Link>
            </Con>
          ))}
        </ConWrap>
      )}
    </Wrapper>
  );
};

export default Search;
