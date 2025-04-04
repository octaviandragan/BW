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
(0, test_1.test)('Verify first name accepts valid alphabetical input', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    const userProfile = new UserProfile_page_1.UserProfilePage(page);
    yield page.goto('https://qa-assessment.pages.dev/');
    // Fill the form with invalid first name, keep others valid
    yield (0, fillUserProfile_1.fillUserProfile)(userProfile, { lastName: "Smith" });
    yield (0, test_1.expect)(page.getByRole('button', { name: 'Submit' })).toBeVisible();
    yield page.getByRole('button', { name: 'Submit' }).click();
    // Wait for the form submission request
    yield Promise.all([
        page.waitForLoadState('networkidle'), // Ensures page is fully reloaded
    ]);
    console.log('✅ Page reloaded after submission');
}));
