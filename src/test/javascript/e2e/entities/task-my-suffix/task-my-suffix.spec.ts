import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { TaskComponentsPage, TaskUpdatePage } from './task-my-suffix.page-object';

describe('Task e2e test', () => {
    let navBarPage: NavBarPage;
    let taskUpdatePage: TaskUpdatePage;
    let taskComponentsPage: TaskComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tasks', () => {
        navBarPage.goToEntity('task-my-suffix');
        taskComponentsPage = new TaskComponentsPage();
        expect(taskComponentsPage.getTitle()).toMatch(/Tasks/);
    });

    it('should load create Task page', () => {
        taskComponentsPage.clickOnCreateButton();
        taskUpdatePage = new TaskUpdatePage();
        expect(taskUpdatePage.getPageTitle()).toMatch(/Create or edit a Task/);
        taskUpdatePage.cancel();
    });

    it('should create and save Tasks', () => {
        taskComponentsPage.clickOnCreateButton();
        taskUpdatePage.setTitleInput('title');
        expect(taskUpdatePage.getTitleInput()).toMatch('title');
        taskUpdatePage.setDescriptionInput('description');
        expect(taskUpdatePage.getDescriptionInput()).toMatch('description');
        taskUpdatePage.save();
        expect(taskUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
