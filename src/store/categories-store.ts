import { makeAutoObservable } from "mobx";

export default class CategoriesStore {
  private _categoryLength: number;
  private _perPage: number;
  private _currentPage: any;
  private _currentCategory: any;
  private _modalObject: any;
  private _openModal: boolean;
  private _heartLikeRecipe: any;
  private _filter: string;
  private _keyCATEGORY: any;
  private _nameCurrentCategory: string;

  constructor() {
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
    this._heartLikeRecipe = {};

    this._nameCurrentCategory = "";
    this._currentCategory = [];
    this._filter = "";
    this._categoryLength = 0;
    this._perPage = 10;
    this._currentPage = 0;
    makeAutoObservable(this);
  }

  set filter(val) {
    this._filter = val;
  }

  set heartLikeRecipe(rec) {
    this._heartLikeRecipe = rec;
  }

  setHeartLikeRecipe(rec) {
    this._heartLikeRecipe = rec;
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

  set currentCategory(items) {
    this._currentCategory = items;
  }

  setCurrentCategory(items) {
    this._currentCategory = items;
  }

  set modalObject(obj) {
    this._modalObject = obj;
    // this.valFilter()
  }

  setModalObject(obj) {
    this._modalObject = obj;
    // this.valFilter()
  }

  set categoryLength(num) {
    this._categoryLength = num;
  }

  set currentPage(num) {
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
