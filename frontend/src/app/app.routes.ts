import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { User } from './components/user/user';
import { Register } from './components/user/register/register';
import {Profile} from './components/user/profile/profile';
import {Login} from './components/user/login/login';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'user', component: User },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'login', component: Login },
];
