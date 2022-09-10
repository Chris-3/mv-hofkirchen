import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotingsListComponent } from './votings/votings-list/votings-list.component';
import { VotingsDetailsComponent } from './votings/votings-details/votings-details.component';
import { UiComponent } from './ui/ui.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProfileComponent } from './profile/profile.component';
import { InstrumenteComponent } from './instrumente/instrumente.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { InstrumentsListComponent } from './instruments/instruments-list/instruments-list.component';
import { InstrumentsDetailsComponent } from './instruments/instruments-details/instruments-details.component';
import { MusiciansListComponent } from './musicians/musicians-list/musicians-list.component';
import { MusiciansDetailsComponent } from './musicians/musicians-details/musicians-details.component';

const routes: Routes = [
  {
    path: '',
    component: UiComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
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
        path: 'Instrumente',
        component: InstrumentsListComponent,
      },
      {
        path: 'Instrumente/:id',
        component: InstrumentsDetailsComponent,
      },
      {
        path: 'Musiker',
        component: MusiciansListComponent,
      },
      {
        path: 'Musiker/:id',
        component: MusiciansDetailsComponent,
      },
      {
        path: 'Kalender',
        component: CalendarComponent,
      },
      {
        path: 'Abstimmungen',
        component: VotingsListComponent,
      },
      {
        path: 'Abstimmungen/:id',
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
    CalendarComponent,
    HomeComponent,
    InstrumentsListComponent,
    InstrumentsDetailsComponent,
    MusiciansListComponent,
    MusiciansDetailsComponent,
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
