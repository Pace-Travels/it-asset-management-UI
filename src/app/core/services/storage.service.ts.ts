import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private readonly ACCESS_TOKEN = 'accessToken';

  private readonly REFRESH_TOKEN = 'refreshToken';

  private readonly USER = 'user';


  //================ Access Token =================//

  setAccessToken(token: string): void {

    sessionStorage.setItem(
      this.ACCESS_TOKEN,
      token
    );

  }

  getAccessToken(): string | null {

    return sessionStorage.getItem(
      this.ACCESS_TOKEN
    );

  }


  //================ Refresh Token =================//

  setRefreshToken(token: string): void {

    sessionStorage.setItem(
      this.REFRESH_TOKEN,
      token
    );

  }

  getRefreshToken(): string | null {

    return sessionStorage.getItem(
      this.REFRESH_TOKEN
    );

  }


  //================ User =================//

  setUser(user: any): void {

    sessionStorage.setItem(
      this.USER,
      JSON.stringify(user)
    );

  }

  getUser(): any {

    const user = sessionStorage.getItem(this.USER);

    return user ? JSON.parse(user) : null;

  }


  //================ Remove =================//

  clear(): void {

    sessionStorage.clear();

  }

}