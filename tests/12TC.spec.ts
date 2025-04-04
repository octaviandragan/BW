import { test, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify password accepts valid format', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with a valid password`);
    // Fill in the password field with a valid psk - defaulted from fillUserProfile in this TC
    await fillUserProfile(userProfile);
    //Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting a success message)
    await assertDialogOrSuccess(page, "success", "Profile successfully created");
    })