import React, { createContext, useContext, useReducer, useEffect } from 'react';

const GlobalContext = createContext();
const baseUrl = "https://api.jikan.moe/v4";

// Actions
const LOADING = "...Loading🕘";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";

// Reducer
const reducer = (state, action) => {
    switch(action.type) {
        case LOADING:
            return { ...state, loading: true };
        case GET_POPULAR_ANIME:
            return { ...state, popularAnime: action.payload, loading: false };
        // Handle other actions as needed
        default:
            return state;
    }
}

const initialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
};

// Context Provider Component
export const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getPopularAnime = async () => {
        // Fetching popular anime
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await response.json();
        dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
    };

    // Initial render
    useEffect(() => {
        getPopularAnime();
    }, []);

    return (
        <GlobalContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
