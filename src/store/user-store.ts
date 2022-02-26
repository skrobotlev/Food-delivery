import { action, computed, makeAutoObservable, observable, toJS } from "mobx";
import { persist } from "mobx-persist";

export class PersistStore {
  @persist("object") @observable category = [];
  @persist @observable categoryLength = 0;
  @persist @observable currentPage = 1;
  @persist @observable perPage = 3;
  @persist @observable nameCateg = "";
  constructor() {
    makeAutoObservable(this);
  }

  @action
  setNameCateg(name) {
    this.nameCateg = name;
  }
  @action
  setObject(obj) {
    this.category = obj;
  }
  @action
  setCurrentPage(page) {
    this.currentPage = page;
  }
}

export default class UserStore {
  private _isAuth: boolean;
  private _user: any;
  private _favoriteRecipes: any;

  private _favoriteRecipesDb: any;

  private _modalObject: any;
  private _categoryLength: any;

  constructor() {
    this._isAuth = false;
    this._user = {};
    this._favoriteRecipes = [];

    this._favoriteRecipesDb = [];

    this._categoryLength = 0;

    this._modalObject = {};
    makeAutoObservable(this);
  }

  deleteRecipe(header) {
    const recipeIndexAtId = this.favoriteRecipesDb.findIndex((rec) => {
      return rec.recipe.header === header;
    });
    if (recipeIndexAtId > -1) {
      this.favoriteRecipesDb.splice(recipeIndexAtId, 1);
    }
  }

  addRecipe(recId, recipe) {
    const recipeIndexRecId = this.favoriteRecipesDb.findIndex((rec) => {
      return rec.recipeId === recId;
    });
    if (recipeIndexRecId === -1) {
      this.favoriteRecipesDb.push(recipe);
    }
  }

  set favoriteRecipesDb(res) {
    this._favoriteRecipesDb = res;
  }

  @computed
  get favoriteRecipesHashTable() {
    const arr = toJS(this.favoriteRecipesDb);
    return arr.reduce((acc, recipe) => {
      acc[recipe.recipeId] = true;
      return acc;
    }, {});
  }

  set isAuth(bool: boolean) {
    this._isAuth = bool;
  }

  set user(user) {
    this._user = user;
  }

  setCategoryLength(num) {
    this._categoryLength = num;
  }

  setModalObject(obj) {
    this._modalObject = obj;
    // this.valFilter()
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get favoriteRecipesDb() {
    return this._favoriteRecipesDb;
  }

  get favoriteRecipes() {
    return this._favoriteRecipes;
  }

  get favoriteRecipesKeys() {
    return this._favoriteRecipes.map((recipe) => recipe.id);
  }

  get categoryLength() {
    return this._categoryLength;
  }

  get modalObject() {
    return this._modalObject;
  }
}
