import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import Popular from './Popular';
import Upcoming from './Upcoming';
import Airing from './Airing';

const Homepage = () => {
    const { 
        handleSubmit, 
        search, 
        handleChange,
        getUpcomingAnime,
        getAiringAnime,
        getPopularAnime,
        popularAnime,
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
        <div>
            <header>
                <div className="logo">
                    <h1>{rendered.charAt(0).toUpperCase() + rendered.slice(1)} Anime</h1>
                </div>
                <div className="search-container">
                    <button onClick={() => {
                        setRendered('popular');
                        getPopularAnime();
                    }}>
                        Popular<i className="fas fa-fire"></i>
                    </button>

                    <form className="search-form" onSubmit={handleSubmit}>
                        <div className="input-control">
                            <input type="text" placeholder="Search Anime" value={search} onChange={handleChange} />
                            <button type="submit">Search</button>
                        </div>
                    </form>

                    <button onClick={() => {
                        setRendered('airing');
                        getAiringAnime();
                    }}>
                        Airing
                    </button>

                    <button onClick={() => {
                        setRendered('upcoming');
                        getUpcomingAnime();
                    }}>
                        Upcoming
                    </button>
                </div>
            </header>
            {renderContent()}
        </div>
    );
};

export default Homepage;
