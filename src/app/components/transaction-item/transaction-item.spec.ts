import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionItem } from './transaction-item';

describe('TransactionItem', () => {
  let component: TransactionItem;
  let fixture: ComponentFixture<TransactionItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionItem],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('transaction', {
      amount: '100.00',
      categoryCode: '#1180aa',
      merchant: 'Test Merchant',
      merchantLogo: '',
      transactionDate: Date.now(),
      transactionType: 'Card Payment',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
