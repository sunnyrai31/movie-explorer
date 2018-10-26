import { Component, OnInit } from '@angular/core';
import { MovieSearchService } from '../../services/movie-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
	
	public movieNameQuery: String;

	constructor(private movieSearchService: MovieSearchService, private router: Router) {
	}

	ngOnInit() {
		this.movieNameQuery = "";
	}

	searchMovies(): void {
		if(this.movieNameQuery) {
			this.movieSearchService.searchMovieNames(this.movieNameQuery,1);
			this.router.navigate(['']);
		}
	}

}
