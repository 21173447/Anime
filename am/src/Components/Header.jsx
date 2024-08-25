
import React from 'react';
import img from '../images/7872292.jpg';

const Header = ({ setRendered, getPopularAnime, getAiringAnime, getUpcomingAnime, handleSubmit, search, handleChange, rendered, title, showNav = true }) => {
    const handleNavigation = (section, fetchFunction) => (e) => {
        e.preventDefault();
        setRendered(section);
        fetchFunction();
    };

    return (
        <header className="relative">
            <img src={img} alt="Background" className="absolute w-full h-full object-cover" />
            <div className="relative z-10 flex flex-col h-full p-20">
                <div className="absolute top-4 left-9 font-bold text-2xl">
                    <span className='text-white'>Anime</span>
                    <span className='text-green-300'>Paradise</span>
                </div>

                <h1 className="text-5xl font-bold text-center text-white mb-20">
                    {title && title.trim() !== "" ? `${title}` : rendered && rendered.trim() !== "" ? `${rendered.charAt(0).toUpperCase() + rendered.slice(1)} Anime !!🔥` : ""}
                </h1>

                {showNav && (
                    <div className='flex justify-center'>
                        <form onSubmit={handleSubmit} className="flex space-x-2 w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Search Anime"
                                value={search}
                                onChange={handleChange}
                                className="p-2 bg-green-200 w-[700%] text-black"
                            />
                            <button type="submit" className="p-2 bg-green-500 text-white">Search</button>
                        </form>
                        <div className='absolute top-4 right-7 semi-bold'>
                            <nav className="space-x-10">
                                <a href="#" onClick={handleNavigation('popular', getPopularAnime)} className="hover:text-green-600 text-white semi-bold text-lg">POPULAR</a>
                                <a href="#" onClick={handleNavigation('airing', getAiringAnime)} className="hover:text-green-600 text-white semi-bold text-lg">AIRING</a>
                                <a href="#" onClick={handleNavigation('upcoming', getUpcomingAnime)} className="hover:text-green-600 text-white semi-bold text-lg">UPCOMING</a>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
