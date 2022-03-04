const inquirer = require("inquirer");
// console.log (inquirer);
const fs = require("fs");

inquirer
    .prompt([
        {
            type: "input",
            message: "What is the name of your project?",
            name: "projName",
        },
        {
            type: "input",
            message: "Please write a brief description of your project.",
            name: "description",
        },
    ])
    .then((input) =>
        // console.log(input)
        fs.writeFile("README.md", `# ${input.projName}\n\n## Description\n\n${input.description}`, (err) =>
        err ? console.error(err) : console.log('README file created!'))
    )