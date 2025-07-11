import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import GeneralMediaSection from "../components/GeneralMediaSection";
import WatchedMediaSection from "../components/WatchedMediaSection";
import PopularMediaSection from "../components/PopularMediaSection";

function HomePage() {
  const [watchedMovies, setWatchedMovies] = useState([]);

  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [watchLaterMoviesPage, setWatchLaterMoviesPage] = useState(0);
  const [hasMoreWatchLaterMovies, setHasMoreWatchLaterMovies] = useState(true);

  const [popularMovies, setPopularMovies] = useState([]);

  const [personalizedMovies, setPersonalizedMovies] = useState([]);

  const [allMovies, setAllMovies] = useState([]);
  const [allMoviesPage, setAllMoviesPage] = useState(0);
  const [hasMoreAllMovies, setHasMoreAllMovies] = useState(true);

  const size = 30;

  const fetchWatchedMovies = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/media/history`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("미디어 로딩 에러");
      const body = await res.json();
      const list = body.data.content;
      setWatchedMovies(list);
    } catch (error) {
      console.error("시청 기록 로딩 에러:", error);
    }
  };

  const fetchWatchLaterMovies = async (pageNumber) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/media/later?page=${pageNumber}&size=${size}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("미디어 로딩 실패");
      const body = await res.json();
      const list = body.data.content;
      setWatchLaterMovies((prev) => [...prev, ...list]);
      setHasMoreWatchLaterMovies(list.length === size);
    } catch (error) {
      console.error("영화 리스트 로딩 에러:", error);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/media/popular`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("미디어 로딩 에러");
      const body = await res.json();
      const list = body.data;
      setPopularMovies(list);
    } catch (error) {
      console.error("시청 기록 로딩 에러:", error);
    }
  };

  const fetchPersonalizedMovies = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/media/personalization`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("미디어 로딩 에러");
      const body = await res.json();
      const list = body.data;
      setPersonalizedMovies(list);
    } catch (error) {
      console.error("시청 기록 로딩 에러:", error);
    }
  };

  const fetchAllMovies = async (pageNumber) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/media/filter?page=${pageNumber}&size=${size}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("미디어 로딩 실패");
      const body = await res.json();
      const list = body.data.content;
      setAllMovies((prev) => [...prev, ...list]);
      setHasMoreAllMovies(list.length === size);
    } catch (error) {
      console.error("영화 리스트 로딩 에러:", error);
    }
  };

  useEffect(() => {
    fetchWatchedMovies();
  }, []);
  
  useEffect(() => {
    fetchWatchLaterMovies(watchLaterMoviesPage);
  }, [watchLaterMoviesPage]);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    fetchPersonalizedMovies();
  }, []);

  useEffect(() => {
    fetchAllMovies(allMoviesPage);
  }, [allMoviesPage]);

  return (
    <Layout showSearchButton={true}>
      <WatchedMediaSection
        title="시청한 영상"
        movies={watchedMovies}
      />
      
      <GeneralMediaSection
        title= "찜한 영상"
        movies={watchLaterMovies}
        hasMore={hasMoreWatchLaterMovies}
        onLoadMore={() => setWatchLaterMoviesPage((p) => p + 1)}
      />

      <PopularMediaSection
        title="어제 인기있던 영상"
        movies={popularMovies}
      />

      <GeneralMediaSection
        title= "추천 맞춤 영상"
        movies={personalizedMovies}
        hasMore={false}
        onLoadMore={() => null}
      />

      <GeneralMediaSection
        title="모두 보기"
        movies={allMovies}
        hasMore={hasMoreAllMovies}
        onLoadMore={() => setAllMoviesPage((p) => p + 1)}
      />
    </Layout>
  );
}

export default HomePage;