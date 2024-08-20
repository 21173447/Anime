import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AnimeItem = () => {
    const { id } = useParams();
    console.log(id);

    const [anime, setAnime] = React.useState({});
    const [characters, setCharacters] = React.useState([]);
    const [showMore, setShowMore] = React.useState(false);

    // Destructure anime
    const {
        title, synopsis,
        trailer, duration, aired,
        season, images, rank,
        score, scored_by, popularity,
        status, rating, source
    } = anime;

//get characters

    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        const data = await response.json()
        setCharacters(data.data)
        console.log(data.data)
    }

    // Getting anime by id
    const getAnime = async () => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const data = await response.json();
        setAnime(data.data);
        console.log(data.data);
    };

    useEffect(() => {
        getAnime(id);
        getCharacters(id)
    }, []);

    return (
        <div>
            <h1>Anime Item Details</h1>
            <h1>{title} {id}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.jpg.large_image_url} alt={title} />
                    </div>
                    <div className="anime-details">
                        <p><span>Aired:</span><span>{aired?.string}</span></p>
                        <p><span>Rating:</span><span>{rating}</span></p>
                        <p><span>Rank:</span><span>{rank}</span></p>
                        <p><span>Score:</span><span>{score}</span></p>
                        <p><span>Scored By:</span><span>{scored_by}</span></p>
                        <p><span>Popularity:</span><span>{popularity}</span></p>
                        <p><span>Status:</span><span>{status}</span></p>
                        <p><span>Source:</span><span>{source}</span></p>
                        <p><span>Season:</span><span>{season}</span></p>
                        <p><span>Duration:</span><span>{duration}</span></p>
                    </div>
                    <p className="description">
                        {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                        <button onClick={() => setShowMore(!showMore)}>
                            {showMore ? 'Show Less' : 'Read More'}
                        </button>
                    </p>
                    <h3 className='title'>Trailer</h3>
                    <div className="trailer-con">
                        {trailer?.embed_url ? 
                            <iframe 
                                src={trailer?.embed_url} 
                                title="Inline Frame Example"
                                width="800"
                                height="450"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe> :
                            <h3>Trailer not available</h3>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeItem;
