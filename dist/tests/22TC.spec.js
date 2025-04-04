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
const assertDialogOrSuccess_1 = require("../utils/assertDialogOrSuccess");
(0, test_1.test)('Verify date of birth does not accept future dates', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
    const userProfile = new UserProfile_page_1.UserProfilePage(page);
    yield page.goto('https://qa-assessment.pages.dev/');
    console.log(`Testing form submission with a future Date of Birth: 2099-01-01`);
    // Fill the form with a future Date of Birth
    yield (0, fillUserProfile_1.fillUserProfile)(userProfile, { dob: "2099-01-01" });
    // Click submit
    yield page.getByRole('button', { name: 'Submit' }).click();
    // Assert the expected behavior
    yield (0, assertDialogOrSuccess_1.assertDialogOrSuccess)(page, "Date of Birth cannot be in the future");
}));
