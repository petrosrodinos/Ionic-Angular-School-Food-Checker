// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, mergeMap} from 'rxjs/operators';
// import { of } from 'rxjs';
// import { FireserviceService } from '../../services/auth/fireservice.service';
// import * as AuthActions from './auth.actions';

// @Injectable()
// export class AuthEffects {
//   getPosts$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.logIn),
//       mergeMap(async (data:any) => {
//         try {
//               const user = await this.authService.loginWithEmail(data);
//               return AuthActions.logInSuccess({ user });
//           } catch (error) {
//               return AuthActions.logInFailure({ error });
//           }
//       })
//     )
//   );

//   constructor(private actions$: Actions, private authService: FireserviceService) {}
// }
