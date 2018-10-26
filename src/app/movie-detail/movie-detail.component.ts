import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailService } from './movie-detail.service'

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  providers: [MovieDetailService]
})
export class MovieDetailComponent implements OnInit {

	public movie: any = null;
	public isLoading: boolean = true;

	private subscribeForParams: any;

	constructor(private route: ActivatedRoute, private movieDetailService: MovieDetailService) { }

	ngOnInit() {
		this.subscribeForParams = this.route.params.subscribe(params => {
			this.getMovieDetail(params['movieId']);
	    });
	}


	getMovieDetail(movieId) {
		this.movieDetailService.getMovieDetail(movieId).subscribe(
			(response: any) => {
				this.movie = response;
				this.isLoading = false;
			},
			(error: any) => {
			  	console.log("error while getting movie detail ===> " , error );
			},
			() => {}
		);
	}	

}
