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
(0, test_1.test)('Verify email does not accept an invalid format', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    const userProfile = new UserProfile_page_1.UserProfilePage(page);
    yield page.goto('https://qa-assessment.pages.dev/');
    // Fill the form with invalid email, keep others valid
    yield (0, fillUserProfile_1.fillUserProfile)(userProfile, { email: "john.smith.com" });
    yield (0, test_1.expect)(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    yield page.getByRole('button', { name: 'Submit' }).click();
    // Capture the validation message on the email input field
    const emailInput = page.locator('#email');
    const validationMessage = yield emailInput.evaluate((input) => input.validationMessage);
    console.log(`Validation message: ${validationMessage}`);
    // Assert the expected validation message
    (0, test_1.expect)(validationMessage).toContain("Please include an '@' in the email address.");
}));
