
import React from 'react';
import { useGlobalContext } from '../context/global';
import Popular from './Popular';
import Upcoming from './Upcoming';
import Airing from './Airing';
import Header from './Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Homepage = () => {
    const { 
        handleSubmit, 
        search, 
        handleChange,
        getUpcomingAnime,
        getAiringAnime,
        getPopularAnime,
        searchResults,
        isSearch,
        loading
    } = useGlobalContext();

    const [rendered, setRendered] = React.useState('popular');

    const renderContent = () => {
        if (loading) return <div>Loading...</div>;

        if (isSearch) {
            return (
                <div className="search-results">
                    {searchResults.length > 0 ? (
                        searchResults.map((anime) => (
                            <div key={anime.mal_id} className="anime-card">
                                <Link to={`/anime/${anime.mal_id}`}>
                                    <div className="image-container">
                                        <img src={anime.images?.jpg?.large_image_url || 'default-image.jpg'} alt={anime.title} />
                                        <div className="title-overlay">
                                            <p>{anime.title}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div>No results found</div>
                    )}
                </div>
            );
        }

        switch (rendered) {
            case 'popular':
                return <Popular />;
            case 'airing':
                return <Airing />;
            case 'upcoming':
                return <Upcoming />;
            default:
                return <Popular />;
        }
    };

    return (
        <HomepageStyled>
            <Header
                setRendered={setRendered}
                getPopularAnime={getPopularAnime}
                getAiringAnime={getAiringAnime}
                getUpcomingAnime={getUpcomingAnime}
                handleSubmit={handleSubmit}
                search={search}
                handleChange={handleChange}
                rendered={rendered}
            />
            {renderContent()}
        </HomepageStyled>
    );
};

const HomepageStyled = styled.div`
    /* Add any additional styles for the Homepage component here */
`;

export default Homepage;
