import { test, expect } from './fixtures';
import { UserProfilePage } from '../pages/UserProfile.page';

test('should accept valid input', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await userProfile.fillUserProfile({ firstName: 'John' });
});
