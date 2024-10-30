import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/enviroment';
import { JsonPipe } from '@angular/common';

interface Produto {
  id: number;
  produto: string;
  categoria: string;
  quantidade: number;
  preco: number;
  localizacao: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})


export class AppComponent implements OnInit {

  title = 'gerenciador-estoque';
  listaProdutos: Produto[] = [];
  constructor(private http: HttpClient) {

  }

  getProdutos(): any {
    this.http.get<any>(environment.apiUrl + '/produtos').subscribe(res => {
      console.log(res)
      this.listaProdutos = res;
    });
  }
  ngOnInit(): void {
    this.getProdutos()
  }
}
