import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../context/global';

const AnimeEpisodes = () => {
  const { id } = useParams();
  const { getAnimeEpisodes, episodes, loading } = useGlobalContext();

  useEffect(() => {
    getAnimeEpisodes(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="episodes-container flex">
      <h2>Episodes List</h2>
      {episodes.length > 0 ? (
        <ul>
          {episodes.map((episode) => (
            <li key={episode.mal_id}>
              <p><strong>{episode.episode_id}:</strong> {episode.title}</p>
              <button className='bg-green-500'>

              <a href={episode.url} target="_blank" rel="">Watch Episode</a>
              </button>
             
            </li>
          ))}
        </ul>
      ) : (
        <p>No episodes available.</p>
      )}
    </div>
  );
};

export default AnimeEpisodes;
