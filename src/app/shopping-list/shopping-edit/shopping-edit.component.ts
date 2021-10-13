import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static:true}) nameValue : ElementRef;
  @ViewChild('amountInput', {static:true}) amountValue : ElementRef;

  // @Output() emitInputData = new EventEmitter<Ingredient>();

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
  }

  // emitInput(name: HTMLInputElement, amount: HTMLInputElement) {
  //   let inputData: Ingredient = new Ingredient(name.value,+amount.value);
  //   this.emitInputData.emit(inputData);
  // }

  emitInput2(){
    const newIng = new Ingredient(this.nameValue.nativeElement.value, this.amountValue.nativeElement.value);
    // this.emitInputData.emit(newIng);
    this.shoppingListService.updateIngredients(newIng);
  }

}
