// Title✅ 
// Table of Contents✅ 
// License✅
// Description✅
// Usage✅
// Installation✅
// Deployed link✅
// GitHub link✅
// Pictures✅
// Questions & Contributors✅


// Modules
const inquirer = require("inquirer");
// console.log (inquirer);
const fs = require("fs");

// Begin inquirer at start of running node
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
            type: "list",
            message: "What type of license is this project using?",
            name: "license",
            default: "MIT",
            choices: [
                "MIT",
                "Apache_2.0",
                "BSD_3Clause",
                "BSD_2Clause",
                "GNU_GPL_v3",
                "GNU_LGPL_v3",
                "MPL_2.0",
                "CDDL_1.0",
                "Eclipse_Public_License_1.0",
            ]
        },
        {
            type: "confirm",
            message: "Do you have a SCREENSHOT of your deployed application?",
            name: "picConfirm",
            default: false
        }, 
    ])
    .then((input) => {
        // console.log(input)
        // Declare variables to nest in template literal
        let displayURL = input.urlConfirm ? `## Link to Deployed Application\n\n${input.url}\n\n` : "";
        let urlToC = input.urlConfirm ? `* [Link to Deployed Application](#link-to-deployed-application)\n` : "";

        let displayRepo = input.repoConfirm ? `## Link to GitHub Repo\n\n${input.repo}\n\n` : "";
        let repoToC = input.repoConfirm ? `* [Link to GitHub Repo](#link-to-github-repo)\n` : "";
        
        let picToC = input.picConfirm ? `* [Screenshots](#screenshots)\n`: "";
        let picHeader = input.picConfirm ? `## Screenshot(s)\n\n`: "";
        
        // Display all inputted information on README file
        fs.writeFile("README.md", 
        `# ${input.projName}\n\n## Table of Contents:\n\n* [Description](#description)\n* [Usage](#usage)\n* [Installation](#installation)\n${urlToC}${repoToC}${picToC}* [Questions](#questions)\n\n[![${input.license} License](https://img.shields.io/badge/License-${input.license}-blue.svg)](https://opensource.org/licenses/)\n\n## Description\n\n${input.description}\n\n## Usage\n\n${input.usage}\n\n## Installation\n\n${input.install}\n\n${displayURL}${displayRepo}${picHeader}`, 
        (err) => err ? console.error(err) : "" );
        
        if (input.picConfirm === true) {
            picturePrompts();
        } else {
            contactPrompts();
        }
    })

// Function to ask about pictures
function picturePrompts() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter the FILE PATH or URL to the screenshot image:",
                name: "pic",
            },
            {
                type: "input",
                message: "Please enter ALT TEXT for this photo:",
                name: "pictext",
            },
            {
                type: "confirm",
                message: "Do you have a ANOTHER SCREENSHOT of your deployed application?",
                name: "picConfirm2",
                default: false
            },      
        ])
        .then((input) => {
            // Add pic to README file
            fs.appendFile("README.md",
            `![${input.pictext}](${input.pic})\n\n`,
            (err) => err ? console.error(err) : "");
            
            if (input.picConfirm2 === true) {
                picturePrompts();
            } else {
                contactPrompts();
            }
        })
}

function contactPrompts() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your FULL NAME?",
                name: "name",
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
        ])
        .then((input) => {
            // Add user contact info to README
            fs.appendFile("README.md",
            `## Questions\n\nAny additional questions about this project? Please feel free to reach out:\n\n${input.name}\n* Email: ${input.email}\n* GitHub: https://github.com/${input.gitHub}\n\n`,
            (err) => err ? console.error(err) : "" );

            contributorPrompt();
        })
}

function contributorPrompt() {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Were there CONTRIBUTORS to this project?",
                name: "teamConfirm",
                default: false
            }
        ])
        .then((input) => {
            if (input.teamConfirm === true) {
                teamPrompts();
            } else {
                console.log('README file comnplete!')
            }
        })
}

function teamPrompts() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the FULL NAME of the CONTRIBUTOR? (Please list only 1 name; You may add more contributors later):",
                name: "name",          
            },
            {
                type: "confirm",
                message: "Do you want to add this person's EMAIL address?",
                name: "emailConfirm",
            },
            {
                type: "input",
                message: "What is this person's EMAIL address?",
                name: "email",
                when: (input) => input.emailConfirm === true,
            },
            {
                type: "confirm",
                message: "Do you want to add this person's GITHUB profile?",
                name: "gitHubConfirm",
            },
            {
                type: "input",
                message: "What is this person's GITHUB USERNAME?",
                name: "gitHub",
                when: (input) => input.gitHubConfirm === true,
            },
            {
                type: "confirm",
                message: "Were there any ADDITIONAL CONTRIBUTORS to this project?",
                name: "teamConfirm2",
            }
            
        ])
        .then((input) => {
            let displayEmail = input.emailConfirm ? `* Email: ${input.email}\n` : "";
            let displayGitHub = input.gitHubConfirm ? `* GitHub: https://github.com/${input.gitHub}\n` : "";

            
            // Add additional contributors' (if any) contact information to README
            fs.appendFile("README.md",
            `${input.name}\n${displayEmail}${displayGitHub}\n`,
            (err) => err ? console.error(err) : "" );

            if (input.teamConfirm2 === true) {
                teamPrompts();
            } else {
                console.log('README file comnplete!')
            }
        })
}
