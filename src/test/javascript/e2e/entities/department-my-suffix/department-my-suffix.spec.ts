import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { DepartmentComponentsPage, DepartmentUpdatePage } from './department-my-suffix.page-object';

describe('Department e2e test', () => {
    let navBarPage: NavBarPage;
    let departmentUpdatePage: DepartmentUpdatePage;
    let departmentComponentsPage: DepartmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Departments', () => {
        navBarPage.goToEntity('department-my-suffix');
        departmentComponentsPage = new DepartmentComponentsPage();
        expect(departmentComponentsPage.getTitle()).toMatch(/Departments/);
    });

    it('should load create Department page', () => {
        departmentComponentsPage.clickOnCreateButton();
        departmentUpdatePage = new DepartmentUpdatePage();
        expect(departmentUpdatePage.getPageTitle()).toMatch(/Create or edit a Department/);
        departmentUpdatePage.cancel();
    });

    it('should create and save Departments', () => {
        departmentComponentsPage.clickOnCreateButton();
        departmentUpdatePage.setDepartmentNameInput('departmentName');
        expect(departmentUpdatePage.getDepartmentNameInput()).toMatch('departmentName');
        departmentUpdatePage.locationSelectLastOption();
        departmentUpdatePage.save();
        expect(departmentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
