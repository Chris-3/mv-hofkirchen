import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VotingComponent } from './voting/voting.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./inside/inside.module').then((m) => m.InsideModule),
    canActivate: [AuthGuard],
  },
  { path: '**', pathMatch: 'full', 
        component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
