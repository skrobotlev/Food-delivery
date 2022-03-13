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

  private _breakfastCategory: any;
  private _breakfastCategoryLength: number;
  private _breakfastCategoryName: string;

  private _lunchCategory: any;
  private _lunchCategoryLength: number;
  private _lunchCategoryName: string;

  private _dinnerCategory: any;
  private _dinnerCategoryLength: number;
  private _dinnerCategoryName: string;

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

    this._breakfastCategory = [];
    this._breakfastCategoryLength = 0;
    this._breakfastCategoryName = "";

    this._lunchCategory = [];
    this._lunchCategoryLength = 0;
    this._lunchCategoryName = "";

    this._dinnerCategory = [];
    this._dinnerCategoryLength = 0;
    this._dinnerCategoryName = "";

    makeAutoObservable(this);
  }

  set heartLikeRecipe(rec) {
    this._heartLikeRecipe = rec;
  }

  set actualDay(day) {
    this._actualDay = day;
  }

  set breakfastCategory(li) {
    this._breakfastCategory = li;
  }

  set lunchCategory(li) {
    this._lunchCategory = li;
  }

  set dinnerCategory(li) {
    this._dinnerCategory = li;
  }

  set breakfastCategoryLength(num) {
    this._breakfastCategoryLength = num;
  }

  set lunchCategoryLength(num) {
    this._lunchCategoryLength = num;
  }

  set dinnerCategoryLength(num) {
    this._dinnerCategoryLength = num;
  }

  set breakfastCategoryName(name) {
    this._breakfastCategoryName = name;
  }

  set lunchCategoryName(name) {
    this._lunchCategoryName = name;
  }

  set dinnerCategoryName(name) {
    this._dinnerCategoryName = name;
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

  @computed
  get breakfastHashTable() {
    const arr = toJS(this.breakfast);
    return arr.reduce((acc, recipe) => {
      acc[recipe.recipeId] = true;
      return acc;
    }, {});
  }

  @computed
  get caloriesHashTable() {
    const breakfast = toJS(this.breakfast).reduce((acc, recipe) => {
      acc[recipe.recipeId] = true;
      return acc;
    }, {});
    const lunch = toJS(this.lunch).reduce((acc, recipe) => {
      acc[recipe.recipeId] = true;
      return acc;
    }, {});
    const dinner = toJS(this.dinner).reduce((acc, recipe) => {
      acc[recipe.recipeId] = true;
      return acc;
    }, {});

    return { breakfast, lunch, dinner };

    // breakfast.reduce((acc, recipe) => {
    //   acc[recipe.recipeId] = true;
    //   return acc;
    // }, {});
  }

  deleteRecipeBreakfast(recId) {
    const recipeIndexRecId = this._breakfast.findIndex((rec) => {
      return rec.recipeId === recId;
    });
    if (recipeIndexRecId === -1) {
      this._breakfast.splice(recipeIndexRecId, 1);
    }
  }

  deleteRecipeLunch(recId) {
    const recipeIndexRecId = this._lunch.findIndex((rec) => {
      return rec.recipeId === recId;
    });
    if (recipeIndexRecId === -1) {
      this._lunch.splice(recipeIndexRecId, 1);
    }
  }

  deleteRecipeDinner(recId) {
    console.log(recId, "recID");
    const recipeIndexRecId = this._dinner.findIndex((rec) => {
      return rec.recipeId === recId;
    });
    if (recipeIndexRecId === -1) {
      this._dinner.splice(recipeIndexRecId, 1);
    }
  }

  addRecipeBreakfast(recId, recipe) {
    const recipeIndexRecId = this._breakfast.findIndex((rec) => {
      return rec.recipeId === recId;
    });
    if (recipeIndexRecId === -1) {
      this._breakfast.push({ recipe: recipe });
    }
  }

  addRecipeLunch(recId, recipe) {
    const recipeIndexRecId = this._lunch.findIndex((rec) => {
      return rec.recipeId === recId;
    });
    if (recipeIndexRecId === -1) {
      this._lunch.push({ recipe: recipe });
    }
  }

  addRecipeDinner(recId, recipe) {
    const recipeIndexRecId = this._dinner.findIndex((rec) => {
      return rec.recipeId === recId;
    });
    if (recipeIndexRecId === -1) {
      this._dinner.push({ recipe: recipe });
    }
  }

  get sumCaloriesDinner() {
    return this.calculateSumCaloriesDinner();
  }

  calculateSumCaloriesDinner() {
    let sum = 0;
    this._dinner.map((recip) => {
      // console.log(recip, "sumRECIP");
      sum += +recip.recipe.calories;
    });
    return sum;
  }

  get sumCaloriesLunch() {
    return this.calculateSumCaloriesLunch();
  }

  calculateSumCaloriesLunch() {
    let sum = 0;
    this._lunch.map((recip) => {
      sum += +recip.recipe.calories;
    });
    return sum;
  }

  get sumCaloriesBreakfast() {
    return this.calculateSumCaloriesBreakfast();
  }

  calculateSumCaloriesBreakfast() {
    let sum = 0;
    this._breakfast.map((recip) => {
      sum += +recip.recipe.calories;
    });
    return sum;
  }

  valFilter() {
    let matchesFilter = new RegExp(this._filter, "i");
    return this._caloriesCategory.filter((rec) => {
      return matchesFilter.test(rec.header);
    });
  }

  paginationColumnMeal(meal) {
    if (meal === "breakfast") this.breakfast;
    else if (meal === "lunch") this.lunch;
    else if (meal === "dinner") this.dinner;
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

  get lunchCategory() {
    return this._lunchCategory;
  }

  get dinnerCategory() {
    return this._dinnerCategory;
  }

  get breakfastCategory() {
    return this._breakfastCategory;
  }

  get breakfastCategoryLength() {
    return this._breakfastCategoryLength;
  }

  get lunchCategoryLength() {
    return this._lunchCategoryLength;
  }

  get dinnerCategoryLength() {
    return this._dinnerCategoryLength;
  }

  get breakfastCategoryName() {
    return this._breakfastCategoryName;
  }

  get lunchCategoryName() {
    return this._lunchCategoryName;
  }

  get dinnerCategoryName() {
    return this._dinnerCategoryName;
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
