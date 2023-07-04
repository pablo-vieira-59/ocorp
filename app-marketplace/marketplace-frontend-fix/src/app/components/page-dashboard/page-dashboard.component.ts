import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Chart } from 'chart.js/dist';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss']
})
export class PageDashboardComponent {

  // Pie Chart
  labels_user_type = ["Admin", "Gerente", "Funcionarios", "Clientes"];
  data_user_type = [1, 2, 3, 5];

  // Bar Chart
  labels_user_count = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Junho', 'Julho', 'Agosto','Setembro','Outubro','Novembro','Dezembro']
  data_user_count = [[1, 2, 3, 5, 8, 13, 21, 25, 26, 28, 30]];
  names_user_count = ["Quantidade de usuários"];

  // Bar Chart
  labels_establishments = ['Estabelecimentos']
  data_establishments = [[2],[8],[4]];
  names_establishments = ['Eletronicos', 'Roupas', 'Eletrodomesticos']

  // Bar Chart
  labels_permissions = ['Permissões'];
  data_permissions = [[6],[4],[2],[1]];
  names_permissions = ['Admin', 'Gerente', 'Funcionarios', 'Clientes'];

  // Line Chart
  names_user_count_compare = ["Quantidade de usuários", "Possiveis clientes"];
  data_user_count_compare = [
    [1, 2, 3, 5, 8, 13, 21, 25, 26, 28, 30, 32, 35, 38, 43, 51],
    [5, 13, 28, 52, 45, 64, 80, 75, 62, 48, 32, 16, 8, 24, 16, 4]
  ];
} 
