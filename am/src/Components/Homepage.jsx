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
        searchAnime,
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
        if (loading) {
            return <div>Loading...</div>;
        }

        if (isSearch && searchResults.length > 0) {
            return (
                <div className="search-results">
                    {searchResults.map((anime) => (
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
                    ))}
                </div>
            );
        }

        if (!isSearch && rendered === 'popular') {
            return (
                <div className="anime-grid">
                    {popularAnime.map((anime) => (
                        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                            <div className="image-container">
                                <img src={anime.images?.jpg?.large_image_url || 'default-image.jpg'} alt={anime.title} />
                                <div className="title-overlay">
                                    <p>{anime.title}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            );
        }

        switch (rendered) {
            case 'popular':
                return <Popular rendered={rendered} />;
            case 'airing':
                return <Airing rendered={rendered} />;
            case 'upcoming':
                return <Upcoming rendered={rendered} />;
            default:
                return <Popular rendered={rendered} />;
        }
    };

    return (
        <div>
            <header>
                <div className="logo">
                    <h1>
                        {rendered === 'popular' ? 'Popular Anime' : 
                        rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}
                    </h1>
                </div>
                <div className="search-container">
                    <div className="filter-btn popular-filter">
                        <button onClick={() => {
                            setRendered('popular');
                            getPopularAnime();
                        }}>Popular<i className="fas fa-fire"></i></button>
                    </div>

                    
                    <form className="search-form" onSubmit={handleSubmit}>
                        <div className="input-control">
                            <input type="text" placeholder="Search Anime" value={search} onChange={handleChange} />
                            <button type="submit">Search</button>
                        </div>
                        <div>
 

                        </div>
                    </form>
                    <div className="filter-btn airing-filter">
                        <button onClick={() => {
                            setRendered('airing');
                            getAiringAnime();
                        }}>Airing</button>
                    </div>
                    <div className="filter-btn upcoming-filter">
                        <button onClick={() => {
                            setRendered('upcoming');
                            getUpcomingAnime();
                        }}>Upcoming</button>
                    </div>
                </div>
            </header>
            {renderContent()}
        </div>
    );
};

export default Homepage;
