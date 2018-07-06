import { element, by, promise, ElementFinder } from 'protractor';

export class RegionComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-region-my-suffix div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getText();
    }
}

export class RegionUpdatePage {
    pageTitle = element(by.id('jhi-region-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    regionNameInput = element(by.id('field_regionName'));

    getPageTitle() {
        return this.pageTitle.getText();
    }

    setRegionNameInput(regionName): promise.Promise<void> {
        return this.regionNameInput.sendKeys(regionName);
    }

    getRegionNameInput() {
        return this.regionNameInput.getAttribute('value');
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
