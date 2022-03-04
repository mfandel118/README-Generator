const inquirer = require("inquirer");
// console.log (inquirer);
const fs = require("fs");

inquirer
    .prompt([
        {
            type: "input",
            message: "What is the NAME of your project?",
            name: "projName",
        },
        {
            type: "input",
            message: "Please write a BRIEF DESCRIPTION of your project.",
            name: "description",
        },
        {
            type: "input",
            message: "Please describe HOW TO INSTALL the application, step by step",
            name: "install",
        },
        {
            type: "input",
            message: "Please explain the USAGE of the application",
            name: "usage",
        },
        {
            type: "confirm",
            message: "Do you have a SCREENSHOT of your deployed application?",
            name: "picConfirm",
        },
        {
            type: "input",
            message: "Please enter the FILE PATH to the screenshot image",
            name: "pic1",
            when: (input) => input.picConfirm === true,
        },
        {
            type: "confirm",
            message: "Do you have a ANOTHER SCREENSHOT of your deployed application?",
            name: "picConfirm2",
            when: (input) => input.picConfirm === true,
        },
        {
            type: "input",
            message: "Please enter the FILE PATH to the additional screenshot image",
            name: "pic2",
            when: (input) => input.picConfirm2 === true,
        },
        // {
        //     type: "",
        //     message: "",
        //     name: "",
        // },
    ])
    .then((input) => {
        // console.log(input)
        let picture1 = input.picConfirm ? `<img src="${input.pic1}">"\n` : "";
        let picture2 = input.picConfirm2 ? `<img src="${input.pic2}">"\n` : "";

        fs.writeFile("README.md", 
            // TABLE OF CONTENTS
        `# ${input.projName}\n\n## Description\n\n${input.description}\n\n## Installation\n\n${input.install}\n\n## Usage\n\n${input.usage}\n${picture1}${picture2}`, 
        
        (err) =>
        err ? console.error(err) : console.log('README file created!'))
    })