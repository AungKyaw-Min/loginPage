import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-tabner',
  templateUrl: './tabner.component.html',
  styleUrls: ['./tabner.component.css'],
})
export class TabnerComponent implements OnInit {
  faBell = faBell;
  faSearch = faSearch;
  userData: any = [];
  filteredUserData = [];
  private _searchTerm = '';
  total_user = 0;
  private userSub: Subscription;
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchData();
    this.filteredUserData = this.userData;
    this.userSub = this.authService.user.subscribe();
  }

  private fetchData() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((user) => {
        this.userData = user;
        // console.log(this.userData);
      });
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredUserData = this.filterUsers(value);
  }

  filterUsers(value: string) {
    value = value.toLowerCase();
    if (!this.filteredUserData) return [];
    if (!value) {
      this.total_user = 0;
      return [];
    }

    let temp = this.userData.filter((it) => {
      return (
        it.name.toLowerCase().includes(value) ||
        it.username.toLowerCase().includes(value) ||
        it.email.toLowerCase().includes(value) ||
        it.address.geo.lat.toLowerCase().includes(value) ||
        it.address.geo.lng.toLowerCase().includes(value)
      );
    });

    this.total_user = temp.length;
    return temp;
  }

  onLogout() {
    this.authService.logout();
  }
}
