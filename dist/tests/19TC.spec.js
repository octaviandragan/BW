"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const UserProfile_page_1 = require("../pages/UserProfile.page");
const fillUserProfile_1 = require("../utils/fillUserProfile");
(0, test_1.test)('Verify form submission with different gender options', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    const userProfile = new UserProfile_page_1.UserProfilePage(page);
    yield page.goto('https://qa-assessment.pages.dev/');
    const genderOptions = ["male", "female", "preferNotToSay"];
    for (const gender of genderOptions) {
        console.log(`Testing form submission with gender: ${gender}`);
        // Fill the form with the selected gender
        yield (0, fillUserProfile_1.fillUserProfile)(userProfile, { gender });
        // Ensure the correct radio button is selected
        yield (0, test_1.expect)(page.locator(`input[name="gender"][value="${gender}"]`)).toBeChecked();
        // Click submit and wait for the page to reload
        yield Promise.all([
            page.waitForURL('https://qa-assessment.pages.dev/', { waitUntil: 'domcontentloaded' }),
            page.getByRole('button', { name: 'Submit' }).click()
        ]);
        console.log(`✅ Form submitted successfully with gender: ${gender}`);
        // Reload the page before the next iteration
        yield page.reload();
    }
}));
