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
(0, test_1.test)('Verify password rejects less than minimum characters (e.g., 6)', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    const userProfile = new UserProfile_page_1.UserProfilePage(page);
    yield page.goto('https://qa-assessment.pages.dev/');
    // Listen for the alert dialog and validate its message
    let dialogMessage = "";
    page.once('dialog', (dialog) => __awaiter(void 0, void 0, void 0, function* () {
        dialogMessage = dialog.message();
        console.log(`Dialog message received: ${dialogMessage}`);
        yield dialog.dismiss(); // Dismiss the alert
    }));
    // Fill the form with invalid last name, keep others valid
    yield (0, fillUserProfile_1.fillUserProfile)(userProfile, { password: "P@ssw0rd!", confirmPassword: "" });
    yield (0, test_1.expect)(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    yield page.getByRole('button', { name: 'Submit' }).click();
    // Wait a short time to ensure dialog is processed
    yield page.waitForTimeout(1000);
    // Assert the expected message
    (0, test_1.expect)(dialogMessage).toContain("Confirm password must be filled out");
}));
