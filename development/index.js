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
                "Zlib"],
            default: "MIT"
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

        let displayRepo = input.repoConfirm ? `## Link to GitHub Repo\n\n${input.url}\n\n` : "";
        let repoToC = input.repoConfirm ? `* [Link to GitHub Repo](#link-to-github-repo)\n` : "";

        
        // if (input.license === 'MIT') {
        //     licenseBadge = `[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)`;
        // } else if (input.license === 'Apache 2.0') {
        //     return `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
        // } else if (linput.icense === 'Boost Software License 1.0') {
        //     return `[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`;
        // } else if (input.license === 'BSD 3-Clause') {
        //     return `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
        // } else if (input.license === 'BSD 2-Clause') {
        //     return `[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`;
        // } else if (input.license === 'CC0-1.0') {
        //     return `[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)`;
        // } else if (input.license === 'CC BY 4.0') {
        //     return `[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)`;
        // } else if (input.license === 'CC BY-SA 4.0') {
        //     return `[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)`;
        // } else if (input.license === 'CC BY-NC 4.0') {
        //     return `[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)`;
        // } else if (input.license === 'CC BY-ND 4.0') {
        //     return `[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC%20BY--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)`;
        // } else if (input.license === 'CC BY-NC-SA 4.0') {
        //     return `[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)`;
        // } else if (input.license === 'CC BY-NC-ND 4.0') {
        //     return `[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)`;
        // } else if (input.license === 'Eclipse Public License 1.0') {
        //     return `[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`;
        // } else if (input.license === 'GNU GPL v3') {
        //     return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
        // } else if (input.license === 'GNU GPL v2') {
        //     return `[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)`;
        // } else if (input.license === 'GNU AGPL v3') {
        //     return `[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)`;
        // } else if (input.license === 'GNU LGPL v3') {
        //     return `[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)`;
        // } else if (input.license === 'GNU FDL v1.3') {
        //     return `[![License: FDL 1.3](https://img.shields.io/badge/License-FDL%20v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)`;
        // } else if (input.license === 'IPL 1.0') {
        //     return `[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)`;
        // } else if (input.license === 'ICL') {
        //     return `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`;
        // } else if (input.license === 'MPL 2.0') {
        //     return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
        // } else if (input.license === 'Open Data Commons Attribution') {
        //     return `[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)`;
        // } else if (input.license === 'ODbL') {
        //     return `[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)`;
        // } else if (input.license === 'PDDL') {
        //     return `[![License: PDDL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)`;
        // } else if (input.license === 'Artistic-2.0') {
        //     return `[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)`;
        // } else if (input.license === 'Open Font-1.1') {
        //     return `[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL%201.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)`;
        // } else if (input.license === 'Unlicense') {
        //     return `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`;
        // } else if (input.license === 'WTFPL') {
        //     return `[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)`;
        // } else if (input.license === 'Zlib') {
        //     return `[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)`;
        // }
    
        

        // Display all inputted information on README file
        fs.writeFile("README.md", 

        // Title✅ Table of Contents✅ Description✅✅ Usage✅ Installation✅✅ Deployed link✅✅ GitHub link✅✅ Pictures✅✅ Contributors✅✅ Questions✅ ✅ License✅✅
        `# ${input.projName}\n\n## Table of Contents:\n\n* [Description](#description)\n* [Usage](#usage)\n* [Installation](#installation)\n${urlToC}${repoToC}${picToC}${teamToC}* [Questions](#questions)\n* [License](#license)\n\n## Description\n\n${input.description}\n\n## Usage\n\n${input.usage}\n\n## Installation\n\n${input.install}\n\n${displayURL}${displayRepo}${displayPic1}${displayPic2}## License\n\n${input.license}\n\n${displayTeam}## Questions?\n\n* Send me an Email: ${input.email}\n\n* Connect through GitHub: https://github.com/${input.gitHub}\n\n`, 
        
        (err) =>
        err ? console.error(err) : console.log('README file created!'))
    })