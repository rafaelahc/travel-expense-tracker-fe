import { Routes } from '@angular/router';

//Pages
import { Onboarding } from './pages/onboarding/onboarding';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { TripDetails } from './pages/trip-details/trip-details';
import { TripForm } from './pages/trip-form/trip-form';
import { ExpenseForm } from './pages/expense-form/expense-form';
import { Image } from './components/image/image';


import { Styleguide } from './pages/styleguide/styleguide';
import { Button } from './shared/button/button';
import { AuthGuard } from './services/auth.guard';


export const routes: Routes = [
    { path: 'onboarding', component: Onboarding },
    { path: '', component: Dashboard, canActivate: [AuthGuard] },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },
    { path: 'trip-details/:id', component: TripDetails, canActivate: [AuthGuard]  },
    { path: 'trip-form', component: TripForm, canActivate: [AuthGuard]  },
    { path: 'expense-form/:tripId', component: ExpenseForm, canActivate: [AuthGuard]  },
    // { path: 'image/:id', component: Image },

    { path: 'styleguide', component: Styleguide },
    { path: 'button-test', component: Button }


];
