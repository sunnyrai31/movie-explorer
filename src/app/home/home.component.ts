import { Component, OnInit } from '@angular/core';
import { MovieSearchService } from '../../services/movie-search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	public query: string = "";
	public movieList: any[] = [];
	public isListLoading: any = undefined;
	public isLoadingMoreData: boolean;
	public pageNo: number = 1;
	public isMoreDataAvailableOnServer: boolean;

	constructor(private movieSearchService: MovieSearchService) {
		this.movieSearchService.movieListWatcher.subscribe(
		  (responseData) => {

		  	this.pageNo = 0;
		  	this.isMoreDataAvailableOnServer = true;
		  	this.isLoadingMoreData = false;

		  	this.isListLoading = responseData.isLoading;
		  	this.movieList = responseData.data? responseData.data.results : null;
		  	this.query = responseData.query;
		  }
		);
	}

	ngOnInit() {
	}

	getMoreMovies(pageNo) {
		this.isLoadingMoreData = true;
		this.movieSearchService.searchMovies(this.query, pageNo).subscribe(
			(response: any) => {
				this.isMoreDataAvailableOnServer = response.results.length;
				this.isLoadingMoreData = false;
				this.movieList = this.movieList.concat(response.results);
			},
			(error: any) => {
			  	console.log("error while getting movie detail in pagination ===> " , error );
			},
			() => {}
		);
	}

	onScroll(event) {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
	       this.loadMoreData();
	    }
	}

	loadMoreData() {
		if (this.isMoreDataAvailableOnServer && !this.isLoadingMoreData) {
			this.pageNo++;
			this.getMoreMovies(this.pageNo);
		}
  	}

}
