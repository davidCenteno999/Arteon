import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { User } from './components/user/user';
import { Register } from './components/user/register/register';
import {Profile} from './components/user/profile/profile';
import {Login} from './components/user/login/login';
import { CreateCatalog } from './components/catalog/create-catalog/create-catalog';
import { CatalogDetail } from './components/catalog/catalog-detail/catalog-detail';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'user', component: User },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'catalog/create', component: CreateCatalog, canActivate: [authGuard] },
  { path: 'catalog/:id', component: CatalogDetail},
];
