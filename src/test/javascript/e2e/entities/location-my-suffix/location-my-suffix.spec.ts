import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { LocationComponentsPage, LocationUpdatePage } from './location-my-suffix.page-object';

describe('Location e2e test', () => {
    let navBarPage: NavBarPage;
    let locationUpdatePage: LocationUpdatePage;
    let locationComponentsPage: LocationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Locations', () => {
        navBarPage.goToEntity('location-my-suffix');
        locationComponentsPage = new LocationComponentsPage();
        expect(locationComponentsPage.getTitle()).toMatch(/Locations/);
    });

    it('should load create Location page', () => {
        locationComponentsPage.clickOnCreateButton();
        locationUpdatePage = new LocationUpdatePage();
        expect(locationUpdatePage.getPageTitle()).toMatch(/Create or edit a Location/);
        locationUpdatePage.cancel();
    });

    it('should create and save Locations', () => {
        locationComponentsPage.clickOnCreateButton();
        locationUpdatePage.setStreetAddressInput('streetAddress');
        expect(locationUpdatePage.getStreetAddressInput()).toMatch('streetAddress');
        locationUpdatePage.setPostalCodeInput('postalCode');
        expect(locationUpdatePage.getPostalCodeInput()).toMatch('postalCode');
        locationUpdatePage.setCityInput('city');
        expect(locationUpdatePage.getCityInput()).toMatch('city');
        locationUpdatePage.setStateProvinceInput('stateProvince');
        expect(locationUpdatePage.getStateProvinceInput()).toMatch('stateProvince');
        locationUpdatePage.countrySelectLastOption();
        locationUpdatePage.save();
        expect(locationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
