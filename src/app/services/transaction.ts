import { inject, Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction';
import { catchError, of, tap } from 'rxjs';

export type SortCriteria = 'date' | 'beneficiary' | 'amount';
export type SortDirection = 'asc' | 'desc';
const INITIAL_BALANCE = 5824.76;

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private http = inject(HttpClient);

  private balanceState = signal<number>(INITIAL_BALANCE);
  private transactionsState = signal<Transaction[]>([]);
  private filterTermState = signal<string>('');
  private sortByState = signal<SortCriteria>('date');
  private sortDirectionState = signal<SortDirection>('desc');

  readonly balance = this.balanceState.asReadonly();
  readonly filterTerm = this.filterTermState.asReadonly();
  readonly sortBy = this.sortByState.asReadonly();
  readonly sortDirection = this.sortDirectionState.asReadonly();

  readonly filteredTransactions = computed(() => {
    let list = [...this.transactionsState()];
    const term = this.filterTermState().toLowerCase();
    const sortField = this.sortByState();
    const direction = this.sortDirectionState();

    if (term) {
      list = list.filter(
        (t) =>
          t.merchant.toLowerCase().includes(term) ||
          t.transactionType.toLowerCase().includes(term) ||
          t.amount.toString().includes(term)
      );
    }

    return list.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'date') {
        comparison = a.transactionDate - b.transactionDate;
      } else if (sortField === 'beneficiary') {
        comparison = a.merchant.localeCompare(b.merchant);
      } else if (sortField === 'amount') {
        comparison = parseFloat(a.amount) - parseFloat(b.amount);
      }

      return direction === 'desc' ? -comparison : comparison;
    });
  });

  constructor() {
    this.fetchInitialTransactions();
  }

  private fetchInitialTransactions() {
    this.http
      .get<{ data: Transaction[] }>('/assets/data/transactions.json')
      .pipe(
        tap((response) => this.transactionsState.set(response.data)),
        catchError((error) => {
          console.error('Failed to load transactions:', error);
          return of({ data: [] });
        })
      )
      .subscribe();
  }

  toggleSort(criteria: SortCriteria) {
    if (this.sortByState() === criteria) {
      this.sortDirectionState.update((dir) => (dir === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortByState.set(criteria);
    }
  }

  addTransaction(newTransaction: Transaction) {
    const amount = parseFloat(newTransaction.amount);

    this.balanceState.update((current) => current - amount);
    this.transactionsState.update((current) => [newTransaction, ...current]);
  }

  updateFilter(term: string) {
    this.filterTermState.set(term);
  }

  updateSort(criteria: 'date' | 'beneficiary' | 'amount') {
    this.sortByState.set(criteria);
  }
}
