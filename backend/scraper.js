const axios = require("axios");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Question = require("./model/Question");

// URL to scrape from
const url =
  // "https://www.indiabix.com/logical-reasoning/letter-and-symbol-series/";
  "https://www.indiabix.com/online-test/aptitude-test/random";
  // "https://www.javatpoint.com/aptitude/quantitative#ages";

const scrapeQuestions = async () => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    $(".bix-div-container").each(async (index, element) => {
      const question = $(element).find(".bix-td-qtxt").text();
      const options = [];

      // Find the options
      $(element)
        .find(".bix-tbl-options .bix-opt-row")
        .each((i, el) => {
          const optionText = $(el)
            .find(".bix-td-option-val .flex-wrap")
            .text()
            .trim();
          options.push(optionText);
        });

      // Debugging: Log the entire element HTML
      // console.log("Element HTML:", $(element).html());

      // Find the correct answer
      const correctAnswer = $(element).find(".jq-hdnakq").val().trim(); // Get value from input
      
         // Check if the question already exists in the database
      const existingQuestion = await Question.findOne({ text: question });
      if (existingQuestion) {
        console.log("Question already exists in the database:", question);
        return; // Skip to the next question
      }

      // Log the scraped data
      console.log("Scraped question:", question);
      console.log("Options:", options);
      console.log("Correct answer:", correctAnswer);

      const newQuestion = new Question({
        text: question,
        options: options,
        correctAnswer: correctAnswer,
        category: "Random", // Adjust this as necessary
        type: "MCQ",
        difficulty: "Medium",
      });

      await newQuestion.save();
      console.log("Question saved:", newQuestion);
    });
  } catch (error) {
    console.error(error);
  }
};

connectDB().then(scrapeQuestions);
