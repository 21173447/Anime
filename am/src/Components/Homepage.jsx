import React from 'react';
import { useGlobalContext } from '../context/global';
import Popular from './Popular';
import Upcoming from './Upcoming';
import Airing from './Airing';
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Spinner from '../context/Spinner';

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
        if (loading) return <div><Spinner/></div>;

        if (isSearch) {
            return (
                <div className="grid grid-cols-10 py-3" >
                    {searchResults.length > 0 ? (
                        searchResults.map((anime) => (
                            <div key={anime.mal_id} className="">
                                <Link to={`/anime/${anime.mal_id}`}>
                                    <div className="image-container">
                                        <img src={anime.images?.jpg?.large_image_url || 'default-image.jpg'} alt={anime.title} />
                                        <div className="title-overlay">
                                        
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
            <Footer setRendered={setRendered} />

        </div>
    );
};

export default Homepage;
