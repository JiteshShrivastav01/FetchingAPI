import React, { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  
  // function fetchMoviesHandle(){
  //     fetch('https://swapi.dev/api/films/')
  //     .then((response)=>{
  //       return response.json()
  //     })
  //     .then((data)=>{
  //       const transformMoviesFormat= data.results.map((movie)=>{
  //         return {
  //           id          : movie.episode_ID,
  //           title       : movie.title,
  //           openingText : movie.opening_crawl ,
  //           releaseDate : movie.release_date
  //         }
  //       })
  //       setMovies(transformMoviesFormat)
  //     })
  //   }

  async function fetchMoviesHandler() {
    try {
      setIsLoading(true)
      const response = await fetch('https://swapi.dev/api/films/');
      const data = await response.json();
  
      const transformMoviesFormat = data.results.map((movie) => {
        return {
          id: movie.episode_ID,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date
        };
      });
      setMovies(transformMoviesFormat);
      setIsLoading(false)

    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading ... </p>}
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && <p>No Movies Found</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
