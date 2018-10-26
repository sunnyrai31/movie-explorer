import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const fallBackRoute: Route = {
  path: "**",
  component: PageNotFoundComponent
}

const indexRoute: Route = {
  path: "",   redirectTo: "/", pathMatch: "full"
}

const routes: Routes = [
	{path: "", component: HomeComponent},
	{path: "movie-detail/:movieId", component: MovieDetailComponent},
	indexRoute,
    fallBackRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
