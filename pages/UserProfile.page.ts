import { Page, Locator } from '@playwright/test';

export class UserProfilePage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly genderMale: Locator;
    readonly genderFemale: Locator;
    readonly genderPreferNotToSay: Locator;
    readonly dob: Locator;
    readonly phone: Locator;
    readonly address: Locator;
    readonly linkedIn: Locator;
    readonly gitHub: Locator;
    readonly submitButton: Locator;
    readonly errorMessages: Locator;

    constructor(page: Page) {
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

    async fillUserProfile(data: {
        firstName?: string,
        lastName?: string,
        email?: string,
        password?: string,
        confirmPassword?: string,
        gender?: 'male' | 'female' | 'preferNotToSay',
        dob?: string,
        phone?: string,
        address?: string,
        linkedIn?: string,
        gitHub?: string
    }) {
        if (data.firstName) await this.firstName.fill(data.firstName);
        if (data.lastName) await this.lastName.fill(data.lastName);
        if (data.email) await this.email.fill(data.email);
        if (data.password) await this.password.fill(data.password);
        if (data.confirmPassword) await this.confirmPassword.fill(data.confirmPassword);
        if (data.gender) {
            switch (data.gender) {
                case 'male':
                    await this.genderMale.check();
                    break;
                case 'female':
                    await this.genderFemale.check();
                    break;
                case 'preferNotToSay':
                    await this.genderPreferNotToSay.check();
                    break;
            }
        }

        if (data.dob) await this.dob.fill(data.dob);
        if (data.phone) await this.phone.fill(data.phone)
        if (data.address) await this.address.fill(data.address);
        if (data.linkedIn) await this.linkedIn.fill(data.linkedIn);
        if (data.gitHub) await this.gitHub.fill(data.gitHub);
        }
        
    }