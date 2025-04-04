import { test, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify email rejects invalid format', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with an invalid email`);
    // Fill in the user profile field with an invalid email
    await fillUserProfile(userProfile, { email: "john.smith.com" });
    //Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting an error dialog with a specific message)
    await assertDialogOrSuccess(page, "validation", "Please include an '@' in the email address", "#email");
    }) 