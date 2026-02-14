import { Component, inject } from '@angular/core';
import { SortCriteria, TransactionService } from '../../services/transaction.service';
import { TransactionItem } from '../transaction-item/transaction-item';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe }  from "@angular/common";

@Component({
  selector: 'app-transaction-list',
  imports: [TransactionItem, FormsModule, UpperCasePipe],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.scss',
})
export class TransactionList {
  public transactionService = inject(TransactionService);

  public sortCriterias: SortCriteria[] = ['date', 'beneficiary', 'amount'];

  onSearchChange(term: string) {
    this.transactionService.updateFilter(term);
  }

  setSort(criteria: SortCriteria) {
    this.transactionService.updateSort(criteria);
  }
}
