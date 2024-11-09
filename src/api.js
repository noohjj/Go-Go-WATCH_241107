const fetch = require("node-fetch");

const baseUrl = "https://api.themoviedb.org/3/";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGQ5ZTc4M2U4ZmIxMjcyZWU2ZTBiMGZmMDQ1ZDg4OCIsIm5iZiI6MTczMDI2NjE3OS43MDk3NzM4LCJzdWIiOiI2NzIxYjQ1MDE4MGIwYTVhYjkwYzEzNzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.uZIHtO4SnJ_y64gSv1fQtc1BH23rSLiypzbKJFobkpg",
  },
};

const url = (urlName) => {
  return baseUrl + `${urlName}?language=ko-kr`;
};

export const nowPlaying = () =>
  fetch(url("movie/now_playing"), options).then((res) => res.json());

export const popular = () =>
  fetch(url("movie/popular"), options).then((res) => res.json());

export const topRated = () =>
  fetch(url("movie/top_rated"), options).then((res) => res.json());

export const upComing = () =>
  fetch(url("movie/upcoming"), options).then((res) => res.json());

export const MovieDetail = (id) =>
  fetch(url(`movie/${id}`), options).then((res) => res.json());

export const searchMovie = (keyword) => {
  const searchUrl =
    baseUrl + `search/movie?query=${keyword}&include_adult=true&language=ko-kr`;
  return fetch(searchUrl, options).then((res) => res.json());
};