import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const AnimeItem = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [showMore, setShowMore] = useState(false);

    // Destructure anime
    const {
        title, synopsis, trailer, duration, aired,
        season, images, rank, score, scored_by,
        popularity, status, rating, source
    } = anime;

    // Fetch characters
    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`);
        const data = await response.json();
        setCharacters(data.data);
    };

    // Fetch anime by ID
    const getAnime = async () => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();
        setAnime(data.data);
    };

    useEffect(() => {
        getAnime(id);
        getCharacters(id);
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto ">
            <h1 className="text-2xl mb-7">{title} {id}</h1>
            <div className="details space-y-4">
                <div className="detail flex flex-col sm:flex-row gap-6">
                    <div className="image flex-shrink-0">
                        <img src={images?.jpg.large_image_url} alt={title} className="w-64 h-auto object-cover rounded-md" />
                    </div>
                    <div className="anime-details space-y-2">
                        <p><span className="font-semibold">Aired:</span> <span>{aired?.string}</span></p>
                        <p><span className="font-semibold">Rating:</span> <span>{rating}</span></p>
                        <p><span className="font-semibold">Rank:</span> <span>{rank}</span></p>
                        <p><span className="font-semibold">Score:</span> <span>{score}</span></p>
                        <p><span className="font-semibold">Scored By:</span> <span>{scored_by}</span></p>
                        <p><span className="font-semibold">Popularity:</span> <span>{popularity}</span></p>
                        <p><span className="font-semibold">Status:</span> <span>{status}</span></p>
                        <p><span className="font-semibold">Source:</span> <span>{source}</span></p>
                        <p><span className="font-semibold">Season:</span> <span>{season}</span></p>
                        <p><span className="font-semibold">Duration:</span> <span>{duration}</span></p>
                    </div>
                </div>

                <p className="description">
                    {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                    <button 
                        className="ml-2 text-indigo-600 hover:text-indigo-800" 
                        onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Show Less' : 'Read More'}
                    </button>
                </p>

                <h3 className="text-lg font-semibold">Trailer</h3>
                <div className="trailer-con">
                    {trailer?.embed_url ? (
                        <iframe
                            src={trailer?.embed_url}
                            title="Trailer"
                            className="w-full h-64 md:h-96"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    ) : (
                        <h3 className="text-red-500">Trailer not available</h3>
                    )}
                </div>

                <h3 className="text-lg font-semibold">Characters</h3>
                <div className="characters grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {characters?.map((character, index) => {
                        const { role } = character;
                        const { images, name, mal_id } = character.character;
                        return (
                            <Link to={`/character/${mal_id}`} key={index} className="character text-center">
                                <img src={images?.jpg.image_url} alt="" className="w-32 h-32 object-cover rounded-md mx-auto" />
                                <h4 className="mt-2 font-medium">{name}</h4>
                                <p className="text-sm text-gray-600">{role}</p>
                            </Link>
                        );
                    })}
                </div>

                <div className="watch-episodes mt-6">
                    <Link to={`/anime/${id}/episodes`}>
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md">
                            Watch Episodes
                        </button>
                    </Link>
                </div>
                <div className="watch-episodes mt-2">
                    <Link to={`/`}>
                        <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md">
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AnimeItem;
