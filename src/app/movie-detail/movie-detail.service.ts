import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class MovieDetailService {

	constructor(private http: Http) { }

	getMovieDetail(movieId): Observable<any> {
		var searchQuery = '?api_key=' + environment.API_KEY + '&language=en-US';
		return this.http.get(environment.BASE_URL+'movie/' + movieId + searchQuery).map(response => response.json());
	}

}
