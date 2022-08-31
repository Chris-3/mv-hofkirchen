import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotingsListComponent } from './votings-list/votings-list.component';
import { VotingsDetailsComponent } from './votings-details/votings-details.component';
import { UiComponent } from './ui/ui.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProfileComponent } from './profile/profile.component';
import { InstrumenteComponent } from './instrumente/instrumente.component';
import { MusikerComponent } from './musiker/musiker.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: UiComponent,
    children: [
      {
        path: '',
        component: VotingsListComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'instrumente',
        component: InstrumenteComponent,
      },
      {
        path: 'musiker',
        component: MusikerComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: ':id',
        component: VotingsDetailsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    VotingsListComponent,
    VotingsDetailsComponent,
    UiComponent,
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    ProfileComponent,
    InstrumenteComponent,
    MusikerComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
  ],
  exports: [],
})
export class InsideModule { }
