import { action, computed, makeAutoObservable, observable, toJS } from "mobx";

export default class CaloriesStore {
  private _caloriesCategory: any;
  private _filter: string;
  private _categoryLength: number;
  private _perPage: number;
  private _currentPage: any;
  private _nameCaloriesCategory: string;

  private _heartLikeRecipe: any;
  private _actualDay: string;
  private _breakfast: any;
  private _lunch: any;
  private _dinner: any;

  constructor() {
    this._caloriesCategory = [];
    this._filter = "";
    this._categoryLength = 0;
    this._perPage = 10;
    this._currentPage = 0;
    this._nameCaloriesCategory = "";

    this._heartLikeRecipe = {};
    this._actualDay = "";
    this._breakfast = [];
    this._lunch = [];
    this._dinner = [];

    makeAutoObservable(this);
  }

  set heartLikeRecipe(rec) {
    this._heartLikeRecipe = rec;
  }

  set actualDay(day) {
    this._actualDay = day;
  }

  set breakfast(li) {
    this._breakfast = li;
  }

  set lunch(li) {
    this._lunch = li;
  }

  set dinner(li) {
    this._dinner = li;
  }

  set nameCaloriesCategory(name) {
    this._nameCaloriesCategory = name;
  }

  set caloriesCategory(cat) {
    this._caloriesCategory = cat;
  }

  set filter(val) {
    this._filter = val;
  }

  set categoryLength(num) {
    this._categoryLength = num;
  }

  set currentPage(num) {
    this._currentPage = num;
  }

  addRecipeBreakfast(recId, recipe) {
    const recipeIndexRecId = this._breakfast.findIndex((rec) => {
      return rec.recipeId === recId;
    });
    if (recipeIndexRecId === -1) {
      this._breakfast.push(recipe);
    }
  }

  addRecipeLunch(recId, recipe) {
    const recipeIndexRecId = this._lunch.findIndex((rec) => {
      return rec.recipeId === recId;
    });
    if (recipeIndexRecId === -1) {
      this._lunch.push(recipe);
    }
  }

  addRecipeDinner(recId, recipe) {
    const recipeIndexRecId = this._dinner.findIndex((rec) => {
      return rec.recipeId === recId;
    });
    if (recipeIndexRecId === -1) {
      this._dinner.push(recipe);
    }
  }

  get sumCaloriesDinner() {
    return this.calculateSumCaloriesDinner();
  }

  calculateSumCaloriesDinner() {
    let sum = 0;
    this._dinner.map((recip) => {
      sum += +recip.calories;
    });
    return sum;
  }

  get sumCaloriesLunch() {
    return this.calculateSumCaloriesLunch();
  }

  calculateSumCaloriesLunch() {
    let sum = 0;
    this._lunch.map((recip) => {
      sum += +recip.calories;
    });
    return sum;
  }

  get sumCaloriesBreak() {
    return this.calculateSumCaloriesBreak();
  }

  calculateSumCaloriesBreak() {
    let sum = 0;
    this._breakfast.map((recip) => {
      sum += +recip.calories;
    });
    return sum;
  }

  valFilter() {
    let matchesFilter = new RegExp(this._filter, "i");
    return this._caloriesCategory.filter((rec) => {
      return matchesFilter.test(rec.header);
    });
  }

  get heartLikeRecipe() {
    return this._heartLikeRecipe;
  }

  get actualDay() {
    return this._actualDay;
  }

  get breakfast() {
    return this._breakfast;
  }

  get lunch() {
    return this._lunch;
  }

  get dinner() {
    return this._dinner;
  }

  get nameCaloriesCategory() {
    return this._nameCaloriesCategory;
  }

  get caloriesCategory() {
    return this._caloriesCategory;
  }

  get categoryLength() {
    return this._categoryLength;
  }
  get currentPage() {
    return this._currentPage;
  }

  get filter() {
    return this._filter;
  }
  get perPage() {
    return this._perPage;
  }
}
