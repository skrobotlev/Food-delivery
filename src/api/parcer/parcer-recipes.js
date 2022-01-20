// import writeRecipeData from "./api/auth";
// const writeRecipeData = require("./auth");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://daily-menu.ru/dailymenu/recipes/index?pageSize=100";
const url2 = "https://daily-menu.ru/dailymenu/recipes/filter?group_6%5B%5D=93";
// Async function which scrapes the data
async function scrapeData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url2);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const listItems = $(".title");
    // Stores data for all countries
    // console.log(listItems);
    const recipes = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      // Object holding data for each country/jurisdiction
      const recipe = { header: "" };
      // Select the text content of a and span elements
      // Store the textcontent in the above object
      recipe.header = $(el).children("a").text();
      //   recipe.iso3 = $(el).children("span").text();
      // Populate countries array with country data
      recipes.push(recipe);
      // const writeDataFunc = writeRecipeData(recipe.header);
      // writeDataFunc();
    });
    // Logs countries array to the console
    console.log(recipes);
    // Write countries array in countries.json file
    // var fs = require('fs');
    // fs.writeFile('myjsonfile.json', json, 'utf8', callback);

    fs.writeFile("coutries.json", JSON.stringify(recipes, null, 2), "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });
    fs.readFile("coutries.json", "utf8", function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        // obj = JSON.parse(data); //now it an object
        // obj.table.push({ id: 2, square: 3 }); //add some data
        // json = JSON.stringify(obj); //convert it back to json
        fs.writeFile("coutries.json", JSON.stringify(recipes, null, 2), "utf8", (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Successfully written data to file");
        }); // write it back
      }
    });
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeData();

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
