import React from 'react';
import vid from '../video/15451-264243720_small.mp4';

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
            <div className="relative z-10 flex flex-col  h-full p-20">
                <h1 className="text-5xl font-bold  text-center  text-green-100 mb-40">
                    {rendered.charAt(0).toUpperCase() + rendered.slice(1)} Anime
                </h1>
                <div className='flex gap-80'>
              
                <form onSubmit={handleSubmit} className="flex   space-x-2 w-full max-w-md">
                    <input 
                        type="text" 
                        placeholder="Search Anime" 
                        value={search} 
                        onChange={handleChange} 
                        className="p-2 bg-green-200 w-full text-black"
                    />
                    <button type="submit" className="p-2 bg-green-500 text-white ">Search</button>
                </form>
                <nav className=" space-x-10 ">
                    <a href="#" onClick={handleNavigation('popular', getPopularAnime)} className="text-white hover:bg-greb-400">POPULAR</a>
                    <a href="#" onClick={handleNavigation('airing', getAiringAnime)} className="text-white">AIRING</a>
                    <a href="#" onClick={handleNavigation('upcoming', getUpcomingAnime)} className="text-white">UPCOMING</a>
                </nav>
                </div>
              
            </div>
        </header>
    );
};

export default Header;
