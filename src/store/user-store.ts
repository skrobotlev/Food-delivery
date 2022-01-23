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
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._category = [];
    this._filter = "";
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

  valFilter() {
    let matchesFilter = new RegExp(this._filter, "i");
    return this._category.filter((rec) => {
      return matchesFilter.test(rec.header);
    });
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

  get filter() {
    return this._filter;
  }
}
