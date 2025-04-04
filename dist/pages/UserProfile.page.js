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
exports.UserProfilePage = void 0;
class UserProfilePage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        this.confirmPassword = page.locator('#confirmPassword');
        this.genderMale = page.locator('#male');
        this.genderFemale = page.locator('#female');
        this.genderPreferNotToSay = page.locator('#preferNotToSay');
        this.dob = page.locator('#dob');
        this.phone = page.locator('#phone');
        this.address = page.locator('#address');
        this.linkedIn = page.locator('#linkedIn');
        this.gitHub = page.locator('#github');
        this.submitButton = page.locator('input[type="submit"]');
        this.errorMessages = page.locator('.error-message');
    }
    fillUserProfile(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.firstName)
                yield this.firstName.fill(data.firstName);
            if (data.lastName)
                yield this.lastName.fill(data.lastName);
            if (data.email)
                yield this.email.fill(data.email);
            if (data.password)
                yield this.password.fill(data.password);
            if (data.confirmPassword)
                yield this.confirmPassword.fill(data.confirmPassword);
            if (data.gender) {
                switch (data.gender) {
                    case 'male':
                        yield this.genderMale.check();
                        break;
                    case 'female':
                        yield this.genderFemale.check();
                        break;
                    case 'preferNotToSay':
                        yield this.genderPreferNotToSay.check();
                        break;
                }
            }
            if (data.dob)
                yield this.dob.fill(data.dob);
            if (data.phone)
                yield this.phone.fill(data.phone);
            if (data.address)
                yield this.address.fill(data.address);
            if (data.linkedIn)
                yield this.linkedIn.fill(data.linkedIn);
            if (data.gitHub)
                yield this.gitHub.fill(data.gitHub);
        });
    }
}
exports.UserProfilePage = UserProfilePage;
