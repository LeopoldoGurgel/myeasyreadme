// node modules
const inquirer = require('inquirer');
const fs = require('fs');

// questios genereated by inquirer
inquirer
.prompt([
    {
        type: 'input',
        message: 'What is the title of your project?',
        name: 'title',
        // validate property to check if the user provider a project title
        validate: (value) => {
            if (value) {
                return true
            } else {
                return "I need a title to continue"
            }
        }
    },
    {
        type: 'input',
        message: 'Write a description of your project',
        name: 'description',
        validate: (value) => {
            if (value) {
                return true
            } else {
                return "I need a description to continue"
            }
        }
    },
    {
        type: 'confirm',
        name: 'wantMenu',
        message: 'Do you want a table of contents on your readme?',
        default: true
    },
    {
        type: 'confirm',
        name:  'wantInstructions',
        message: 'Do you want to add instructions on how to use you application to your ReadMe file?',
        default: true
    },
    {
        type: 'editor',
        message: 'Write a list of instructions on how to use your application.',
        name: 'instructions',
        when: (answers) => answers.wantInstructions
    },
    {
        type: 'confirm',
        message: 'Do you want to add Installation instructions?',
        name: 'wantInstallation',
        default: true
    },
    {
        type: 'editor',
        message: 'Write a list steps for installing your program.',
        name: 'installation',
        when: (answers) => answers.wantInstallation
    },
    {
        type: 'confirm',
        message: 'Any credits?',
        name: 'wantCredits',
        default: true
    },
    {
        type: 'prompt',
        message: 'Write the content of your credits.',
        name: 'credits',
        when: (answers) => answers.wantCredits
    },
    {
        type: 'confirm',
        message: 'Want to welcome other developers to fork your repo and contributing to your project?',
        name: 'wantContribution',
        default: true
    },
    {
        type: 'list',
        message: 'What license type did you use?',
        name: 'license',
        choices: ['MIT license', 'GPL license', 'Apache license', 'GNU license', "N/A"],
        validate: (value) => {
            if(value) {
                return true
            } else {
                return "I need a license type to continue"
            }
        }
    },
    {
        type: 'input',
        message: 'Whats your e-mail?',
        name: 'email',
        validate: (value) => {
            if(value) {
                return true
            } else {
                return "I need your email to continue"
            }
        }
    },
    {
        type: 'input',
        message: 'Whats your Github username?',
        name: 'github',
        validate: (value) => {
            if(value) {
                return true
            } else {
                return "I need your username to continue"
            }
        }
    },
    {
        type: 'confirm',
        name: 'wantLinkedin',
        message: 'Do you want to add a Linkedin profile to your Readme?'
    },
    {
        type: 'input',
        message: 'Whats your Linkedin username?',
        name: 'linkedin',
        when: (answers) => answers.wantLinkedin,
        validate: (value) => {
            if(value) {
                return true
            } else {
                return "I need your username to continue"
            }
        }
    }
]).then((answers) => {
    buildReadme(answers);
});

const buildReadme = ({title, description, wantMenu, wantInstructions, instructions, wantInstallation, installation, wantCredits, credits, license, github, email, wantContribution, wantLinkedin, linkedin}) => {
    var body = 

`# ${title}

## DESCRIPTION
${description}`


if(wantMenu){
    body += `

## TABLE OF CONTENTS`}
if(wantMenu && wantInstructions){
    body += `
* [Usage](#instructions)`}
if(wantMenu && wantInstallation){
    body += `
* [Installation](#installation)`}
if(wantMenu && wantCredits){
    body += `
* [Credits](#credits) `
}
if(wantMenu && wantContribution){
    body += `
* [Contributing](#contribution)`}

if(wantMenu){
body +=`
* [License](#license)
* [Contact](#contact)`}




    
if (wantInstructions){    
    body += `


## USAGE
${instructions}
`}

if(wantInstallation){
    body += `


## INSTALLATION
${installation}
`}

if(wantCredits){
    body += `


## CREDITS
${credits}
`}

if(wantContribution){
body += `
## CONTRIBUTING
You are welcome to help if you have any ideas to improve our project! If you want to do so, just follow these steps:

1 - Fork the repository.  
2 - Create a new branch for you new feature or bug fix.  
3 - Make the changes you have in mind.  
4 - Commit your changes and push them to your fork.  
5 - Open a pull request detailing the changes you've made.`
}

body +=`

## LICENSE
${license}

# CONTACT
* Github: [${github}](https://github.com/${github})
* E-mail: ${email}`
    
if(wantLinkedin){
    body += `
* Linkedin ${linkedin}`}

body +=`

This file was generated by Easy Readme Generator`

    ;
    
    // function to create a new file using fs
    createNewFile(title, body);
}

function createNewFile(fileName, data) {
    //fs
    fs.writeFile(`./markdowns/${fileName.toLowerCase().split(' ').join('')}.md`, data, (err) => {
        if(err){
            console.log(err)
        }
        console.log('Your Readme has been created')
    })
}