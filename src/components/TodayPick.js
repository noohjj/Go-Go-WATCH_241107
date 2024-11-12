import { useEffect, useState } from "react";
import { popular } from "../api";
import { W500_URL } from "../constants/ImageUrl";
import { styled } from "styled-components";
import { mainStyle } from "../GlobalStyle";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin-top: 150px;
  color: "white";
  padding: 30px ${mainStyle.pcPadding};
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 30px;
  }
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    padding: 20px ${mainStyle.moPadding};
  }
`;

const AllWrap = styled.div`
  h2 {
    font-size: 30px;
    font-family: "Racing Sans One", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
`;

const Wrap = styled.div`
  display: flex;
  margin-top: 20px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Image = styled.div`
  width: 50%;
  height: 50%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  @media screen and (max-width: 1000px) {
    width: 80%;
    height: 80%;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
`;

const Info = styled.div`
  margin-left: 40px;
  h3 {
    font-size: 40px;
    font-weight: bold;
  }

  p {
    font-size: 20px;
    margin-top: 30px;
    line-height: 30px;
  }
  height: 100%;
  @media screen and (max-width: 1000px) {
    p {
      font-size: 15px;
      margin-top: 10px;
      line-height: 20px;
    }
  }
  @media screen and (max-width: 1000px) {
    h3 {
      margin-left: 0;
      font-size: 20px;
    }
  }

  @media screen and (max-width: 600px) {
    margin-left: 0;
    margin-top: 30px;
    h3 {
      font-size: 15px;
    }
  }
`;

const Review = styled.div`
  width: 100%;
  height: 300px;
  padding: ${mainStyle.moPadding};
  margin-top: 40px;
  background-color: #1d1d1d;
  border-radius: 20px;
  overflow-y: scroll;
  h4 {
    font-size: 30px;
    font-family: "Racing Sans One", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  input {
    margin-top: 20px;
    width: 100%;
    height: 60px;
    padding: 20px;
    border-radius: 20px;
    background-color: black;
    font-size: 20px;
    color: white;
  }
  button {
    margin-top: 20px;
    height: 40px;
    background-color: black;
    color: white;
    border-radius: 20px;
  }
`;

const TodayPick = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [reviews, setReviews] = useState({});
  const [inputReview, setInputReview] = useState("");

  useEffect(() => {
    popular().then((data) => {
      if (data && data.results) {
        setMovies(data.results);
      }
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        movies.length ? (prevIndex + 1) % movies.length : 0
      );
    }, 15000);

    return () => clearInterval(intervalId);
  }, [movies]);

  useEffect(() => {
    const storedReviews = {};
    movies.forEach((movie) => {
      const movieReviews = localStorage.getItem(`reviews_${movie.id}`);
      if (movieReviews) {
        storedReviews[movie.id] = movieReviews.split("\n");
      }
    });
    setReviews(storedReviews);
  }, [movies]);

  const currentMovie = movies[currentMovieIndex];

  const handleReviewSubmit = () => {
    if (inputReview.trim() === "") return;

    const updatedReviews = {
      ...reviews,
      [currentMovie.id]: [...(reviews[currentMovie.id] || []), inputReview],
    };

    setReviews(updatedReviews);
    setInputReview("");

    // 개별 리뷰 문자열을 "\n"으로 구분하여 저장
    localStorage.setItem(
      `reviews_${currentMovie.id}`,
      updatedReviews[currentMovie.id].join("\n")
    );
  };

  return (
    <Container>
      <AllWrap>
        <h2>TODAY's Pick</h2>

        {currentMovie ? (
          <Wrap>
            <Image>
              <Link to={`/detail/${currentMovie.id}`}>
                <img
                  src={`${W500_URL}${currentMovie.poster_path}`} // W500_URL 사용
                  alt={currentMovie.title}
                />
              </Link>
            </Image>

            <Info>
              <h3>{currentMovie.title}</h3>

              <p>개봉일: {currentMovie.release_date}</p>
              <p>평점: {currentMovie.vote_average}점</p>
              <p>줄거리: {currentMovie.overview.slice(0, 100) + "..."}</p>
            </Info>
          </Wrap>
        ) : (
          <p>영화 정보를 불러오는 중입니다...</p>
        )}

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
            {(reviews[currentMovie?.id] || []).map((review, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                {review}
              </li>
            ))}
          </ul>
        </Review>
      </AllWrap>
    </Container>
  );
};

export default TodayPick;
