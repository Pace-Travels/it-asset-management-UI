import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly ACCESS_TOKEN = 'accessToken';
  private readonly REFRESH_TOKEN = 'refreshToken';
  private readonly USER = 'user';

  private getStorage(rememberMe?: boolean): Storage {
    // If explicitly defined, use that preference
    if (rememberMe === true) return localStorage;
    if (rememberMe === false) return sessionStorage;
    
    // Default getter logic: check if data is in localStorage first
    return localStorage.getItem(this.ACCESS_TOKEN) ? localStorage : sessionStorage;
  }

  //================ Access Token =================//

  setAccessToken(token: string, rememberMe: boolean = false): void {
    this.getStorage(rememberMe).setItem(this.ACCESS_TOKEN, token);
  }

  getAccessToken(): string | null {
    return this.getStorage().getItem(this.ACCESS_TOKEN);
  }

  //================ Refresh Token =================//

  setRefreshToken(token: string, rememberMe: boolean = false): void {
    this.getStorage(rememberMe).setItem(this.REFRESH_TOKEN, token);
  }

  getRefreshToken(): string | null {
    return this.getStorage().getItem(this.REFRESH_TOKEN);
  }

  //================ User =================//

  setUser(user: any, rememberMe: boolean = false): void {
    this.getStorage(rememberMe).setItem(this.USER, JSON.stringify(user));
  }

  getUser(): any {
    const user = this.getStorage().getItem(this.USER);
    return user ? JSON.parse(user) : null;
  }

  //================ Remove =================//

  clear(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.USER);
    
    sessionStorage.removeItem(this.ACCESS_TOKEN);
    sessionStorage.removeItem(this.REFRESH_TOKEN);
    sessionStorage.removeItem(this.USER);
  }

}