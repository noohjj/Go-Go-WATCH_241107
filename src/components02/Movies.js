import styled from "styled-components";
import { mainStyle } from "../GlobalStyle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { W500_URL } from "../constants/ImageUrl";

const Container = styled.section`
  width: 100%;
  padding: 0 ${mainStyle.pcPadding};
  @media screen and (min-width: 450px) {
    padding: 0 ${mainStyle.pcPadding};
  }
`;

const Title = styled.div`
  margin: 50px 0 30px 0;
  font-size: 22px;
  font-weight: 400;
`;

const Con = styled.div`
  img {
    border-radius: 20px;
  }
`;

const params = {
  spaceBetween: 10,
  slidesPerView: 3.3,
  breakpoints: {
    1024: {
      spaceBetween: 20,
      slidesPerView: 5.5,
    },
    640: {
      spaceBetween: 15,
      slidesPerView: 4.5,
    },
    320: {
      spaceBetween: 10,
      slidesPerView: 3.3,
    },
  },
};

const Movies = ({ data, title }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Swiper {...params}>
        {data.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Con>
              <Link to={`/detail/${movie.id}`}>
                <img src={W500_URL + movie.poster_path} alt={movie.Title} />
              </Link>
            </Con>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
