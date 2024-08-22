import React from 'react';
import { useGlobalContext } from '../context/global';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Popular = () => {
   
    const { popularAnime, searchResults, isSearch } = useGlobalContext();
    


   



    const renderAnimes = () => {
        const animeList = isSearch ? searchResults : popularAnime;
        return animeList.map(anime => (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="block">
                <img 
                    src={anime.images?.jpg?.large_image_url || 'default-image.jpg'} 
                    alt={anime.title || 'Anime Image'} 
                    className="w-[60%] h-full object-cover rounded-lg"
                />
            </Link>
        ));
    };

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-10 px-4">
                {renderAnimes()}
            </div>
        </div>
    );
};

export default Popular;
