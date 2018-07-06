import { element, by, promise, ElementFinder } from 'protractor';

export class DepartmentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-department-my-suffix div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class DepartmentUpdatePage {
    pageTitle = element(by.id('jhi-department-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    departmentNameInput = element(by.id('field_departmentName'));
    locationSelect = element(by.id('field_location'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setDepartmentNameInput(departmentName): promise.Promise<void> {
        return this.departmentNameInput.sendKeys(departmentName);
    }

    getDepartmentNameInput() {
        return this.departmentNameInput.getAttribute('value');
    }

    locationSelectLastOption(): promise.Promise<void> {
        return this.locationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    locationSelectOption(option): promise.Promise<void> {
        return this.locationSelect.sendKeys(option);
    }

    getLocationSelect(): ElementFinder {
        return this.locationSelect;
    }

    getLocationSelectedOption() {
        return this.locationSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
