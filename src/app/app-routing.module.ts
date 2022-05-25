import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapComponent } from './components/map/map.component';
import { NewsComponent } from './components/news/news.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'map', component: MapComponent },
  { path: 'news', component: NewsComponent },
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome) },
  { path: 'sign-up', component: SignUpComponent, ...canActivate(redirectLoggedInToHome) },
  { path: 'home', component: HomeComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'profile', component: ProfileComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'edit/:id', component: EditComponent, ...canActivate(redirectUnauthorizedToLogin) },
  {  path: 'create', component: CreateComponent, ...canActivate(redirectUnauthorizedToLogin)},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }