import { test, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify password is rejected if blank', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with an blank password`);
    // Fill in the password field with a blank psk
    await fillUserProfile(userProfile, { password: "" });
    //Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting an error dialog with a specific message)
    await assertDialogOrSuccess(page, "dialog", "Password must be filled out");
    })   