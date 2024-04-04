import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Home from "./pages/home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SearchResult from "./pages/searchResult/SearchResult";
import Details from "./pages/details/details";
import Explore from "./pages/explore/explore";
import PageNotFound from "./pages/E_404/pageNotFound";


import { getApiConfiguration,getGenres } from "./store/homeSlice";
import { fetchDataFromApi} from "./utils/api";

function App() {
  const dispatch = useDispatch();

    // const { url } = useSelector((state) => state.home);
    // console.log(url);
    // console.log(url.page);

  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[]);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
        console.log(res);

        const url = {
            backdrop: res.images.secure_base_url + "original",
            poster: res.images.secure_base_url + "original",
            profile: res.images.secure_base_url + "original",
        };

        dispatch(getApiConfiguration(url));
    });
};

const genresCall = async () => {
  let promises = [];
  let endPoints = ["tv", "movie"];
  let allGenres = {};

  endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
  });

  const data = await Promise.all(promises);
  console.log(data);
  data.map(({ genres }) => {
    
      return genres.map((item) => (allGenres[item.id] = item));
  });

  console.log(allGenres);

  dispatch(getGenres(allGenres));
};



  return (
    <BrowserRouter>
     <Header/>
      <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />
      </Routes>
     <Footer/>
    </BrowserRouter>
    
  )
}

export default App;
