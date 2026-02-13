import { Component, input } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-item',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.scss',
})
export class TransactionItem {
  transaction = input.required<Transaction>();
}
