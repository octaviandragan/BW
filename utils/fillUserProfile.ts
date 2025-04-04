import { UserProfilePage } from '../pages/UserProfile.page';

export async function fillUserProfile(
    userProfile: UserProfilePage,
    overrides: Partial<{ 
        firstName: string; lastName: string; email: string;
        password: string; confirmPassword: string; gender?: 'male' | 'female' | 'preferNotToSay';
        dob: string; phone: string; address: string;
        linkedIn: string; gitHub: string;
    }> = {},
    includeOptionalFields = true
) {
    // Default valid values
    const defaultData : {
        firstName: string; lastName: string; email: string;
        password: string; confirmPassword: string; gender?: 'male' | 'female' | 'preferNotToSay';
        dob: string; phone: string; address: string;
        linkedIn: string; gitHub: string;
    } = {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
        password: "P@ssw0rd123",
        confirmPassword: "P@ssw0rd123",
        gender: "male",
        dob: "1990-01-01",
        phone: "1234567890",
        address: "123 Main St, Apt 1",
        linkedIn: "https://www.linkedin.com/in/johndoe",
        gitHub: "https://github.com/johndoe"
    };

    // Apply overrides for specific tests
    const formData = { ...defaultData, ...overrides };

    // Fill required fields
    await userProfile.fillUserProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        gender:  includeOptionalFields ? formData.gender : undefined,
        dob: includeOptionalFields ? formData.dob : undefined,
        phone: includeOptionalFields ? formData.phone : undefined,
        address: includeOptionalFields ? formData.address : undefined,
        linkedIn: includeOptionalFields ? formData.linkedIn : undefined,
        gitHub: includeOptionalFields ? formData.gitHub : undefined
    });
}
