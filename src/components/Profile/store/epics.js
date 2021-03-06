import {Http} from "../../../services/Http";
import {catchError, concatMap, switchMap} from "rxjs/operators";
import {ofType} from "redux-observable";
import {Observable} from "rxjs";
import "rxjs/add/observable/of";
import {
    dashboardActionFailure, dashboardActionSuccess,
    registerActionFailure,
    registerActionSuccess, registerEntityActionFailure, registerEntityActionSuccess,
    updateAccountFailure,
    updateAccountSuccess,
    validateAction,
    validateActionFailure,
    validateActionSuccess, validateEntityActionFailure, validateEntityActionSuccess,
} from "./actions";
import {TYPES} from "./actionTypes";
import {displayErrorAction} from "../../../store/actions/actions";

export const updateAccountEpic = (action$, store) =>
    action$.pipe(
        ofType(TYPES.UPDATE),
        switchMap(action => {
            return Http.updateAccount(action.data).pipe(
                concatMap(user => {
                    if(user.data.Code){
                        return [
                            displayErrorAction("error", user.data.Status)
                        ]
                    }else {
                        return [
                            updateAccountSuccess(action.entity),
                            displayErrorAction("success", "User Updated"),
                            validateAction(action.entity, action.data.username),
                        ]
                    }
                }),
                catchError(error =>
                    Observable.of(updateAccountFailure(action.entity, error.message), displayErrorAction("error", error.message))
                )
            );
        })
    );

export const validateActionEpic = action$ =>
    action$.pipe(
        ofType(TYPES.user.VALIDATE),
        switchMap(action => {
            return Http.validateService(action.entity, action.username).pipe(
                concatMap(user => {
                    if (user.data.Code) {
                        return [
                            displayErrorAction("error", user.data.Status),
                            validateActionFailure(action.entity, user.data.Status),
                        ]
                    } else {
                        return [
                            validateActionSuccess(action.entity, user.data),
                        ]
                    }
                }),
                catchError(error =>
                    Observable.of(validateActionFailure(action.entity, error.message))
                )
            );
        })
    );

export const validateInvestorEpic = action$ =>
    action$.pipe(
        ofType(TYPES.investor.VALIDATE),
        switchMap(action => {
            return Http.validateService(action.entity, action.username).pipe(
                concatMap(user => {
                    if (user.data.Code) {
                        return [
                            displayErrorAction("error", user.data.Status),
                            validateActionFailure(action.entity, user.data.Status),
                        ]
                    } else {
                        return [
                            validateActionSuccess(action.entity, user.data),
                        ]
                    }
                }),
                catchError(error =>
                    Observable.of(validateActionFailure(action.entity, error.message))
                )
            );
        })
    );

export const validateRecipientEpic = action$ =>
    action$.pipe(
        ofType(TYPES.recipient.VALIDATE),
        switchMap(action => {
            return Http.validateService(action.entity, action.username).pipe(
                concatMap(user => {
                    if (user.data.Code) {
                        return [
                            displayErrorAction("error", user.data.Status),
                            validateActionFailure(action.entity, user.data.Status),
                        ]
                    } else {
                        return [
                            validateActionSuccess(action.entity, user.data),
                        ]
                    }
                }),
                catchError(error =>
                    Observable.of(validateActionFailure(action.entity, error.message))
                )
            );
        })
    );

export const getInvestorDashboard = action$ =>
    action$.pipe(
        ofType(TYPES.investor.GET_DASHBOARD),
        switchMap(action => {
            return Http.getDashboard(action.entity, action.username).pipe(
                concatMap(user => {
                    if (user.data.Code) {
                        return [
                            displayErrorAction("error", user.data.Status),
                            dashboardActionFailure(action.entity, user.data.Status),
                        ]
                    } else {
                        return [
                            dashboardActionSuccess(action.entity, user.data),
                        ]
                    }
                }),
                catchError(error =>
                    Observable.of(dashboardActionFailure(action.entity, error.message))
                )
            );
        })
    );

export const getRecipientDashboard = action$ =>
    action$.pipe(
        ofType(TYPES.recipient.GET_DASHBOARD),
        switchMap(action => {
            return Http.getDashboard(action.entity, action.username).pipe(
                concatMap(user => {
                    if (user.data.Code) {
                        return [
                            displayErrorAction("error", user.data.Status),
                            dashboardActionFailure(action.entity, user.data.Status),
                        ]
                    } else {
                        return [
                            dashboardActionSuccess(action.entity, user.data),
                        ]
                    }
                }),
                catchError(error =>
                    Observable.of(dashboardActionFailure(action.entity, error.message))
                )
            );
        })
    );

export const validateEntityEpic = action$ =>
    action$.pipe(
        ofType(TYPES.entity.VALIDATE),
        switchMap(action => {
            return Http.validateEntityService("entity", action.username).pipe(
                concatMap(user => {
                    if (user.data.Code) {
                        return [
                            displayErrorAction("error", user.data.Status),
                            validateEntityActionFailure("entity", user.data.Status),
                        ]
                    } else {
                        return [
                            validateEntityActionSuccess("entity", user.data),
                        ]
                    }
                }),
                catchError(error =>
                    Observable.of(validateEntityActionFailure("entity", error.message))
                )
            );
        })
    );

export const registerActionEpic = action$ =>
    action$.pipe(
        ofType(TYPES.REGISTER),
        switchMap(action => {
            return Http.registerService(action.entity, {...action.data}).pipe(
                concatMap(user => {
                    if (user.data.Code) {
                        return [
                            displayErrorAction("error", user.data.Status),
                            registerActionFailure(action.entity, user.data.Status),
                        ]
                    } else {
                        return [
                            displayErrorAction("success", "User Created"),
                            registerActionSuccess(action.entity, user.data),
                        ]
                    }
                }),
                catchError(error =>
                    Observable.of(registerActionFailure(action.entity, error.message), displayErrorAction("error", error.message))
                )
            );
        })
    );

export const registerEntityActionEpic = action$ =>
    action$.pipe(
        ofType(TYPES.REGISTER_ENTITY),
        switchMap(action => {
            return Http.registerEntityService(action.entity, {...action.data}).pipe(
                concatMap(user => {
                    if (user.data.Code) {
                        return [
                            displayErrorAction("error", user.data.Status),
                            registerEntityActionFailure("entity", user.data.Status),
                        ]
                    } else {
                        return [
                            displayErrorAction("success", "User Created"),
                            registerEntityActionSuccess("entity", user.data),
                        ]
                    }
                }),
                catchError(error =>
                    Observable.of(registerEntityActionFailure("entity", error.message), displayErrorAction("error", error.message))
                )
            );
        })
    );
