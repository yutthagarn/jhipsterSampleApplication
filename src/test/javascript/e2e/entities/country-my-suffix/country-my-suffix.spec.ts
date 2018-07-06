import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CountryComponentsPage, CountryUpdatePage } from './country-my-suffix.page-object';

describe('Country e2e test', () => {
    let navBarPage: NavBarPage;
    let countryUpdatePage: CountryUpdatePage;
    let countryComponentsPage: CountryComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Countries', () => {
        navBarPage.goToEntity('country-my-suffix');
        countryComponentsPage = new CountryComponentsPage();
        expect(countryComponentsPage.getTitle()).toMatch(/Countries/);
    });

    it('should load create Country page', () => {
        countryComponentsPage.clickOnCreateButton();
        countryUpdatePage = new CountryUpdatePage();
        expect(countryUpdatePage.getPageTitle()).toMatch(/Create or edit a Country/);
        countryUpdatePage.cancel();
    });

    it('should create and save Countries', () => {
        countryComponentsPage.clickOnCreateButton();
        countryUpdatePage.setCountryNameInput('countryName');
        expect(countryUpdatePage.getCountryNameInput()).toMatch('countryName');
        countryUpdatePage.regionSelectLastOption();
        countryUpdatePage.save();
        expect(countryUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
