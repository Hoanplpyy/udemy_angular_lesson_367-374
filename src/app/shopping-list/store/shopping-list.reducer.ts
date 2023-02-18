import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions'

export interface State {
  ingredients: Ingredient[],
  editedIngredient: Ingredient,
  editedIngredientIndex: number
}

export interface AppState {
  shoppingList: State
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }
    case ShoppingListActions.UPDATE_INGREDIENT:
      let ingredient = state.ingredients[state.editedIngredientIndex];
      // ingredient = action.payload.ingredient
          // ingredient = action.payload
      const updatedIngredient = {
        ...ingredient,
        ...action.payload  //因為payLoad以及改成ingredient
      }
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex:-1,
        editedIngredient:null
      }
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => index !== state.editedIngredientIndex),
        editedIngredientIndex:-1,
        editedIngredient:null
      };
    case ShoppingListActions.START_EDIT:
      return {
        state,
        editedIngredientIndex:action.payload,  //來自payload
        editedIngredient:{...state.ingredients[action.payload]} //資料來源，來自目前的state，但是要拿複本

      }
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,   //只要恢復初始設定
        editedIngredientIndex: -1 //只要恢復初始設定
      }

    default:
      return state
  }
}
