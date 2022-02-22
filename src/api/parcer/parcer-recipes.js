// import writeRecipeData from "./api/auth";
const writeRecipeData = require("../parcer/parcer-folder/dbWorker");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const saveData = require("./parcer-folder/dbWorker");
const url = "https://daily-menu.ru/dailymenu/recipes/index?pageSize=100";
const url2 = "https://daily-menu.ru/dailymenu/recipes/filter?group_6%5B%5D=93";
const url3 = "";
// Async function which scrapes the data
async function scrapeData(url) {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const listItems = $(".recipe_anounce");
    // Stores data for all countries
    // console.log(listItems);
    const recipes = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      // Object holding data for each country/jurisdiction
      const recipe = {};
      // recipe.header = $(el).children(".title").children("a").text();
      // recipe.img = $(".recipe_preview", el).contents("src");
      recipe.img = "https://daily-menu.ru" + $("img", el).attr("src");
      // /([\/])([a-z_0-9.]*|[0-9]*)/gm !!!!!!!!!!!!!!!!!!!=========================!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //  БОЛЬШИЕ БУКВЫ A-Z НЕ ЗАБЫТЬ ПРОВЕРИТЬ, ЧТОБЫ ВСЕ JPG БЫЛИ ВЗЯТЫ
      // console.log(recipe.img.match(/([\/])([a-z_0-9.]*|[0-9]*)/gm).toString());
      // recipe.img
      //   .match(/([\/])([a-z_0-9.]*|[0-9]*)/gm)
      //   .toString()
      //   .replace(",", "");
      recipe.desc = $(".recipe_content", el)
        .children("p")
        .last()
        .text()
        .replace(/(\s{3,50})/g, " ");
      // .match(/(:?[а-я]+(\s)([а-я]+),)|(\s)([а-я]+)/);

      // console.log(recipe.desc);
      recipe.header = $(".title", el).children("a").text();
      // console.log(JSON.stringify(recipe.header));
      // const bzhu = $(".recipe_content", el)[0].firstChild;
      // const bzhu = $(".recipe_content", el).children("p").first().text();
      const data = $(".recipe_content", el).children("p").first().text().trim();
      // let splits = bzhu.split(" ", 3);
      // let matching = bzhu.match(/[А-Яа-я]/);
      let result = data.split(".");
      // console.log(result);
      if (result.length > 2) return;
      // recipe.timeToCook = result[0].replace(/(\D)/g, "");
      recipe.timeToCook = result[0].trim();

      result = result[1].trim().split("Ккал / 100 г,");
      recipe.calories = result[0].replace(/(\D)/g, "");

      result = result[1]
        .trim()
        .split(",")
        .map((item) => {
          return item.replace(/(\D)/g, "");
        });

      recipe.bzhu = {
        proteins: result[0],
        fat: result[1],
        carbs: result[2],
      };

      recipes.push(recipe); // Populate countries array with country data //   recipe.iso3 = $(el).children("span").text();
      // console.log(recipe);
    });
    // Logs countries array to the console
    // console.log(recipes);
    // saveData(recipes);
    // console.log(recipes);
    // writeRecipeData(recipes);

    // fs.writeFile("coutries.json", JSON.stringify(recipes, null, 2), "utf8", (err) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log("Successfully written data to file");
    // });
    // fs.readFile("coutries.json", "utf8", function readFileCallback(err, data) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     // obj = JSON.parse(data); //now it an object
    //     // obj.table.push({ id: 2, square: 3 }); //add some data
    //     // json = JSON.stringify(obj); //convert it back to json
    //     fs.writeFile("coutries.json", JSON.stringify(recipes, null, 2), "utf8", (err) => {
    //       if (err) {
    //         console.error(err);
    //         return;
    //       }
    //       console.log("Successfully written data to file");
    //     }); // write it back
    //   }
    // });
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
for (let i = 1; i <= 10; i++) {
  let url = `https://daily-menu.ru/dailymenu/recipes/filter?group_6%5B0%5D=39&DailymenuRecipes_page=${i}`;
  scrapeData(url);
}
// let urlSCR = `https://daily-menu.ru/dailymenu/recipes/filter?group_6%5B0%5D=93&DailymenuRecipes_page=1`;
// scrapeData(urlSCR);
// const markup = `
// <ul class="fruits">
//   <li class="fruits__mango"> Mango </li>
//   <li class="fruits__apple"> Apple </li>
// </ul>
// `;

// const $ = cheerio.load(markup);
// console.log(pretty($.html()));

// const mango = $(".fruits__mango");
// console.log(mango.html()); // Mango Полная запись компонента в терминале

// const apple = $(".fruits__apple");
// console.log(apple.attr("class")); //fruits__apple CLASS elem

// // вывод содержимого каждого элемента списка циклом
// const listItems = $("li");
// console.log(listItems.length); // 2
// listItems.each(function (idx, el) {
//   console.log($(el).text());
// });
// // Mango
// // Apple

// const ul = $("ul");
// ul.append("<li>Banana</li>"); // Добавить в конец списка элемент напрямую
// ul.prepend("<li>Pineapple</li>"); // Добавить в начало списка элемент напрямую
// console.log(pretty($.html()));
