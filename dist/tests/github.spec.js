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
const fixtures_1 = require("../fixtures");
const UserProfile_page_1 = require("../pages/UserProfile.page");
fixtures_1.test.describe('GitHub URL Field Tests', () => {
    let userProfile;
    fixtures_1.test.beforeEach((_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        yield page.goto('https://your-test-url.com');
        userProfile = new UserProfile_page_1.UserProfilePage(page);
    }));
    (0, fixtures_1.test)('should accept a valid GitHub URL', () => __awaiter(void 0, void 0, void 0, function* () {
        yield userProfile.fillUserProfile({ gitHub: 'https://github.com/johnsmith' });
        yield userProfile.submitForm();
        yield (0, fixtures_1.expect)(userProfile.errorMessages).not.toBeVisible();
    }));
    (0, fixtures_1.test)('should reject an invalid GitHub URL', () => __awaiter(void 0, void 0, void 0, function* () {
        yield userProfile.fillUserProfile({ gitHub: 'github.com/johnsmith' });
        yield userProfile.submitForm();
        const errors = yield userProfile.getErrorMessages();
        (0, fixtures_1.expect)(errors).toContain('Invalid GitHub URL format');
    }));
});
