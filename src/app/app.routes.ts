import { Routes } from '@angular/router';

//Pages
import { Onboarding } from './pages/onboarding/onboarding';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { TripDetails } from './pages/trip-details/trip-details';
import { TripForm } from './pages/trip-form/trip-form';
import { ExpenseForm } from './pages/expense-form/expense-form';
import { Styleguide } from './pages/styleguide/styleguide';


export const routes: Routes = [
    // {path: '', component: Onboarding},
    { path: '', component: Dashboard },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard },
    { path: 'trip-details/:id', component: TripDetails },
    { path: 'trip-form', component: TripForm },
    { path: 'expense-form/:id', component: ExpenseForm },
    { path: 'styleguide', component: Styleguide }


];
