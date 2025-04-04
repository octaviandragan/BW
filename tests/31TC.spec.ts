import { test, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify GitHub URL rejects invalid format', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with an invalid GitHub URL`);
    // Fill the form with an invalid GitHub URL
    await fillUserProfile(userProfile, { gitHub: "github.com/johnsmith" });
    // Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting an inline validation message from the github input field
    await assertDialogOrSuccess(page, "validation", "Please enter a URL.", "#github");
    })