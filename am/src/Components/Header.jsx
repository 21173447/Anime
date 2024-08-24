import React from 'react';
import vid from '../video/7385122-uhd_3840_2160_30fps.mp4';

const Header = ({ setRendered, getPopularAnime, getAiringAnime, getUpcomingAnime, handleSubmit, search, handleChange, rendered }) => {
    const handleNavigation = (section, fetchFunction) => (e) => {
        e.preventDefault();
        setRendered(section);
        fetchFunction();
    };

    return (
        <header className="relative ">
            <video autoPlay muted loop className="absolute  w-full h-[100%] object-cover">
                <source src={vid} type="video/mp4" />
            </video>
            <div className="relative z-10 flex flex-col justify-center items-center h-full p-5 text-green-400">
                <h1 className="text-4xl font-bold mb-4 text-center">
                    {rendered.charAt(0).toUpperCase() + rendered.slice(1)} Anime
                </h1>
                <nav className="mb-4 flex space-x-4">
                    <a href="#" onClick={handleNavigation('popular', getPopularAnime)} className="text-white hover:bg-greb-400">Popular</a>
                    <a href="#" onClick={handleNavigation('airing', getAiringAnime)} className="text-white">Airing</a>
                    <a href="#" onClick={handleNavigation('upcoming', getUpcomingAnime)} className="text-white">Upcoming</a>
                </nav>
                <form onSubmit={handleSubmit} className="flex space-x-2 w-full max-w-md">
                    <input 
                        type="text" 
                        placeholder="Search Anime" 
                        value={search} 
                        onChange={handleChange} 
                        className="p-2 rounded w-full text-black"
                    />
                    <button type="submit" className="p-2 bg-green-500 text-white ">Search</button>
                </form>
            </div>
        </header>
    );
};

export default Header;
