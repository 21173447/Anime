import React from 'react';

const Footer = ({ setRendered }) => {
    return (
        <footer className='bg-green-700'>
            <nav className="flex justify-between items-center w-[90%] mx-auto py-8 text-2xl">
                <div className='font-bold'>
                    <span className='text-white'>Anime</span>
                    <span className='text-green-300'>Paradise</span>
                </div>
                <div className='justify-end'>
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                        <li>
                            <button
                                onClick={() => setRendered('popular')}
                                className="hover:text-green-600 text-white semi-bold text-lg"
                            >
                                Popular
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setRendered('upcoming')}
                                className="hover:text-green-600 text-white semi-bold text-lg"
                            >
                                Upcoming
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setRendered('airing')}
                                className="hover:text-green-600 text-white semi-bold text-lg"
                            >
                                Airing
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;
