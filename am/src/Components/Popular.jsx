import React, { useState } from 'react';
import { useGlobalContext } from '../context/global';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Popular = () => {
    const { popularAnime, searchResults, isSearch } = useGlobalContext();





    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const animeList = isSearch ? searchResults : popularAnime;
    const pageCount = Math.ceil(animeList.length / itemsPerPage);
    const currentAnime = animeList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);






    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const renderAnimes = () => {
        return currentAnime.map(anime => (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="block">
                <img
                    src={anime.images?.jpg?.large_image_url || 'default-image.jpg'}
                    alt={anime.title || 'Anime Image'}
                    className="w-[70%] h-full object-cover "
                />
            </Link>
        ));
    };

    return (
        <div className="flex flex-col items-center">
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 py-10 ">
                {renderAnimes()}
            </div>
            <div className=' bg-green-400 w-60 mb-2 rounded-full'>
                <ReactPaginate className='flex justify-center gap-5 text-white   '
                    previousLabel="PREV "
                    nextLabel="NEXT"
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName="pagination"
                    pageClassName="page-item"
                    activeClassName="active"

                />

            </div>

        </div>
    );
};

export default Popular;
