// import writeRecipeData from "./api/auth";
// const writeRecipeData = require("./auth");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const saveData = require("./parcer-folder/dbWorker");
// const url = "https://daily-menu.ru/dailymenu/recipes/index?pageSize=100";
// const url2 = "https://daily-menu.ru/dailymenu/recipes/filter?group_6%5B%5D=93";
// const url3 = "";
// Async function which scrapes the data
async function scrapeData(url) {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class

    const exactHeader = $(".recipe_title");
    // // Stores data for all countries
    const exactImg = $(".orange_block").children("a");
    // console.log(exactHeader.toString());
    console.log(exactImg.toString());
    // const recipes = [];
    // // Use .each method to loop through the li we selected
    // listItems.each((idx, el) => {
    //   // Object holding data for each country/jurisdiction
    //   const recipe = {};
    //   // Select the text content of a and span elements
    //   // Store the textcontent in the above object
    //   // recipe.header = $(el).children(".title").children("a").text();
    //   // recipe.img = $(".recipe_preview", el).contents("src");
    //   recipe.img = $("img", el).attr("currentSrc");

    //   console.log(recipe.img);
    //   recipe.header = $(".title", el).children("a").text();
    //   // console.log(JSON.stringify(recipe.header));
    //   // const bzhu = $(".recipe_content", el)[0].firstChild;
    //   // const bzhu = $(".recipe_content", el).children("p").first().text();
    //   const data = $(".recipe_content", el).children("p").first().text().trim();
    //   // let splits = bzhu.split(" ", 3);
    //   // let matching = bzhu.match(/[А-Яа-я]/);
    //   let result = data.split(".");
    //   // console.log(result);
    //   if (result.length > 2) return;
    //   // recipe.timeToCook = result[0].replace(/(\D)/g, "");
    //   recipe.timeToCook = result[0].trim();

    //   result = result[1].trim().split("Ккал / 100 г,");
    //   recipe.calories = result[0].replace(/(\D)/g, "");

    //   result = result[1]
    //     .trim()
    //     .split(",")
    //     .map((item) => {
    //       return item.replace(/(\D)/g, "");
    //     });

    //   recipe.bzhu = {
    //     proteins: result[0],
    //     fat: result[1],
    //     carbs: result[2],
    //   };

    // recipes.push(recipe); // Populate countries array with country data //   recipe.iso3 = $(el).children("span").text();
    // });

    // saveData(recipes);
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
// for (let i = 17; i <= 22; i++) {
//   let url = `https://daily-menu.ru/dailymenu/recipes/view/${i}`;
//   scrapeData(url);
// }
// let urlSCR = `https://daily-menu.ru/dailymenu/recipes/filter?group_6%5B0%5D=93&DailymenuRecipes_page=1`;
// scrapeData(urlSCR);
