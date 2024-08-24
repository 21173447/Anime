import React, { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

// Actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";
const GET_EPISODES = "GET_EPISODES";

// Reducer
const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case GET_POPULAR_ANIME:
            return { ...state, popularAnime: action.payload, loading: false };
        case SEARCH:
            return { ...state, searchResults: action.payload, loading: false };
        case GET_UPCOMING_ANIME:
            return { ...state, upcomingAnime: action.payload, loading: false };
        case GET_AIRING_ANIME:
            return { ...state, airingAnime: action.payload, loading: false };
        case GET_PICTURES:
            return { ...state, pictures: action.payload, loading: false };
        case GET_EPISODES:
            return { ...state, episodes: action.payload, loading: false };
        default:
            return state;
    }
};

// Global Context Provider
export const GlobalContextProvider = ({ children }) => {
    // Initial state
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],
        airingAnime: [],
        pictures: [],
        episodes: [],
        isSearch: false,
        searchResults: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = React.useState('');

    // Handle change
    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            state.isSearch = false;
        }
    };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            searchAnime(search);
            state.isSearch = true;
        } else {
            state.isSearch = false;
            alert('Please enter a search term');
        }
    };

    // Filter function for PG content
    const filterPGContent = (animeList) => {
        return animeList.filter(anime => anime.rating && anime.rating.includes('PG'));
    };

    // Fetch popular anime
    const getPopularAnime = async () => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await response.json();
        dispatch({ type: GET_POPULAR_ANIME, payload: filterPGContent(data.data) });
    };

    // Fetch upcoming anime
    const getUpcomingAnime = async () => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const data = await response.json();
        dispatch({ type: GET_UPCOMING_ANIME, payload: filterPGContent(data.data) });
    };

    // Fetch airing anime
    const getAiringAnime = async () => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
        const data = await response.json();
        dispatch({ type: GET_AIRING_ANIME, payload: filterPGContent(data.data) });
    };

    // Fetch searched anime
    const searchAnime = async (anime) => {
        dispatch({ type: LOADING });
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await response.json();
        dispatch({ type: SEARCH, payload: filterPGContent(data.data) });
    };

    // Fetch anime pictures
    const getAnimePictures = async (id) => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/characters/${id}/pictures`);
        const data = await response.json();
        dispatch({ type: GET_PICTURES, payload: data.data });
    };

    // Fetch anime episodes
    const getAnimeEpisodes = async (id) => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/anime/${id}/episodes`);
        const data = await response.json();
        dispatch({ type: GET_EPISODES, payload: data.data });
    };

    // Initial render
    React.useEffect(() => {
        getPopularAnime();
    }, []);

    return (
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getPopularAnime,
            getUpcomingAnime,
            getAiringAnime,
            getAnimePictures,
            getAnimeEpisodes 
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
