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
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

interface Produto {
  id: number;
  produto: string;
  categoria: string;
  quantidade: number;
  preco: number;
  localizacao: string;
}

interface Item {
  produto: string;
  categoria: string;
  quantidade: number;
  preco: number;
  localizacao: string;
  [key: string]: string | number;
}

@Component({
  selector: 'app-tabela-produtos',
  standalone: true,
  imports: [TableModule, SpeedDialModule, IconFieldModule, InputIconModule, CheckboxModule, DialogModule, ButtonModule, InputTextModule, DropdownModule, InputNumberModule, FormsModule],
  templateUrl: './tabela-produtos.component.html',
  styleUrl: './tabela-produtos.component.scss',
  providers: []
})
export class TabelaProdutosComponent implements OnInit {

  visible = false;
  categorias = [
    { name: "Categoria 01" },
    { name: "Categoria 02" }
  ];
  localizacao = [
    { name: "Categoria 01" },
    { name: "Categoria 02" }
  ];

  deleteItem: any;
  quantidadeVenda: number = 1;
  displayVenda: boolean = false;

  item: Item = {
    produto: '',
    categoria: '',
    quantidade: 0,
    preco: 0,
    localizacao: '',
  };

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

  newProduto() {
    this.http.post<any>(environment.apiUrl + '/produtos', this.item).subscribe({
      next: (res) => {
        console.log('Produto adicionado com sucesso:', res);
        this.getProdutos();
      },
      error: (error) => {
        console.error('Erro ao adicionar produto:', error);
        // Lide com o erro, exiba uma mensagem para o usuário, etc.
      }
    });
  }

  deleteProduto(id: number) {
    this.http.delete<any>(`${environment.apiUrl}/produtos/${id}`).subscribe({
      next: (res) => {
        console.log('Produto excluído com sucesso:', res);
        this.getProdutos(); // Atualiza a lista de produtos após a exclusão
      },
      error: (error) => {
        console.error('Erro ao excluir produto:', error);
        // Lide com o erro, exiba uma mensagem para o usuário, etc.
      }
    });
  }


  ngOnInit(): void {
    this.getProdutos()
  }

  ShowDialog() {
    this.visible = !this.visible;
  }

  AdicionarProduto() {
    console.log(this.item)
    this.newProduto();
  }


  displayConfirmation: boolean = false;

  showConfirmDialog(item: any) {
    this.deleteItem = item; // Define o item a ser excluído
    this.displayConfirmation = true;
  }

  confirmDelete() {
    // Lógica para excluir o item (usando this.item)
    console.log('Item excluído:', this.deleteItem);
    this.deleteProduto(this.deleteItem.id)
    this.displayConfirmation = false;
  }





  showVendaDialog(item: any) {
    this.item = item;
    this.quantidadeVenda = 1; // Resetar quantidade ao abrir
    this.displayVenda = true;
  }

  confirmarVenda() {
    // Lógica para registrar a venda (usando this.item e this.quantidadeVenda)
    console.log(`Venda de ${this.quantidadeVenda} unidades de ${this.item.produto} confirmada!`);
    this.displayVenda = false;
  }
}
