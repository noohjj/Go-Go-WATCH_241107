import { useEffect, useState } from "react";
import { popular } from "../api";
import { W500_URL } from "../constants/ImageUrl";
import { styled } from "styled-components";
import { mainStyle } from "../GlobalStyle";

const Container = styled.div`
  color: "white";
  padding: 0 ${mainStyle.pcPadding};
  width: 100%;
  height: 1000px;
  background-color: black;
  align-items: center;
  margin-top: 150px;
  h2 {
    font-size: 30px;
  }
`;

const AllWrap = styled.div`
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
`;

const Image = styled.div`
  img {
    width: "100%";
    border-radius: "10px";
  }
`;

const Info = styled.div`
  margin-left: 50px;
  h3 {
    font-size: 40px;
    font-weight: bold;
  }
`;

const Sub = styled.div`
  p {
    font-size: 25px;
    margin-top: 30px;
  }
  height: 100%;
`;

const Review = styled.div``;

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
    }, 60000);

    return () => clearInterval(intervalId);
  }, [movies]);

  const currentMovie = movies[currentMovieIndex];

  const handleReviewSubmit = () => {
    if (inputReview.trim() === "") return;

    setReviews((prevReviews) => ({
      ...prevReviews,
      [currentMovie.id]: [...(prevReviews[currentMovie.id] || []), inputReview],
    }));
    setInputReview("");
  };

  return (
    <Container>
      <AllWrap>
        <h2>TODAY's Pick</h2>
        {currentMovie ? (
          <Wrap>
            <Image>
              <img
                src={`${W500_URL}${currentMovie.poster_path}`} // W500_URL 사용
                alt={currentMovie.title}
                style={{}}
              />
            </Image>
            <Info>
              <h3>{currentMovie.title}</h3>
              <Sub>
                <p>개봉일: {currentMovie.release_date}</p>
                <p>평점: {currentMovie.vote_average}점</p>
                <p>줄거리: {currentMovie.overview}</p>
              </Sub>
            </Info>
          </Wrap>
        ) : (
          <p>영화 정보를 불러오는 중입니다...</p>
        )}

        <Review>
          <h4>리뷰</h4>
          <input
            type="text"
            placeholder="여기에 리뷰를 입력하세요"
            value={inputReview}
            onChange={(e) => setInputReview(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
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
