import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TabelaProdutosComponent } from './components/tabela-produtos/tabela-produtos.component';
import { environment } from '../../enviroment/enviroment';
import { JsonPipe } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';




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
  imports: [RouterOutlet, JsonPipe, TabelaProdutosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})


export class AppComponent { }