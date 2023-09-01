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

const buildReadme = ({title, description, wantInstructions, instructions, wantInstallation, installation, wantCredits, credits, license, github, email, contribution, wantLinkedin, linkedin}) => {
    var body = 

`# ${title}

## DESCRIPTION
${description}

* [Instructions](#instructions)
* [Installation](#installation)
* [Credits](#credits)
* [Contribution](#contribution)
* [License](#license)`;
    
if (wantInstructions){    
    body += `


## INSTRUCTIONS
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

body += `
## CONTRIBUTION
${contribution}

## LICENSE
${license}

# CONTACT
* Github: ${github}
* E-mail: ${email}`
    
if(wantLinkedin){
    body += `
* Linkedin ${linkedin}


This file was generated by Easy Readme Generator
`}
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