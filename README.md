# QA Automation for BW

## The tests cover scenarios outlined in the provided user story and test cases.

### Setup Instructions

For a local setup (download zip file) Playwright and TypeScript are required.

To set up and run the automated tests locally, follow these steps:

Clone the repository:

git clone <repository_url>
cd repository name
Install dependencies:

npm install
Configure test environment:

tsconfig.json, fixtures.ts and utils contain the dependencies (but they are already set up)

### Run the tests:

Run tests on UI bash npx playwright test --ui 

OR 

tests can run both headlessly and with reporter html and a report can be generated.

To run and get a report:

edit package.json to contain:

"scripts": {
  "test": "playwright test --reporter=html"
}

commit to your Project

### Reporting

In the current - headless mode, a report can be found in the git actions;

If you're looking for a downloadable report, follow the steps above to configure reporter and you will find your report in playwright-report/ as it is already configured;

### Project Structure:

The project structure follows the Page Object Model (POM) design pattern for organizing test automation code:

tests/: Contains test scripts written using Playwright/TypeScript to automate test cases.
pages/: Contains a page object representing the userProfile page.
tsconfig.json: Configuration file for specifying test environment settings.
package.json: Node.js package configuration file with dependencies and scripts.
utils/: Contains utility functions used across the test scripts - fillUserProfile.ts containing default state of correct data; assertDialogOrSuccess.ts - an assessment function that encompasses all 3 possible outcomes of data submission within this form.
Fixtures/: Contains text to be asserted and test data to be used across the test scripts.

## Documentation

assertDialogOrSuccess signature:

await assertDialogOrSuccess(
  page,                      // Playwright page object
  expectedOutcome,           // "success" | "dialog" | "validation"
  expectedValidationMessage, // Message expected in dialog or validation (optional for "success")
  inputSelector              // Required ONLY for "validation" (e.g., "#email")
);

1. Success Message: await assertDialogOrSuccess(page, "success");
2. Dialog Message: await assertDialogOrSuccess(page, "dialog", "Please fill out all required fields");
3. Validation Message (HTML5 inline validation) await assertDialogOrSuccess(page, "validation", "Please enter a valid email address", "#email");

Important note for failed TCs:

You will find a brief explanation in the first 3 lines of the output, the rest is info available for debugging.

For example: TC08 fails:
  1) tests/08TC.spec.ts:3:5 › Verify last name is mandatory ────────────────────────────────────────

    Error: ❌ Expected dialog message to contain: "Last name must be filled out" but got: "First name must be filled out". Test FAILS!
	
	Here it can be seen that we're expecting a dialog message, but getting another, therefore the test fails.

### Make sure the system allows running scripts (for Win):
Windows: run the following code in Windows PowerShell (admin): Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
On macOS and Linux, this issue with execution policies (like in PowerShell) does not occur.

### Challenges and limitations during automation:

Web application inconsistencies: 

The way the app responds to input of whatever field varies from case to case and does not provide a suitable baseline in order to properly focus on one outcome per type of input, or otherwise grouping any of them together.
For example, an invalid First Name might throw a dialog modal, whereas an invalid Last Name, might throw a validation message.
The way I approached this is setting up a larger function that can assess and respond to all 3 of those possible scenarios, allowing in the same time, within the test, to pick the expected outcome and determine based on that if the TC passes or fails.
This way, we gracefully handle all possible scenarios while maintaining a clean and neat test case code.

The other big challenge was the fact that the success scenario triggers directly with the click Submit action, which caused my initial assessing function to fail to grab the Success response, this meant that page.locator('.success') wasn't reliable.
The fix: introducing a MutationObserver that starts watching the DOM immediately for .success elements before any potential reload.
After a brief wait, the flag is retrieved in Node context and if success is detected, the message is grabbed for logging and/or validation.

A very interesting side-efect of this quick trigger of the success message, was that in the initial TCs targeting this scenario, the wait implemented after clicking Submit, made it impossible for the assessment function to properly catch the success element.
Removing the wait from all tests on this action fixed the problem.

The last - relatively small challenge was that the validation message is an HTML5 inline validation, therefore a bit harder to catch, as the CSS selector must be declared when calling the assertion function as described in the Documentation.

### Note:

There is a total of 31 test cases, written in a brief manner, making use of fixtures to rapidly import all dependencies, as well as a special assessment function developed specifically for the 3 types of feedback loops provided by the tested webapp - A success message, an informational dialogue and a inline validation message for fields.
A default state for the correct input for fields is found in the fillUserProfile.ts file under utils. Defaults are declared in the UserProfile page.

Each is handled independently and the outcome is logged by this function.


