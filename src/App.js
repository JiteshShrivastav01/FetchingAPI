import React, { useState , useEffect , useCallback} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState(null)
  const [retryCount, setRetryCount] = useState(0);
  const [retryTimer, setRetryTimer] = useState(null);
  
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

    const fetchMoviesHandler = useCallback(async () => {
      setIsLoading(true)
      setError(null)
      try {
      const response = await fetch('https://swapi.dev/api/film/');

      if(!response.ok){
        throw new Error('Something went wrong. Retrying...')
      }

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

    } catch (error) {
      setError(error.message);
      const retryDelay = 5000; 
      if (retryCount < 1) {
        const timer = setTimeout(fetchMoviesHandler, retryDelay);
        setRetryTimer(timer);
        setRetryCount(retryCount + 1);
      }
    }
    setIsLoading(false);
  }, [retryCount]);
  

  
  

  useEffect(()=>{
    fetchMoviesHandler()
  },[fetchMoviesHandler])
  
  const cancelRetryHandler = () => {
    clearTimeout(retryTimer);
    setRetryCount(0);
  };

  let content=<p>No Movies Found</p>
  if(isLoading){
    content=<p>Loading ...</p>
  }
  if(!isLoading && movies.length>0 && !error ){
    content=<MoviesList movies={movies}/>
  }
  if(!isLoading && error){
    content=<div>
              <p>{error}</p>
              <button onClick={cancelRetryHandler}>Cancel Retry</button>
            </div>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
