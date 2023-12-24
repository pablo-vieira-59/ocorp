import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HistoryCard } from 'src/app/models/Components/HistoryCard';
import { BatchHistory } from 'src/app/models/Entities/BatchHistory';
import { BatchService } from 'src/app/services/batch.service';

@Component({
  selector: 'app-tab-batch-history',
  templateUrl: './tab-batch-history.component.html',
  styleUrls: ['./tab-batch-history.component.scss']
})
export class TabBatchHistoryComponent {
  card = {
    title:"Encomendado", 
    createdAt:"02/12/2023 22:14:46",
    description: "Lote encomendado.",
    createdBy:"Pablo Andrade"
  } as HistoryCard;

  card2 = {
    title:"Entregue", 
    createdAt:"05/12/2023 08:35:15",
    description: "Lote Entregue pela transportadora.",
    createdBy:"Automação"
  } as HistoryCard;


  @Input()
  batchId = 0;

  cards = [] as HistoryCard[];
  batches = [] as BatchHistory[];

  constructor(
    private serviceBatch :BatchService,
  ) { }

  async ngOnInit(){
    this.batches = await this.serviceBatch.GetHistory(this.batchId);

    this.cards = this.batches.map((x) => 
    ({
      title : x.toStatus.name,
      createdAt : formatDate(x.createdAt, "dd/MM/yyyy HH:mm:SS", "pt-BR"),
      createdBy : x.user.name,
      description : x.message,
    }) as HistoryCard)
  }
}
