import { test, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify first name accepts valid alphabetical input', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with a valid first name`);
    // Fill in the user profile field with a valid first name (John) - defaulted from fillUserProfile in this TC
    await fillUserProfile(userProfile);
    //Click submit:
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting a success message)
    await assertDialogOrSuccess(page, "success", "Profile successfully created");
    })