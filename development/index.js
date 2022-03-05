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
            default: false
        },
        {
            type: "input",
            message: "Please enter the FILE PATH or URL to the screenshot image:",
            name: "pic1",
            when: (input) => input.picConfirm === true,
        },
        {
            type: "input",
            message: "Please enter ALT TEXT for this photo:",
            name: "pic1text",
            when: (input) => input.picConfirm === true,
        },
        {
            type: "confirm",
            message: "Do you have a ANOTHER SCREENSHOT of your deployed application?",
            name: "picConfirm2",
            when: (input) => input.picConfirm === true,
            default: false
        },
        {
            type: "input",
            message: "Please enter the FILE PATH or URL to the additional screenshot image:",
            name: "pic2",
            when: (input) => input.picConfirm2 === true,
        },
        {
            type: "input",
            message: "Please enter ALT TEXT for this additional photo:",
            name: "pic2text",
            when: (input) => input.picConfirm2 === true,
        },
        {
            type: "confirm",
            message: "Were there additional CONTRIBUTORS to this project?",
            name: "teamConfirm",
            default: false
        },
        {
            type: "input",
            message: "What are the NAMES of all additional CONTRIBUTORS to this project:?",
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
            message: "What is your GITHUB USERNAME?:",
            name: "gitHub",
        },
        {
            type: "list",
            message: "What type of license is this project using?",
            name: "license",
            default: "MIT",
            choices: [
                "MIT",
                "Apache 2.0",
                "Boost Software License 1.0",
                "BSD 3-Clause",
                "BSD 2-Clause",
                "CC0-1.0",
                "CC BY 4.0",
                "CC BY-SA 4.0",
                "CC BY-NC 4.0",
                "CC BY-ND 4.0",
                "CC BY-NC-SA 4.0",
                "CC BY-NC-ND 4.0",
                "Eclipse Public License 1.0",
                "GNU GPL v3",
                "GNU GPL v2",
                "GNU AGPL v3",
                "GNU LGPL v3",
                "GNU FDL v1.3",
                "IPL 1.0",
                "ICL",
                "MPL 2.0",
                "Open Data Commons Attribution",
                "ODbL",
                "PDDL",
                "Artistic-2.0",
                "Open Font-1.1",
                "Unlicense",
                "WTFPL",
                "Zlib"]
        },
    ])
    .then((input) => {
        // console.log(input)
        // Declare variables to nest in template literal
        let displayPic1 = input.picConfirm ? `## Screenshot(s)\n![${input.pic1text}](${input.pic1})\n\n` : "";
        let displayPic2 = input.picConfirm2 ? `![${input.pic2text}](${input.pic2})\n\n` : "";
        let picToC = input.picConfirm ? `* [Screenshots](#screenshots)\n`: "";
        
        let displayTeam = input.teamConfirm ? `## Contributors\n\nAdditional contributors to this project: ${input.team}\n\n` : "";
        let teamToC = input.teamConfirm ? `* [Contributors](#contributors)\n`: "";

        let displayURL = input.urlConfirm ? `## Link to Deployed Application\n\n${input.url}\n\n` : "";
        let urlToC = input.urlConfirm ? `* [Link to Deployed Application](#link-to-deployed-application)\n` : "";

        let displayRepo = input.repoConfirm ? `## Link to GitHub Repo\n\n${input.repo}\n\n` : "";
        let repoToC = input.repoConfirm ? `* [Link to GitHub Repo](#link-to-github-repo)\n` : "";

        // Display all inputted information on README file
        fs.writeFile("README.md", 

        // Title✅ Table of Contents✅ Description✅✅ Usage✅ Installation✅✅ Deployed link✅✅ GitHub link✅✅ Pictures✅✅ License✅Contributors✅✅ Questions✅✅ 
        `# ${input.projName}\n\n## Table of Contents:\n\n* [Description](#description)\n* [Usage](#usage)\n* [Installation](#installation)\n${urlToC}${repoToC}${picToC}* [License](#license)\n${teamToC}* [Questions](#questions)\n\n## Description\n\n${input.description}\n\n## Usage\n\n${input.usage}\n\n## Installation\n\n${input.install}\n\n${displayURL}${displayRepo}${displayPic1}${displayPic2}\n\n## License\n\n![${input.license} License](https://img.shields.io/badge/License-${input.license}-blue.svg)\n\n${displayTeam}## Questions?\n\n* Send me an Email: ${input.email}\n\n* Connect through GitHub: https://github.com/${input.gitHub}\n\n`, 
        
        (err) =>
        err ? console.error(err) : console.log('README file created!'));
    })
