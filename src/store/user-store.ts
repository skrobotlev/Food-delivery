import { makeAutoObservable } from "mobx";

// interface UserStoreProps {
//   _isAuth: boolean;
//   _user: any;
// }

export default class UserStore {
  _isAuth: boolean;
  _user: any;
  _category: any;
  _filter: string;
  _modalObject: any;
  _categoryLength: any;
  constructor() {
    this._isAuth = false;
    this._user = {};

    this._category = [];
    this._categoryLength = 0;
    this._filter = "";
    this._modalObject = {};
    makeAutoObservable(this);
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

  get categoryLength() {
    return this._categoryLength;
  }

  get filter() {
    return this._filter;
  }

  get modalObject() {
    return this._modalObject;
  }
}
