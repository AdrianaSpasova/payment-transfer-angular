import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css']
})
export class TransferFormComponent {
  source = '';
  destination = '';
  amount: number | null = null;

  @Output() transfer = new EventEmitter<{ from: string; to: string; amount: number }>();

  onSubmit() {
    this.transfer.emit({ from: this.source.trim(), to: this.destination.trim(), amount: Number(this.amount) });
  }
}
