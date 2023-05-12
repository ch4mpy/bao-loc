import { Injectable } from "@angular/core"
import { User } from "@c4-soft/bao-loc-domain";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export abstract class  UserService {
  abstract login(): void;

  abstract logout(): void;

  abstract refreshUserData(idClaims: any): void;

  abstract valueChanges: Observable<User>;

  abstract current: User;
}
