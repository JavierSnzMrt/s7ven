import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders }from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  id: number;

  constructor(private _user: UserService, private _http: HttpClient, private rutaActiva: ActivatedRoute ) {}

  usuario: {
    name: string;
    email: string;
    password: string;
    age: number;
    city: string;
    training: string;
    experience: string;
    user_area:string;
    offer: string;
  }

  logout(){
    this._user.logout();
  }

  ngOnInit(): void {
    this.id=this.rutaActiva.snapshot.params.id
    console.log(this.id);
    this._http.get(`http://localhost:3000/verUsuario/${this.id}`, {withCredentials: true})
    .subscribe((responseAPI) => {
      console.log(responseAPI)
      this.usuario = responseAPI[0];
    })
  }

}
