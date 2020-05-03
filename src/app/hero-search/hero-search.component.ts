import { Component, OnInit } from "@angular/core";

import { Observable, Subject } from "rxjs";
import { User } from "../_models/user";
import { Role, RoleType } from "../_models/role";
import { AuthenticationService } from "../_services/authentication.service";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

import { Hero } from "../_models/hero";
import { HeroService } from "../_services/hero.service";

@Component({
  selector: "app-hero-search",
  templateUrl: "./hero-search.component.html",
  styleUrls: ["./hero-search.component.css"]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();
  currentUser: User;

  constructor(
    private heroService: HeroService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  get isWriter() {
    return (
      this.currentUser &&
      this.currentUser.roles.find(x => x.roletype === RoleType.HeroesWriter)
    );
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
