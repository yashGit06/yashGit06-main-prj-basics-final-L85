import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingListReducer from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static:true}) nameValue : ElementRef;
  // @ViewChild('amountInput', {static:true}) amountValue : ElementRef;

  // @Output() emitInputData = new EventEmitter<Ingredient>();
  @ViewChild('seData', {static:true}) formDataSE : NgForm;
  subscription : Subscription;
  editMode = false;
  editedItemIndex:number;
  editItem : Ingredient;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingListReducer.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(state => {
      if (state.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItemIndex = state.editedIngredientIndex;
        this.editItem = state.editedIngredient;
        this.formDataSE.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
    /*
    this.subscription =this.shoppingListService.startedEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.formDataSE.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      });
      */
  }

  // emitInput(name: HTMLInputElement, amount: HTMLInputElement) {
  //   let inputData: Ingredient = new Ingredient(name.value,+amount.value);
  //   this.emitInputData.emit(inputData);
  // }

  emitInput2(formData : NgForm){
    const value = formData.value;
    const newIng = new Ingredient(value.name, value.amount);
    // this.emitInputData.emit(newIng);
    if(this.editMode){
      // this.shoppingListService.updateIngredient(this.editedItemIndex,newIng);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index:this.editedItemIndex,newIng:newIng}));
      this.editMode=false;
    }
    else{
      // this.shoppingListService.updateIngredients(newIng);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIng)); // dispatch set the data/payload
    }
    this.formDataSE.reset();
  }

  resetForm(){
    this.formDataSE.reset();
    this.editMode=false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete(){
      // this.shoppingListService.searchAndRemove(this.editedItemIndex);
      this.store.dispatch(new ShoppingListActions.RemoveIngredient(this.editedItemIndex));
      this.resetForm();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
