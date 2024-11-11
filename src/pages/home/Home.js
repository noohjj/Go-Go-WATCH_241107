import { useEffect, useState } from "react";
import { nowPlaying, popular, topRated, upComing } from "../../api";
import Movies from "../../components02/Movies";
import Banner from "../../components/Banner";

const Home = () => {
  const [nowData, setNowData] = useState();
  const [popData, setPopData] = useState();
  const [topData, setTopData] = useState();
  const [upData, setUpData] = useState();

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
        slidesPerView: 3.5,
      },
    },
  };

  useEffect(() => {
    (async () => {
      try {
        const { results: now } = await nowPlaying();
        const { results: pop } = await popular();
        const { results: top } = await topRated();
        const { results: up } = await upComing();

        setNowData(now);
        setPopData(pop);
        setTopData(top);
        setUpData(up);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {nowData && (
        <div>
          <Banner data={nowData} />
          <Movies data={nowData} title="현재 상영중" />
          <Movies data={popData} title="인기영화" />
          <Movies data={topData} title="랭킹 영화" />
          <Movies data={upData} title="개봉 예정 영화" />
        </div>
      )}
    </>
  );
};

export default Home;
