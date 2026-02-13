import { Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { TransactionItem } from '../transaction-item/transaction-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-list',
  imports: [TransactionItem, FormsModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss',
})
export class TransactionList {
  public transactionService = inject(TransactionService);

  onSearchChange(term: string) {
    this.transactionService.updateFilter(term);
  }

  setSort(criteria: 'date' | 'beneficiary' | 'amount') {
    this.transactionService.updateSort(criteria);
  }
}
