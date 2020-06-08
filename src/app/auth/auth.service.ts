import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
    accessToken: string,
    refreshToken: string,
    userId: string,
    expiresIn: number,
    email: string
};

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signup(name: string, email: string, password: string) {
        return this.http.post(environment.baseApi + 'auth/signup',
            {
                name: name,
                email: email,
                password: password
            }).pipe(catchError(this.handleError), tap(resData => {
                this.router.navigate['/login'];
            }))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(environment.baseApi + 'auth/login',
            {
                email: email,
                password: password
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.userId, resData.accessToken, resData.refreshToken, resData.expiresIn);
        }))
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _accessToken: string,
            _refreshToken: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._accessToken, userData._refreshToken, new Date(userData._tokenExpirationDate));
        if (loadedUser.accessToken) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }


    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, accessToken: string, refreshToken: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 * expiresIn);
        const user = new User(email, userId, accessToken, refreshToken, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 60 * 1000);
        console.log('storing');
        console.log(JSON.stringify(user));
        localStorage.setItem('userData', JSON.stringify(user));
        // localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        console.log(errorRes);
        let errorMessage = 'An unknown error occured!';
        if (!errorRes.message) {
            return throwError(errorMessage);
        }
        if (errorRes.status == 422) {
            return throwError('Wrong username or password');
        }
        return throwError(errorRes.message)
    }
}