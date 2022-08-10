import { ShoppingListService } from './../shopping-list.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

@ViewChild('nameInput') nameInputRef:ElementRef= {} as ElementRef;
@ViewChild('amountInput') amountInputRef:ElementRef= {} as ElementRef;


constructor(private slService:ShoppingListService) { }

ngOnInit(): void {
}


onAddItem(){
  const ingName=this.nameInputRef.nativeElement.value;
  const ingAmount=this.amountInputRef.nativeElement.value;
  const newIngrident=new Ingredient(ingName,ingAmount);
  this.slService.addIngredient(newIngrident);
}

}
