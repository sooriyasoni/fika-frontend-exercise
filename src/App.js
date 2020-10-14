
import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios"
class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    const moviesApi = " https://api.themoviedb.org/3/movie/now_playing?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US&page=1"

    const genresApi = "https://api.themoviedb.org/3/genre/movie/list?api_key=d432b933ecc6d5642d8d2befbc40c7ac&language=en-US"


    axios.all([moviesApi, genresApi]).then(axios.spread(async (...response) => {
      const movie = await axios.get(response[0]);
      const genre = await axios.get(response[1]);
      const movieList = movie.data.results;
      const genreList = genre.data.genres;

      const moviePath = []
      movieList.filter((key) => {
        const genres = genreList.filter(el => key.genre_ids.includes(el.id)).map(el => {
          return el.name
        })
        const returnObj = {
          Movie: key.poster_path,
          Genre: genres.toString()
        }
        moviePath.push(returnObj)
        return returnObj
      })
      this.setState({ data: moviePath });
    })).catch(errors => {
      console.log(errors)
    })

  }


  render() {
    return (
      <div>
        <table>
          <th>Movies</th>
          {this.state.data.map((el) => (
            <tr><img src={'https://image.tmdb.org/t/p/w500/' + el.Movie} width="100" alt="" height="150"></img>{el.Genre.toString()}</tr>
          ))}
        </table>
      </div>
    );
  }
}


export default App;

ReactDOM.render(<App />, document.getElementById("root"));
