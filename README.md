# eCommerce-Application

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