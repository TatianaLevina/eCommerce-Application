# <a id="description">eCommerce-Application 🛍️🌐</a>

Welcome to our app for shopping and enjoying your free time! This platform replicates real-world shopping experiences in a digital environment 🏪. It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence 🚀.

Users can browse through a vast range of products 📚👗👟, view detailed descriptions, add their favorite items to the basket 🛒, and proceed to checkout 💳. It includes features such as user registration and login 📝🔐, product search 🔍, product categorization, and sorting to make the shopping experience more streamlined and convenient.

An important aspect of our application is that it's responsive 📲, ensuring it looks great on various devices with a minimum resolution of 390px. This feature makes the shopping experience enjoyable, irrespective of the device users prefer.

Key pages in the application include:

- Login and Registration pages 🖥️
- Main page 🏠
- Catalog Product page 📋
- Detailed Product page 🔎
- User Profile page 👤
- Basket page 🛒
- About Us page 🙋‍♂️🙋‍♀️

The application is powered by CommerceTools 🌐, a leading provider of commerce solutions for B2C and B2B enterprises. CommerceTools offers a cloud-native, microservices-based commerce platform that enables brands - to create unique and engaging digital commerce experiences.

## Using technologies:

We use <img src="https://e7.pngegg.com/pngimages/993/887/png-clipart-commercetools-gmbh-application-programming-interface-e-commerce-business-marketing-commercetools-gmbh-application-programming-interface.png" alt="" style="width: 20px; height: 16px;"> [CommerceTools](https://commercetools.com/) as a backend. It is the leading composable commerce platform for speed, simplicity and scalability.

We are using the <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" alt="" style="width: 20px; height: 16px;"> [React](https://react.dev/) to set up and build the project, it is a modern, fast and efficient tool.

For routing we use the library <img src="https://cdn.freebiesupply.com/logos/large/2x/react-router-logo-png-transparent.png" alt="" style="width: 24px; height: 16px;"> [React Router](https://reactrouter.com/en/main). It complements React perfectly and works great for small projects.

We use <img src="https://vitejs.dev/logo.svg" alt="" style="width: 16px; height: 16px;"> [Vite](https://vitejs.dev/) to set up and build the project, it is a modern, fast and efficient tool.

We use <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png" alt="" style="width: 16px; height: 16px;"> [TypeScript](https://www.typescriptlang.org/) to write code because it is exceptionally good for projects and eliminates a whole category of errors at the coding stage. This saves the team time and resources.

We use the <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1280px-Sass_Logo_Color.svg.png" alt="" style="width: 16px; height: 16px;"> [SASS](https://sass-lang.com/) preprocessor because it allows us to extend the capabilities of CSS.

We use <img src="https://vitest.dev/logo-shadow.svg" alt="" style="width: 16px; height: 16px;"> [Vitest](https://vitest.dev/) to test the code base. It's easily compatible with the Vite builder, quick to set up, and has excellent documentation.

We use the <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ESLint_logo.svg/1200px-ESLint_logo.svg.png" alt="" style="width: 16px; height: 16px;"> [ESLint](https://eslint.org/) linter to check the code. It is effective and simple.

For formatting together with ESLint we use <img src="https://prettier.io/icon.png" alt="" style="width: 16px; height: 16px;"> [Prettier](https://prettier.io/). This gives an excellent effect. All code looks readable and uniform.

We use 🐶 [Husky](https://typicode.github.io/husky/) to run scripts before adding code to the repository. This ensures that the code in the repository is clean.

---

## Branch Naming Convention

In this project, we follow a specific branch naming convention to keep our Git history clean and understandable. Here's how we name our branches:

{dev_branch}/{github_username}/RSS-ECOMM-{issue_numbers}-{description}

{dev_branch}: This prefix indicates that the branch is used for development:

- dev - for sprint#1
- rel - for sprints from 2 to 4
- {github_username}: This is the GitHub username of the developer who owns the branch. For example, demetrius81.
- RSS-ECOMM: This is a constant part of the branch name specific to this project.
- {issue_numbers}: These are the numbers of the issues that the branch addresses. For example, 1_17-1_20 means the branch addresses issues 17, 20.
- {description}: This is a short description of the changes made in the branch. For example, add-comprehensive-readme or pr-template.

Here are a couple of examples:

```
dev/tlevina/RSS-ECOMM-1_21-pr-template
dev/demetrius81/RSS-ECOMM-1_17-1_20-add-comprehensive-readme
dev/tlevina/RSS-ECOMM-2_03,2_05-add-comprehensive-readme
```

This naming convention helps us quickly identify the purpose of each branch and who is responsible for it.

---

## Directories structure

```
├── /src
	├── /assets
	├── /components
		├── /Button
			└── /Button.tsx
		└── /Input
	├── /pages
		├── /Home
			└── /Home.tsx
		└── /About
			└── /About.tsx
	├── /utils
	├── /hooks
		├── /useFetch.ts
		└── /useLocalStorage.ts
	├── /App.tsx
	└── /main.tsx
└── /tests
	├── /components
		├── /Button
			└── /Button.test.ts
		└── /Input
	├── /pages
		├── /Home
			└── /Home.test.ts
		└── /About
			└── /About.test.ts
		├── /useFetch.test.ts
		└── /useLocalStorage.test.ts
	├── /App.test.tsx
	└── /main.test.tsx
```

`assets` - All the images, CSS files, font files, etc. for the project, pretty much anything that isn't code related, will be stored in this folder.

`components` - The folder will contain every component of your entire application. Our components folder is divided into subfolders. These subfolders are really useful because they help organize your components into different sections rather than just being one huge block of components.

`pages` - This folder should contain one folder for each page of our application. Inside these page-specific folders there should be one root file, which is our page, along with all the files that apply only to that page.

`utils` - This folder is intended to store all utility functions such as formatters. This is a fairly simple folder, and all the files in it should be simple as well.

`hooks` - This folder contains all the custom hooks for our your project. This is a useful folder that can be used in a project of any size, since almost every project will have multiple custom hooks, so it is very useful to have one place to put them.

`tests` - This folder follows the structure of the `/src` folder and contains unit-test files.

---

## <a id="instructions">Setup instructions</a>

1. To install the project, use one of two methods:

- download the archive ([downloading source code archives](https://docs.github.com/ru/repositories/working-with-files/using-files/downloading-source-code-archives))
- or clone the repository ([cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)).

2. Go to your project directory and run the command.

   ```bash copy
   npm install
   ```

   to install all dependencies.

3. After that, follow the instructions described in the [Document scripts](#scripts) section.

---

## <a id="scripts">Document scripts</a>

#### Starting the dev server

```bash copy
npm run dev
```

This command starts the dev server locally `http://localhost:5173/`.

---

#### Build the project for production.

```bash copy
npm run build
```

This command builds the project, compressing and minimizing the size of all files to optimize the application.
The files of the assembled project are located in the `./dist` directory.

---

#### Local preview production build

```bash copy
npm run preview
```

This command starts the local server of the assembled project to debug the final build `http://localhost:4173/`

---

#### Running code formatting

```bash copy
npm run format
```

This command starts formatting the code using prettier. It serves to ensure uniform code style across the codebase.

---

#### Run ESLint

```bash copy
npm run lint
```

This command runs a code inspection using the ESLint linter in the ./src directory.

---

#### Run ESLint and fix errors

```bash copy
npm run lint:fix
```

This command runs a code check using the ESLint linter in the ./src directory, automatically formatting the code and fixing some errors.

---

#### Run husky

```bash copy
npm run prepare
```

This is a one-time command to configure husky. It is performed at the very beginning of setting up the repository and is not needed in further work.

---

#### Starting a test server

```bash copy
npm run test
```

This command starts a test server that displays test results in the console and reruns tests if files change. This is convenient when writing tests.

---

#### Run tests with coverage report

```bash copy
npm run coverage
```

This command makes a one-time run of the test script and generates a report on the tests and code coverage of the lines of code. It runs on pre-commit and pre-push hooks.

---
