import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class MovieSearchService {

	public movieListWatcher: EventEmitter<any> = new EventEmitter();
	constructor(private http: Http) { }

	searchMovies(query, pageNo): Observable<any> {
		var searchQuery = '?api_key=' + environment.API_KEY + '&language=en-US&page=' + pageNo + '&query=' + query;
		return this.http.get(environment.BASE_URL+'search/movie' + searchQuery).map(response => response.json());
	}


	searchMovieNames(query, pageNo): void {
		this.movieListWatcher.emit({isLoading: true, data: null, query: query});
		this.searchMovies(query,pageNo).subscribe(
			(response: any) => {
				this.movieListWatcher.emit({isLoading: false, data: response, query: query});
			},
			(error: any) => {
			  	console.log("error while searching movie names ===> " , error );
			},
			() => {}
		);
	}

}
