import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, catchError, throwError } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // authAlumno$: Observable<Usuario>;
  // authForm: FormGroup = new FormGroup({});


  // private usuarioLogueado: string = ''
  private authUser$ = new BehaviorSubject<Usuario | any>(null);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) {
    // this.authForm = new FormGroup({
    //   alumnoLogueado: this.nombreAuthControl,
    // });
    // this.authAlumno$ = this.authService.getAuthAlumno();
  }

  getAuthUser(): Observable<Usuario | null> {
    return this.authUser$.asObservable();
  }

  login(formValue: LoginFormValue): void {
    this.httpClient.get<Usuario[]>(
      `${environment.apiBaseUrl}/usuarios`,
      {
        params: {
          ...formValue
        },
      }
    ).subscribe({
      next: (users) => {
        const loggedUser = users[0];
        if (loggedUser){
          localStorage.setItem('token', loggedUser.token)
          this.authUser$.next(loggedUser);
          this.router.navigate(['dashboard']);
        } else {
          alert('Usuario y/o contraseña incorrecta')
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth'])
  }

  verifyToken(): Observable<boolean>{
    const token = localStorage.getItem('token');
    console.log(localStorage)
    console.log(`${token}`)
    return this.httpClient.get<Usuario[]>(
      `${environment.apiBaseUrl}/usuarios?token=${token}`,
      {
        headers: new HttpHeaders({
          'Authorization': token || '',
        }),
      }
    ).pipe(
      map((users) => {
        const loggedUser = users[0];
        if(loggedUser){
          localStorage.setItem('token', loggedUser.token)
          this.authUser$.next(loggedUser);
        }
        return !!loggedUser;
      }),
      catchError((err) => {
        alert('Error al verificar el token');
        return throwError(() => err);
      })
    )
  }

  // enviarAdrawer(nombre: string): void {
  //   this.usuarioLogueado = nombre;
  //   this.authUser$.next(this.usuarioLogueado);
  // }

}
