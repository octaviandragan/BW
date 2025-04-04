import { test, expect, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify date of birth does not accept future dates', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with a future Date of Birth: 2099-01-01`);
    // Fill the form with a future Date of Birth
    await fillUserProfile(userProfile, { dob: "2099-01-01" });
    // Verify that the correct date is entered
    await expect(page.locator('#dob')).toHaveValue("2099-01-01");
    // Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting an error dialog with a specific message)
    await assertDialogOrSuccess(page, "dialog", "Date of Birth cannot be in the future");
    })