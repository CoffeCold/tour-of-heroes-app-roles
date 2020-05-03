import { Component, OnInit } from "@angular/core";
import { Hero } from "../_models/hero";
import { HeroService } from "../_services/hero.service";
import { User } from "../_models/user";
import { AuthenticationService } from "../_services/authentication.service";
import { Role, RoleType } from "../_models/role";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  currentUser: User;
  constructor(
    private heroService: HeroService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {
    this.getHeroes();
  }

  get isWriter() {
    return (
      this.currentUser &&
      this.currentUser.roles.find(x => x.roletype === RoleType.HeroesWriter)
    );
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(heroes => (this.heroes = heroes.slice(1, 5)));
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
