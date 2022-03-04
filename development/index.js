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
            message: "Please write a BRIEF DESCRIPTION of your project:",
            name: "description",
        },
        {
            type: "input",
            message: "Please describe HOW TO INSTALL the application, step by step:",
            name: "install",
        },
        {
            type: "input",
            message: "Please explain the USAGE of the application:",
            name: "usage",
        },
        {
            type: "confirm",
            message: "Do you have a SCREENSHOT of your deployed application?",
            name: "picConfirm",
        },
        {
            type: "input",
            message: "Please enter the FILE PATH to the screenshot image:",
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
            message: "Please enter the FILE PATH to the additional screenshot image:",
            name: "pic2",
            when: (input) => input.picConfirm2 === true,
        },
        {
            type: "confirm",
            message: "Were there additional CONTRIBUTORS to this project?",
            name: "teamConfirm",
        },
        {
            type: "input",
            message: "Please write a brief statement acknowledging the additional CONTRIBUTORS to this project:",
            name: "team",
            when: (input) => input.teamConfirm === true,
        },
        {
            type: "confirm",
            message: "Is there a URL to the DEPLOYED APPLICATION?",
            name: "urlConfirm",
        },
        {
            type: "input",
            message: "Please paste the full URL to the DEPLOYED APPLICATION here:",
            name: "url",
            when: (input) => input.urlConfirm === true,
        },
        {
            type: "confirm",
            message: "Is there a GITHUB REPOSITORY for this project?",
            name: "repoConfirm",
        },
        {
            type: "input",
            message: "Please paste the full URL for the GITHUB REPO here:",
            name: "repo",
            when: (input) => input.repoConfirm === true,
        },
        {
            type: "input",
            message: "What is your EMAIL address?",
            name: "email",
        },
        {
            type: "input",
            message: "Please paste the full URL to your GITHUB PROFILE:",
            name: "gitHub",
        },
    ])
    .then((input) => {
        // console.log(input)
        // Declare variables to nest in template literal
        let displayTeam = input.teamConfirm ? `## Contributors\n\n${input.team}\n\n` : "";
        let teamToC = input.teamConfirm ? `* [Contributors](#contributors)\n\n`: "";

        let displayURL = input.urlConfirm ? `## Link to Deployed Application\n\n${input.url}\n\n` : "";
        let urlToC = input.urlConfirm ? `* [Link to Deployed Application](#link-to-deployed-application)\n\n` : "";

        let displayRepo = input.repoConfirm ? `## Link to GitHub Repo\n\n${input.url}\n\n` : "";
        let repoToC = input.repoConfirm ? `[Link to GitHub Repo](#link-to-github-repo)\n\n` : "";

        let displayPic1 = input.picConfirm ? `## Screenshot(s)\n<img src="${input.pic1}">\n` : "";
        let displayPic2 = input.picConfirm2 ? `<img src="${input.pic2}">\n\n` : "";
        let picToC = input.picConfirm ? `* [Screenshots](#screenshots)\n\n`: "";

        // Display all inputted information on README file
        fs.writeFile("README.md", 
        // Title✅ Table of Contents✅ Description✅✅ Usage✅ Installation✅✅ Deployed link✅✅ GitHub link✅✅ Pictures✅✅ Contributors✅✅ Questions✅ ✅ License✅
        `# ${input.projName}\n\n## Table of Contents:\n\n* [Description](#description)\n* [Usage](#usage)\n\n* [Installation](#installation)\n\n${urlToC}${repoToC}${picToC}${teamToC}* [Questions](#Questions)\n\n* [License](#license)\n\n
        ## Description\n\n${input.description}\n\n## Usage\n\n${input.usage}\n\n## Installation\n\n${input.install}\n\n${displayURL}${displayRepo}${displayPic1}${displayPic2}${displayTeam}## Questions?\n\n* Email:${input.email}\n\n* GitHub Profile:${input.gitHub}\n\n
        ## License\n\n`, 
        // NEED TO ADD LICENSE INFO
        (err) =>
        err ? console.error(err) : console.log('README file created!'))
    })