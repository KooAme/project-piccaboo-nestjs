import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id); // +id 로도 number로 변경가능
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`); //NotFoundException : 예외처리
    }
    return movie;
  }

  remove(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.remove(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
