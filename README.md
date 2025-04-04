# H1 QA Automation for BW

## H2 The tests cover scenarios outlined in the provided user story and test cases.

### H3 Setup Instructions

For a local setup (download zip file) Playwright and TypeScript are required.

To set up and run the automated tests locally, follow these steps:

Clone the repository:

git clone <repository_url>
cd repository name
Install dependencies:

npm install
Configure test environment:

tsconfig.json, fixtures.ts and utils contain the dependencies (but they are already set up)

### H4 Run the tests:

Run tests on UI bash npx playwright test --ui 

OR 

tests can run both headlessly and with reporter html and a report can be generated.

To run and get a report:

edit package.json to contain:

"scripts": {
  "test": "playwright test --reporter=html"
}

commit to your Project

### H5 Reporting

In the current - headless mode, a report can be found in the git actions;

If you're looking for a downloadable report, follow the steps above to configure reporter and you will find your report in playwright-report/ as it is already configured;

Important note for failed TCs:

You will find a brief explanation in the first 3 lines of the output, the rest is info available for debugging.

### H6 Project Structure:

The project structure follows the Page Object Model (POM) design pattern for organizing test automation code:

tests/: Contains test scripts written using Playwright/TypeScript to automate test cases.
pages/: Contains a page object representing the userProfile page.
tsconfig.json: Configuration file for specifying test environment settings.
package.json: Node.js package configuration file with dependencies and scripts.
utils/: Contains utility functions used across the test scripts - fillUserProfile.ts containing default state of correct data; assertDialogOrSuccess.ts - an assessment function that encompasses all 3 possible outcomes of data submission within this form.
Fixtures/: Contains text to be asserted and test data to be used across the test scripts.

### H7 Make sure the system allows running scripts (for Win):
Windows: run the following code in Windows PowerShell (admin): Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
On macOS and Linux, this issue with execution policies (like in PowerShell) does not occur.

### H8 Note:

There is a total of 31 test cases, written in a brief manner, making use of fixtures to rapidly import all dependencies, as well as a special assessment function developed specifically for the 3 types of feedback loops provided by the tested webapp - A success message, an informational dialogue and a inline validation message for fields.
A default state for the correct input for fields is found in the fillUserProfile.ts file under utils. Defaults are declared in the UserProfile page.

Each is handled independently and the outcome is logged by this function.

