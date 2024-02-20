import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfoComponent } from '../info/info.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule, InfoComponent], // Corrected imports
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  question = "What’s your name?";
  answer = "unknown";

  appForm = new FormGroup({
    answer: new FormControl(''),
  });

  onSubmit(data: Partial<{ answer: string | null }>) {
    this.answer = data.answer!;
    console.log("Your name is " + this.answer);
  }
}
