const inquirer = require("inquirer");
// console.log (inquirer);
const fs = require("fs");

inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of your project?",
            name: "name",
        }
    ])
    .then((input) =>
        // console.log(input)
        fs.writeFile("README.md", JSON.stringify(input), (err) =>
        err ? console.error(err) : console.log('README file created & project title added!'))
    );