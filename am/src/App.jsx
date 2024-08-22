import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimeItem from './Components/AnimeItem';
import Homepage from './Components/Homepage';
import Gallery from './Components/Gallery';
import AnimeEpisodes from './Components/AnimeEpisodes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
        <Route path="/anime/:id/episodes" element={<AnimeEpisodes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
