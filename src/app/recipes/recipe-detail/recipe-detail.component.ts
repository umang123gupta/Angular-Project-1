import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe = {} as Recipe;
  id:number=0;

  constructor(private recipeService:RecipeService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) =>{
        this.id = +params['id'];
        this.recipe=this.recipeService.getRecipe(this.id);
      }
    )
  }
onAddToShoppingList(){
this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
}
onEditRecipe(){
this.router.navigate(['edit'],{relativeTo:this.route});
// this.router.navigate(['../',this.id,'edit'], {relativeTo:this.route})
}
}
