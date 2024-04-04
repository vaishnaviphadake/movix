import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";
import PosterFallback from "../../../assets/no-poster.png";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

function HeroBanner() {

  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");


  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`);
    }
};

useEffect(() => {
  const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
//   const bgAlt = 'https://image.tmdb.org/t/p/original/4W11akSpZBp8O09cQFEO0lqmVJl.jpg';
//   if(bg)
//   {
//     setBackground(bgAlt);
//   }
  setBackground(bg);
}, [data]);

// useEffect(() => {
//   if (data?.results?.length) {
//     const randomIndex = Math.floor(Math.random() * data.results.length);
//     const backdropPath = data.results[randomIndex]?.backdrop_path;
//     if (backdropPath) {
//       const bg = url.backdrop + backdropPath;
//       setBackground(bg);
//     } else {
//       setBackground('https://image.tmdb.org/t/p/original/4W11akSpZBp8O09cQFEO0lqmVJl.jpg');
//     }
//         // <img class="" alt="" src="https://image.tmdb.org/t/p/original/4W11akSpZBp8O09cQFEO0lqmVJl.jpg"/>
//   } else {
//     setBackground('https://image.tmdb.org/t/p/original/4W11akSpZBp8O09cQFEO0lqmVJl.jpg');
//   }
// }, [data]);


  return (
    <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button>Search</button>
                    </div>
                    {/* <div>
                      <Img src={PosterFallback}></Img>
                    </div> */}
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;