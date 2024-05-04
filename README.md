# eCommerce-Application

## <a id="description">Project description</a>

#### Using technologies:

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