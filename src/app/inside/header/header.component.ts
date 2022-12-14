import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})



export class HeaderComponent implements OnInit {
  public showMenu: boolean = false;
  public showRouting: boolean = false;
  
  public items :any[]=[
    {name: 'Kalender', route:'/Home/Kalender'},
    {name: 'Musiker', route:'/Home/Musiker'},
    {name: 'Instrumente', route:'/Home/Instrumente'},
    {name: 'Abstimmungen', route:'/Home/Abstimmungen'}
  ];

  constructor(private authService: AuthService, private router: Router, private toaster: ToastrService) { }
 
  ngOnInit(): void { }

  async signOut() {
    await this.authService.logout();
    this.router.navigateByUrl('/')
      .then(() => this.toaster.warning('You signed out'))
  }

  toggleProfileMenu() {
    this.showMenu = !this.showMenu;
  }
  toggleRouting() {
    this.showRouting = !this.showRouting;
  }
}
