import { Http } from "../../../services/Http";
import { catchError, switchMap, map } from "rxjs/operators";
import { ofType } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import {
  USER_ACCOUNT,
  fetchUserAccountSuccess,
  fetchUserAccountFailure,
  USER_ACCOUNT_UPDATE,
  updateUserAccountSuccess,
  updateUserAccountFailure,
} from "./actions";
import Storage from "../../../services/Storage";

export const fetchUserAccountEpic = action$ =>
  action$.pipe(
    ofType(USER_ACCOUNT),
    switchMap(action => {
      const { username, token } = action.payload;
      return Http.userValidate(username, token).pipe(
        map(user => {
          if (user.data.Code) {
            return fetchUserAccountFailure(user.data.Status);
          } else {
            return fetchUserAccountSuccess(user.data);
          }
        }),
      );
    })
  );

export const updateUserAccountEpic = action$ =>
  action$.pipe(
    ofType(USER_ACCOUNT_UPDATE),
    switchMap(action => {
      const { username, data } = action.payload;
      return Http.updateUserAccount(username, data).pipe(
        map(user => updateUserAccountSuccess(user.data, data)),
        catchError(error =>
          Observable.of(updateUserAccountFailure(error.message))
        )
      );
    })
  );
