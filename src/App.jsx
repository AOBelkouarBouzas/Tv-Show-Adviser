import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import { BACKDROP_BASE_URL } from "./config";
import s from "./style.module.css";
import { TVShowDetails } from "./components/TVShowDetails/TVShowDetails";
import { Logo } from "./components/logo/Logo";
import logo from "./assets/images/logo.png";
import { TvShowList } from "./components/TvShowList/TvShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";

function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  async function fetchPopulars() {
    try {
      const populars = await TVShowAPI.fetchPopulars();
      if (populars.length > 0) {
        setCurrentTVShow(populars[0]);
      }
    } catch (error) {
      alert("Something went wrong. Please try again later. " + error.message);
    }
  }

  async function fetchRecommendations(tvShowId) {
    try {
      const recommendationList = await TVShowAPI.fetchRecommendations(tvShowId);
      if (recommendationList.length > 0) {
        setRecommendationList(recommendationList.slice(0, 10));
      }
    } catch (error) {
      alert("Something went wrong. Please try again later. " + error.message);
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]);

  async function searchTvShow(tvShowName) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
      if (searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
      }
    } catch (error) {
      alert("Something went wrong. Please try again later. " + error.message);
    }
  }

  return (
    <>
      <div
        className={s.main_container}
        style={{
          background: currentTVShow
            ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
            : "black",
        }}
      >
        <div className={s.header}>
          <div className="row">
            <div className="col-4">
              <Logo
                image={logo}
                title="WhatToWatch"
                subtitle="Find a show you may like"
              />
            </div>
            <div className="col-sm-12 col-md-4">
              <SearchBar onSubmit={searchTvShow} />
            </div>
          </div>
        </div>
        <div className={s.tv_show_detail}>
          {currentTVShow && <TVShowDetails tvShow={currentTVShow} />}
        </div>
        <div className={s.recommended_shows}>
          {recommendationList && recommendationList.length > 0 && (
            <TvShowList
              tvShowList={recommendationList}
              onClickItem={setCurrentTVShow}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
