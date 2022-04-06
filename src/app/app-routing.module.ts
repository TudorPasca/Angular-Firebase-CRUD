import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'details/:id', component: PostDetailComponent},
  { path: 'navbar', component: NavbarComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'newsfeed', component: NewsfeedComponent},
  { path: 'details/key', component: PostDetailComponent},
  { path: 'favourites', component: FavouritesComponent},
  { path: 'about', component: AboutUsComponent},
  { path: '**', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
