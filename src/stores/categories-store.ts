import { makeAutoObservable } from "mobx";
import { string } from "yup/lib/locale";

// interface UserStoreProps {
//   _isAuth: boolean;
//   _user: any;
// }

export default class CategoriesStore {
  _salads: any;
  _deserts: any;
  _firstDishes: any;
  _secondDishes: any;
  _beverages: any;
  _canning: any;
  _sauces: any;
  _categoryLength: number;
  _perPage: number;
  _currentPage: any;
  _currentCategory: any;
  _modalObject: any;
  _openModal: boolean;
  _heartLikeRecipe: any;
  _filter: string;
  _keyCATEGORY: any;
  _nameCurrentCategory: string;

  constructor() {
    this._salads = [];
    this._deserts = [];
    this._firstDishes = [];
    this._secondDishes = [];
    this._beverages = [];
    this._canning = [];
    this._sauces = [];
    this._modalObject = {
      categories: "first-dishes",
      id: "-Mw1bYh6q7IPtTK3c2qT",
      recipe: {
        bzhu: { proteins: "1", fat: "1", carbs: "5" },
        calories: "33",
        desc: "Потребуется: вода, картофель, фасоль печеная в томатном соусе, вешенки свежие, морковь, лук репчатый, масло подсолнечное, соль поваренная пищевая",
        header: "Быстрый фасолевый суп с грибами",
        img: "https://daily-menu.ru/public/modules/dailymenu/dailymenurecipes/12427/thumb_2865a6ccc6ec2d6ac8d728ee360b4e1d.jpg",
        timeToCook: "30 мин",
      },
      recipeId: "-MuQ3zjGiQTHGqN7-Nia",
    };
    this._openModal = false;
    this._heartLikeRecipe= {};


    this._nameCurrentCategory = "";
    this._currentCategory = [];
    this._filter = "";
    this._categoryLength = 0;
    this._perPage = 10;
    this._currentPage = 0;
    makeAutoObservable(this);
  }

  setHeartLikeRecipe(rec) {
    this._heartLikeRecipe = rec;
    // this.valFilter()
  }

  setNameCurrentCategory(name) {
    this._nameCurrentCategory = name;
  }

  setOpenModal(bool) {
    this._openModal = bool;
  }

  valFilter() {
    let matchesFilter = new RegExp(this._filter, "i");
    return this._currentCategory.filter((rec) => {
      return matchesFilter.test(rec.header);
    });
  }

  setCurrentCategory(items) {
    this._currentCategory = items;
  }

  setSalads(items) {
    this._salads = items;
  }
  setDeserts(items) {
    this._deserts = items;
  }
  setFirstDishes(items) {
    this._firstDishes = items;
  }
  setSecondDishes(items) {
    this._secondDishes = items;
  }
  setBeverages(items) {
    this._beverages = items;
  }
  setCanning(items) {
    this._canning = items;
  }
  setSauces(items) {
    this._sauces = items;
  }

  setModalObject(obj) {
    this._modalObject = obj;
    // this.valFilter()
  }

  setCategoryLength(num) {
    this._categoryLength = num;
  }

  setCurrentPage(num) {
    this._currentPage = num;
  }

  setPerPage(num) {
    this._perPage = num;
  }

  get heartLikeRecipe() {
    return this._heartLikeRecipe;
    // this.valFilter()
  }

  get nameCurrentCategory() {
    return this._nameCurrentCategory;
  }
  get openModal() {
    return this._openModal;
  }

  get salads() {
    return this._salads;
  }
  get deserts() {
    return this._deserts;
  }
  get firstDishes() {
    return this._firstDishes;
  }
  get secondDishes() {
    return this._secondDishes;
  }
  get beverages() {
    return this._beverages;
  }
  get canning() {
    return this._canning;
  }
  get sauces() {
    return this._sauces;
  }
  get modalObject() {
    return this._modalObject;
  }
  get categoryLength() {
    return this._categoryLength;
  }
  get currentPage() {
    return this._currentPage;
  }
  get currentCategory() {
    return this._currentCategory;
  }
  get filter() {
    return this._filter;
  }
  get perPage() {
    return this._perPage;
  }
}
