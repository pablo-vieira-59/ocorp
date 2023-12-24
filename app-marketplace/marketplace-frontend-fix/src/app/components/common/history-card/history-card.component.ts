import { Component, Input } from '@angular/core';
import { HistoryCard } from 'src/app/models/Components/HistoryCard';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss']
})
export class HistoryCardComponent {
  @Input()
  histories :HistoryCard[] = [];
}
