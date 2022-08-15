import { Subject } from 'rxjs';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import {  Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()

export class RecipeService{
recipeChanged = new Subject<Recipe[]>();

private recipes : Recipe[]=[
    new Recipe('Pizza',
    'Delicious Pizza',
    'https://static.toiimg.com/photo/msid-87930581/87930581.jpg?211826',
    [
      new Ingredient('Chees',1),
      new Ingredient('Breads',10)
    ]),
    new Recipe('Burger',
    'tasty burger',
    'https://us.123rf.com/450wm/alexskp/alexskp2003/alexskp200300082/143499095-fresh-tasty-burger-isolated-on-white.jpg?ver=6',
    [
      new Ingredient('buns',2),
      new Ingredient('Sauce',3)
    ]),
]

constructor(private slService:ShoppingListService){}

getRecipes(){
  return this.recipes.slice();  
}

getRecipe(index : number){
  return this.recipes[index];
}

addIngredientsToShoppingList(ingredients:Ingredient[]){
this.slService.addIngredients(ingredients);
}

addRecipe(recipe:Recipe){
  this.recipes.push(recipe);
  this.recipeChanged.next(this.recipes.slice());
}

updateRecipe(index:number,newRecipe:Recipe){
  this.recipes[index]=newRecipe;
  this.recipeChanged.next(this.recipes.slice());
}

deleteRecipe(index:number){
  this.recipes.splice(index,1);
  this.recipeChanged.next(this.recipes.slice());
}
}