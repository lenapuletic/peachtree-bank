import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './transfer-form.html',
  styleUrl: './transfer-form.scss',
})
export class TransferForm {
  private fb = inject(FormBuilder);
  private transactionService = inject(TransactionService);

  readonly fromAccountDisplay = computed(
    () => `Free Checking(4692) - $${this.transactionService.balance().toFixed(2)}`
  );

  isPreview = signal(false);

  transferForm = this.fb.group({
    toAccount: ['', Validators.required],
    amount: [
      null as number | null,
      [Validators.required, Validators.min(0.01), Validators.max(500)],
    ],
  });

  onSubmit() {
    if (this.transferForm.valid) {
      this.isPreview.set(true);
    }
  }

  onTransfer() {
    const rawValue = this.transferForm.getRawValue();
    this.transactionService.addTransaction({
      amount: rawValue.amount!.toString(),
      categoryCode: '#1180aa',
      merchant: rawValue.toAccount!,
      merchantLogo: '/assets/icons/arrows.png',
      transactionDate: Date.now(),
      transactionType: 'Online Transfer',
    });

    this.transferForm.reset();
    this.isPreview.set(false);
  }
}
