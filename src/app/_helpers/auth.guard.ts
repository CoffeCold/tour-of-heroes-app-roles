import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { AuthenticationService } from "../_services";
import { RoleType } from "../_models";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  autorized: Boolean;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.autorized = false;

      if (
        route.data.role &&
        currentUser.roles.find(x => x.roletype === route.data.role[0])
      ) {
        // Current user has role that is the (first and only) role on route
        this.autorized = true;
      }
      if (!route.data.role) {
        // there is no role on route
        this.autorized = true;
      }

      if (this.autorized) {
        // authorised so return true
        return true;
      } else {
        // role not authorised so redirect to home page
        this.router.navigate(["/"]);
        return false;
      }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
