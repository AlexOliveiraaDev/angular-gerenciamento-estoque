import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { environment } from '../../../../enviroment/enviroment';
import { SpeedDialModule } from 'primeng/speeddial';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';




interface Produto {
  id: number;
  produto: string;
  categoria: string;
  quantidade: number;
  preco: number;
  localizacao: string;
}

@Component({
  selector: 'app-tabela-produtos',
  standalone: true,
  imports: [TableModule, SpeedDialModule, IconFieldModule, InputIconModule, CheckboxModule, DialogModule, ButtonModule, InputTextModule],
  templateUrl: './tabela-produtos.component.html',
  styleUrl: './tabela-produtos.component.scss',
  providers: []
})
export class TabelaProdutosComponent implements OnInit {

  visible = false;

  title = 'gerenciador-estoque';
  listaProdutos: Produto[] = [];
  constructor(private http: HttpClient) {

  }

  acaoOpcao1() {
    console.log('Ação da Opção 1');
  }

  acaoOpcao2() {
    console.log('Ação da Opção 2');
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

  ShowDialog() {
    this.visible = !this.visible;
  }
}
