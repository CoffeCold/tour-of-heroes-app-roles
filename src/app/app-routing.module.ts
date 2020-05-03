import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroesComponent } from "./heroes/heroes.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { HeroDetailroComponent } from "./hero-detailro/hero-detailro.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./_helpers/auth.guard";
import { RoleType } from "./_models/role";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: [RoleType.HeroesReader] }
  },
  {
    path: "detail/:id",
    component: HeroDetailComponent,
    canActivate: [AuthGuard],
    data: { role: [RoleType.HeroesWriter] }
  },
  {
    path: "detailero/:id",
    component: HeroDetailroComponent,
    canActivate: [AuthGuard],
    data: { role: [RoleType.HeroesReader] }
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "heroes",
    component: HeroesComponent,
    canActivate: [AuthGuard],
    data: { role: [RoleType.HeroesReader] }
  },
  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
