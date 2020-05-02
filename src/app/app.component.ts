import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "./_services/authentication.service";
import { User } from "./_models/user";
import { Role, RoleType } from "./_models/role";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Tour of Heroes";
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

 
  get isLoggedIn() {
    return (
      this.currentUser 
    );
  }
  get isReader() {
    return (
      this.currentUser &&
      this.currentUser.roles.find(x => x.roletype === RoleType.HeroesReader)
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
