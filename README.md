# 사이트 개요

1. 홈페이지에서 today's pick, 인기영화, 개봉예정 영화, 평점 높은 영화, 상영 중 영화 4개 카테고리 별로 바로 확인이 가능

2. 오른쪽 상단 검색 기능으로 과거 상영했던 영화 정보(제목, 런타임, 출연 배우, 줄거리, 장르)를 확인 가능하며, 리뷰 남기는 것 가능 - detail 페이지

3. 디테일 페이지에는 영화 설명 하단에 다른 추천영화 콘텐츠도 구성(슬라이드 형식)

4. 홈페이지(today's pick), 디테일 페이지 영화 설명 하단 부분 리뷰 기능 추가

5. home.js 메인 콘텐츠 아래에 todaypick.js 컴포넌트 추가해서 리뷰를 남길 수 있도록

6. localstorage 함수를 사용하여 남긴 리뷰가 남아있도록 구성
   ex:const storedReviews = localStorage.getItem("reviews");

7. 디테일 페이지에도 리뷰 남기기 가능 

- [x] Router 설정
- [x] 각 폴더, 파일 등 구성
- [x] api 설정
- [x] Loading, Header, Footer 글로벌 컴포넌트 구성
- [x] 웹 폰트 설정
- [x] 각 페이지 UI 작업 및 반응형
- [x] Helmet
- [x] Header Scroll Event
- [x] Deploy

# 설치항목

- [x] npm i react-router-dom
- [x] npm i styled-components
- [x] npm i styled-reset
- [x] swiper
- [x] font-awesome
- [x] npm i react-hook-form
- [x] helmet-async
- [x] react icons
