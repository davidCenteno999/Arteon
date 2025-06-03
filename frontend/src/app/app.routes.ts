import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { User } from './components/user/user';
import { Register } from './components/user/register/register';
import {Profile} from './components/user/profile/profile';
import {Login} from './components/user/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'user', component: User },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile },
  { path: 'login', component: Login },
];
