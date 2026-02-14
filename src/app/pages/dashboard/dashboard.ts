import { Component } from '@angular/core';
import { TransactionList } from '../../components/transaction-list/transaction-list';
import { TransferForm } from '../../components/transfer-form/transfer-form';

@Component({
  selector: 'app-dashboard',
  imports: [TransactionList, TransferForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
