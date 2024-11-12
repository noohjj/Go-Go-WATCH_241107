import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetail } from "../../api";
import { styled } from "styled-components";
import { mainStyle } from "../../GlobalStyle";
import Loading from "../../components/Loading";
import { ORIGINAL_URL } from "../../constants/ImageUrl";
import Wrapper from "../../components/Wrapper";
import PageTitle from "../../components/PageTitle";

const Container = styled.section`
  padding: 150px ${mainStyle.pcPadding};
  display: flex;
  justify-content: space-between;
  @media screen and (max-width:1000px){
    padding:100px ${mainStyle.moPadding};
  }
  @media screen and (max-width:600px){
    padding:100px ${mainStyle.moPadding};
  }
`;

const Bg = styled.div`
  width: 45%;
  aspect-ratio: 3/5;
  background: lightgray;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  border-radius: 10px;
`;

const TitleWrap = styled.div`
  width: 50%;
  h3 {
    font-size: 70px;
    font-weight: 700;
    margin-bottom: 30px;
  }
  span {
    font-size: 18px;
    font-weight: 300;
  }
  ul {
    list-style: disc;
    margin: 15px 0 10px 15px;
    li {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }

  p {
    font-size: 18px;
    line-height: 30px;
    margin-top: 50px;
    opacity: 0.7;
    letter-spacing: 0;
  }
  @media screen and (max-width: 1000px) {
    h3 {
      font-size: 35px;
      margin-bottom: 20px;
    }
    li {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 600px) {
    h3 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    li {
      font-size: 12px;
    }
    p {
      font-size: 12px;
      line-height: 20px;
      margin-top: 20px;
      opacity: 0.7;
      letter-spacing: 0;
    }
  }
`;

const Review = styled.div`
  width: 100%;
  height: 300px;
  padding: ${mainStyle.moPadding};
  margin-top: 40px;
  background-color: black;
  border-radius: 20px;
  overflow-y: scroll;
  h4 {
    font-family: "Racing Sans One", sans-serif;
    font-size: 20px;
  }
  input {
    margin-top: 20px;
    width: 100%;
    height: 60px;
    padding: 20px;
    border-radius: 20px;
    background-color: #1d1d1d;
    font-size: 20px;
    color: white;
  }
  button {
    margin-top: 20px;
    height: 40px;
    background-color: #1d1d1d;
    color: white;
    border-radius: 20px;
  }
  @media screen and (max-width: 600px) {
    input {
      font-size: 15px;
      height: 30px;
    }
    button {
      height: 30px;
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState({});
  const [inputReview, setInputReview] = useState("");

  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const detailData = await MovieDetail(id);
        setData(detailData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const handleReviewSubmit = () => {
    if (inputReview.trim() === "") return;

    const updatedReviews = {
      ...reviews,
      [id]: [...(reviews[id] || []), inputReview],
    };

    setReviews(updatedReviews);
    setInputReview("");

    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <PageTitle title={data?.title} />
          {data && (
            <Wrapper>
              <Container>
                <Bg
                  style={{
                    background: `url(${ORIGINAL_URL}${data.poster_path}) no-repeat center / cover`,
                  }}
                />
                <TitleWrap>
                  <h3>{data?.title}</h3>
                  <span>{Math.round(data.vote_average)}점</span> •{" "}
                  <span>{data.runtime}분</span> •{" "}
                  <span>{data.release_date}</span>
                  <ul>
                    {data.genres.map((genre) => (
                      <li key={genre.id}>{genre.name}</li>
                    ))}
                  </ul>
                  <p>{data.overview.slice(0,200) + "..."}</p>
                </TitleWrap>
              </Container>
              <Review>
                <h4>Go-Go REVIEW</h4>
                <input
                  type="text"
                  placeholder="여기에 리뷰를 입력하세요"
                  value={inputReview}
                  onChange={(e) => setInputReview(e.target.value)}
                />
                <button onClick={handleReviewSubmit} style={{ width: "100%" }}>
                  리뷰 남기기
                </button>
                <ul style={{ marginTop: "20px" }}>
                  {(reviews[id] || []).map((review, index) => (
                    <li key={index} style={{ marginBottom: "5px" }}>
                      {review}
                    </li>
                  ))}
                </ul>
              </Review>
            </Wrapper>
          )}
        </>
      )}
    </>
  );
};

export default Detail;
