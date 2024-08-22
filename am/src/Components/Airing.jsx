import React from 'react';
import { useGlobalContext } from '../context/global';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Airing = () => {
    const { airingAnime, searchResults, isSearch } = useGlobalContext();

    const renderAnimes = () => {
        const animeList = isSearch ? searchResults : airingAnime;
        return animeList.map(anime => (
            <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                <img src={anime.images?.jpg?.large_image_url || 'default-image.jpg'} alt={anime.title || 'Anime Image'} />
            </Link>
        ));
    };

    return (
        <AiringStyled>
            <div className="airing-anime">
                {renderAnimes()}
            </div>
        </AiringStyled>
    );
};

const AiringStyled = styled.div`
    display: flex;
    justify-content: center; /* Center the content horizontally */

    .airing-anime {
        margin-top: 2rem;
        padding: 2rem 5rem; /* Adjust padding for consistency */
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 2rem;
        background-color: #fff;
        border-top: 5px solid #e5e7eb;

        a {
            display: block; /* Ensure the link block covers the intended area */
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
    }
`;

export default Airing;
