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
            <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
                <source src={vid} type="video/mp4" />
            </video>
            <div className="relative z-10 p-80 text-black">
                <h1 className="text-4xl font-bold mb-4">
                    {rendered.charAt(0).toUpperCase() + rendered.slice(1)} Anime
                </h1>
                <nav className="mb-4">
                    <a href="#" onClick={handleNavigation('popular', getPopularAnime)} className="mr-4">Popular</a>
                    <a href="#" onClick={handleNavigation('airing', getAiringAnime)} className="mr-4">Airing</a>
                    <a href="#" onClick={handleNavigation('upcoming', getUpcomingAnime)}>Upcoming</a>
                </nav>
                <form onSubmit={handleSubmit} className="flex space-x-2 ">
                    <input 
                        type="text" 
                        placeholder="Search Anime" 
                        value={search} 
                        onChange={handleChange} 
                        className="p-2 rounded w-[100%]"
                    />
                    <button type="submit" className="p-5  bg-blue-500 text-white rounded">Search</button>
                </form>
            </div>
        </header>
    );
};

export default Header;