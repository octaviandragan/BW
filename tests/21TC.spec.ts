import { test, expect, UserProfilePage, fillUserProfile, assertDialogOrSuccess } from './fixtures';

test('Verify date of birth accepts a valid date', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with Date of Birth: 1990-01-01`);
    // Fill the form with a valid Date of Birth (1990-01-01) - defaulted from fillUserProfile in this TC
    await fillUserProfile(userProfile);
    // Verify that the correct date is entered
    await expect(page.locator('#dob')).toHaveValue("1990-01-01");
    // Click submit
    page.getByRole('button', { name: 'Submit' }).click();
    // Initiate the assertion function (assertDialogOrSuccess.ts from utils expecting a success message)
    await assertDialogOrSuccess(page, "success");
    })