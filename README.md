# Webpack Starter Kit

## Clone This Repo

That's right, _clone_ not fork. You will use this repo multiple times, but you can only fork a repository once. So here is what you need to do to clone the repo and still be able to push changes to your repo:

1. Clone down this repo. Since you don't want to name your project "webpack-starter-kit", you can use an optional argument when you run `git clone` (you replace the `[...]` with the terminal command arguments): `git clone [remote-address] [what you want to name the repo]`
1. Remove the default remote: `git remote rm origin` (notice that `git remote -v` not gives you back nothing)
1. Create a new repo on GitHub with the name of `[what you want to name the repo]` to be consistent with naming
1. Copy the address that you would use to clone down this repo - something like `git@github.com:...`
1. Add this remote to your cloned down repo: `git remote add origin [address you copied in the previous step]` - do not include the brackets

Now try to commit something (just add a line in the README) and push it up to your new repo. If everything is setup correctly, you should see the changes on GitHub.

## Setup

After one person has gone through the steps of cloning down this repo and editing the remote, everyone should clone down the repo.

Then install the library dependencies. Run:

```bash
npm install
```

To verify that it is setup correctly, run `npm start` in your terminal. Go to `http://localhost:8080/` and you should see a page with the Turing logo image and a beautiful gradient background. If that's the case, you're good to go. Enter `control + c` in your terminal to stop the server at any time.

## Where to Add Your Code

### JavaScript

You have to be very intentional with where you add your feature code. This repo uses a tool called [webpack](https://webpack.js.org/) to combine many JavaScript files into one big file. Webpack enables you to have many, separate JavaScript files to keep your code organized and readable. Webpack expects all of your code files to be in a specific place, or else it doesn't know how to combine them all behind the scenes.

**Create all of your feature code files in the `src` directory.**

Since code is separated into multiple files, you need to use the `import` and `export` syntax to share code across file.

Here is a video that walks through some information about [import and export](https://www.youtube.com/watch?v=_3oSWwapPKQ). There are a lot of resources out there about `import` and `export`, and resources will sometimes call them `ES6 modules`. It's something you will see in React and beyond.

### HTML

Add the HTML you need in the `index.html` file in the `./dist` directory. There is some boilerplate HTML that exists from the start that you can modify.

### Images

Add your image files in the `src/images` directory. Similar to CSS files, you need to `import` image files in the JavaScript entry file (`scripts.js`). Then go into the HTML and add an `img` element with the `src` attribute pointing to the `images` directory. There is an example in the `index.html` file for you to see.

## How to View Your Code in Action

In the terminal, run:

```bash
npm start
```

You will see a bunch of lines output to your terminal. One of those lines will be something like:

```bash
Project is running at http://localhost:8080/
```

Go to `http://localhost:8080/` in your browser to view your code running in the browser.

---

## Test Files Organization

Similar to feature code, your test code needs to be put in a specific place for it to run successfully.

**Put all of your test files in the `test` directory.** As a convention, all test filenames should end with `-test.js`. For instance: `box-test.js`.

## Running Your Tests

Run your test suite using the command:

```bash
npm test
```

The test results will output to the terminal.

---

## Linting Your Code

Run the command in your terminal `npm run lint` to run the linter on your JavaScript code. There will be errors and warnings right from the start in this starter kit - the linter is still running successfully.

Your linter will look at the JavaScript files you have within the `src` directory and the `test` directory.

## Webpack?

If you look in the `package.json` file, you'll see one of the library dependencies called `webpack`. If you're interested in learning more about what Webpack is and how it works behind the scenes, take a look through the [Webpack configuration documentation](https://webpack.js.org/concepts/).

## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.







# FitLit

### Abstract:
This application helps users see their fitness data, goals, and milestones in a user-friendly activity dashboard. The user data is sourced remotely and accessed through an API. It also allows an admin to view any individual's data, as well as a few key "bottom 10" data sets.

### App Installation Instructions:
1. To get this app running, navigate to https://github.com/ericahagle/fitlit and clone it down from GitHub under the "<> Code" dropdown. 
2. Open it from your terminal or preferred CLI with `git clone <HTTPS or SSH key>`. 
3. Move (`cd`) into the directory. 
4. Open the file in your code editor of choice, and you'll have everything you need! 
5. The app can be viewed and interacted with in your browser of choice by using `open index.html` in your terminal.

### Server Installation Instructions:
1. Navigate to https://github.com/turingschool-examples/fitlit-api
2. Clone the repo down to your preferred location (NOT within the main app repo)
3. Move (`cd`) into the directory on a separate terminal window from where you're running the front end
4. Run the `npm install` command to install the dependencies
5. Run the `npm start` command in your terminal to start the local server
6. Use `ctrl + c` to stop the local server from running in your terminal at any time

### Preview of App:
![page reload to show functionality](https://user-images.githubusercontent.com/139941423/277834199-d4c02f00-08c3-45a2-ba62-9c969026d29c.gif)

### Context:
This project was assigned during Week 1 of Module 2 in Turing's Front-End Engineering track. Part 1 of 2 had a timeline of 11 days from kickoff to due date. Part 2 was assigned during Week 4 of Module 2, and had a timeline of 5 days from kickoff to due date.

### Contributors:
This application was built by: [Chris Butler](https://github.com/butlertree/)

### Learning Goals:
The goals of this project were to:
- utilize object and array prototype methods to manipulate data
- create a clear and user-friendly interface
- implement a robust testing suite via TDD
- make network requests to retrieve data
- prioritize DRY, reusable code
- practice professional and productive team collaboration

These were enacted on a MacBook Pro using GitHub, VS Code, Webpack, Google Chrome, the Mac Terminal, and Slack.

### Wins + Challenges:
### Wins:
- Consistent communication and respect for our DTR agreement
- Successfully refactored code to overcome challenges and match project rubric
- Utilizing individual strengths to divide workflow
### Challenges:
- Figuring out how to efficiently connect all the separate local files and APIs while working asynchronously 
- Getting comfortable and confident as a team in our GitHub workflow