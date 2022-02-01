import { action, makeAutoObservable, observable } from "mobx";
import { persist } from "mobx-persist";

// interface UserStoreProps {
//   _isAuth: boolean;
//   _user: any;
// }

export class PersistStore {
  @persist("object") @observable category = [];
  @persist @observable categoryLength = 0;
  @persist @observable currentPage = 1;
  @persist @observable perPage = 3;
  constructor() {
    makeAutoObservable(this);
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
  _isAuth: boolean;
  _user: any;
  _favoriteRecipes: any;

  _category: any;
  _filter: string;
  _modalObject: any;
  _categoryLength: any;
  _currentItems: any;
  _currentPage: any;
  _perPage: any;
  _salads: any;

  constructor() {
    this._isAuth = false;
    this._user = {};
    this._favoriteRecipes = [];

    this._salads = [];
    this._category = [];
    this._categoryLength = 0;
    this._currentPage = 1;
    this._perPage = 3;
    this._currentItems = [];
    this._filter = "";
    this._modalObject = {};
    makeAutoObservable(this);
  }

  setSalads(items) {
    this._salads = items;
  }

  get salads() {
    return this._salads;
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setCategory(cat) {
    this._category = cat;
  }

  setCurrentPage(num) {
    this._currentPage = num;
  }

  setCurrentItems(items) {
    this._currentItems = items;
  }

  setCategoryLength(num) {
    this._categoryLength = num;
  }

  valFilter() {
    let matchesFilter = new RegExp(this._filter, "i");
    return this._category.filter((rec) => {
      return matchesFilter.test(rec.header);
    });
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

  get category() {
    return this._category;
  }

  get currentPage() {
    return this._currentPage;
  }

  get currentItems() {
    return this._currentItems;
  }

  get categoryLength() {
    return this._categoryLength;
  }

  get filter() {
    return this._filter;
  }
  get perPage() {
    return this._perPage;
  }

  get modalObject() {
    return this._modalObject;
  }
}