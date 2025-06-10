// App.jsx
import { useState, useEffect } from 'react';
import filmsData from './data/films';




function App() {
  const [films, setFilms] = useState(filmsData);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchFilm, setSearchFilm] = useState('');
  const [newFilm, setNewFilm] = useState({ title: '', genre: '' });
  const [filteredFilm, setFilteredFilm] = useState([])
  
  

  const genres = [];

  //for each per mitigare la duplicazione dei generi
  films.forEach(film => {
    if (!genres.includes(film.genre)) {
      genres.push(film.genre);
    }
  });

  // filtro generico
  useEffect(() => {
    let filtered = films;

    if(selectedGenre !== ``){
      filtered = filtered.filter((curGenre) =>
      curGenre.genre.toLowerCase().includes(selectedGenre.trim().toLowerCase())
    );
    }


    if(searchFilm !==``){
      filtered = filtered.filter((curFilm) =>
      curFilm.title.toLowerCase().includes(searchFilm.trim().toLowerCase())
    );
    }

    setFilteredFilm(filtered);


  }, [selectedGenre, searchFilm, films])

  //unificati i due filtri qui sotto
  // const filteredFilms = films;
  // filtro sul film
  //  useEffect (() => {
  //   const filteredFilm = films.filter((curFilm) =>
  //     curFilm.title.toLowerCase().includes(searchFilm.trim().toLowerCase())
  //   );
  //   setFilteredFilm(filteredFilm);
  // }, [searchFilm]);


  // // filtro sul genere
  // useEffect (() => {
  //   const filteredGenre = films.filter((curGenre) =>
  //     curGenre.genre.toLowerCase().includes(selectedGenre.trim().toLowerCase())
  //   );
  //   setFilteredGenre(filteredGenre);
  // }, [selectedGenre]);





  //aggiunta di un nuovo film e genere
  const handleAddFilm = (e) => {
    e.preventDefault();
    if (newFilm.title.trim() === '' || newFilm.genre.trim() === '') return;
    setFilms(prev => [...prev, newFilm]);
    setNewFilm({ title: '', genre: '' });
  };

  return (
    <>
      <h1>Film Filter</h1>

      <label>
        Filtra per genere:
        <select 
        value={selectedGenre}         
        onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">Tutti</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
      </label>

     


      <input
        type="text"
        placeholder="Cerca per titolo..."
        value={searchFilm}
        onChange={(e) => setSearchFilm(e.target.value)}
      />

      <ul>
        {filteredFilm.map((film, index) => (
          <li key={index}>{film.title} - {film.genre}</li>

        ))}
      </ul>

      <h2>Aggiungi un nuovo film</h2>
      <form onSubmit={handleAddFilm}>
        <input
          type="text"
          placeholder="Titolo"
          value={newFilm.title}
          onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })} //qui e sotto eseguo uno spread operator sull'array new film poichè altrimenti react non modificherebbe l'array nell'istanza in cui mi serve
        />
        <input
          type="text"
          placeholder="Genere"
          value={newFilm.genre}
          onChange={(e) => setNewFilm({ ...newFilm, genre: e.target.value })} // vedi sopra
        />
        <button type="submit">Aggiungi</button>
      </form>



    </>
  );
}

export default App;
