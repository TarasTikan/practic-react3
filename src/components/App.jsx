import { Button } from './Button/Button';
import React from 'react';
import { Component } from 'react';
import { fetchMuvies } from 'MoviesApi/MuviesApi';
import { MovieList } from './MoviesList/MovieList';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    isMuviesShow: false,
    movies: [],
    page: 1,
    isLoading: false,
    currentPoster: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isMuviesShow, page } = this.state;
    if (
      (prevState.isMuviesShow !== isMuviesShow && isMuviesShow) ||
      (prevState.page !== page && isMuviesShow)
    )
      this.getMuvie();
    if (prevState.isMuviesShow !== isMuviesShow && !isMuviesShow) {
      this.setState({ movies: [], page: 1 });
    }
  }
  getMuvie = () => {
    this.setState({ isLoading: true });
    fetchMuvies(this.state.page)
      .then(({ data: { results } }) => {
        this.setState(prevState => {
          return { movies: [...prevState.movies, ...results] };
        });
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };
  toggleMuvies = () => {
    this.setState(({ isMuviesShow }) => ({ isMuviesShow: !isMuviesShow }));
  };
  onDeleteMovies = id => {
    this.setState(prevState => {
      return { movies: prevState.movies.filter(el => el.id !== id) };
    });
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  openModal = (data)=> {
    this.setState({currentPoster: data})
  }

  closeModal = () => {
    this.setState({currentPoster: null})
  }
  render() {
    const { isMuviesShow, movies, currentPoster } = this.state;
    return (
      <div>
        <Button
          clickHandler={this.toggleMuvies}
          text={isMuviesShow ? 'Hide muvies' : 'Show muvies'}
        />
        {movies.length !== 0 && (
          <>
            <MovieList movies={movies} onDelete={this.onDeleteMovies} openModal={this.openModal}/>
            <Button text="load more" clickHandler={this.loadMore} />
            {currentPoster && <Modal showModal={currentPoster} closeModal={this.closeModal}/>}
          </>
        )}
      </div>
    );
  }
}
