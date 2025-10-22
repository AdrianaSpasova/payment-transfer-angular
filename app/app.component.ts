import { Component } from '@angular/core';

interface Account { id: string; balance: number; }
interface Transaction { from: string; to: string; amount: number; timestamp: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Payment Transfer';

  private accountsMap: Map<string, Account> = new Map([
    ['A-1001', { id: 'A-1001', balance: 1000 }],
    ['A-1002', { id: 'A-1002', balance: 500 }],
    ['A-1003', { id: 'A-1003', balance: 0 }]
  ]);

  transactions: Transaction[] = [];
  message = '';
  messageColor = '';

  get accounts(): Account[] {
    return Array.from(this.accountsMap.values());
  }

  onTransferRequested(event: { from: string; to: string; amount: number }) {
    const { from, to, amount } = event;
    try {
      if (!from || !to || !amount) throw new Error('All fields are required.');

      const fromAcc = this.accountsMap.get(from);
      const toAcc = this.accountsMap.get(to);
      if (!fromAcc) throw new Error('Source account not found.');
      if (!toAcc) throw new Error('Destination account not found.');
      if (amount <= 0) throw new Error('Amount must be greater than zero.');
      if (fromAcc.balance < amount) throw new Error('Insufficient funds.');

      fromAcc.balance -= amount;
      toAcc.balance += amount;

      this.transactions.unshift({
        from,
        to,
        amount,
        timestamp: new Date().toLocaleString()
      });

      this.message = '✅ Transfer successful!';
      this.messageColor = 'green';
    } catch (err: any) {
      this.message = `❌ Error: ${err.message}`;
      this.messageColor = 'red';
    }
  }
}
