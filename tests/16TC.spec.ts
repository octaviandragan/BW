import { test, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify password must match confirm password field', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with different password/confirmedPassword`);
    // Fill in the password / confirmPassword with different values
    await fillUserProfile(userProfile, { password: "WrongPass", confirmPassword: "P@ssw0rd!" });
    //Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting an error dialog with a specific message)
    await assertDialogOrSuccess(page, "dialog", "Passwords do not match");
    })   