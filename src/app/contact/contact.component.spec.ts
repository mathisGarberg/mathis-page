import { TextFieldModule } from '@angular/cdk/text-field';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ContactComponent } from './contact.component';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from '@core/services/notification.service';
import { selectFormState } from '@core/states/form/form.selectors';
import { Form } from '@core/states/form/form.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

describe('ContactComponent', () => {
  let store: MockStore;
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let dispatchSpy: jasmine.Spy;
  let loader: HarnessLoader;

  const getInput = (fieldName: string) =>
    loader.getHarness(
      MatInputHarness.with({ selector: `[formControlName="${fieldName}"]` })
    );

  const getSaveButton = () =>
    loader.getHarness(MatButtonHarness.with({ text: 'Send' }));

  const getResetButton = async () =>
    loader.getHarness(MatButtonHarness.with({ text: 'app.reset-form' }));

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        TextFieldModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        TranslateModule.forRoot()
      ],
      declarations: [ContactComponent],
      providers: [provideMockStore(), NotificationService]
    });

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectFormState, { form: {} as Form });
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);

    dispatchSpy = spyOn(store, 'dispatch');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save form', async () => {
    const subjectInput = await getInput('subject');
    const descriptionInput = await getInput('description');
    const saveButton = await getSaveButton();

    await subjectInput.setValue('new subject');
    await descriptionInput.setValue(
      'some random description with required length'
    );
    await saveButton.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.calls.mostRecent().args[0].type).toBe('[Form] Update');
    expect(dispatchSpy.calls.mostRecent().args[0].form).toEqual({
      autosave: false,
      subject: 'new subject',
      description: 'some random description with required length'
    });
  });

  it('should reset form', async () => {
    const subjectInput = await getInput('subject');
    const resetButton = await getResetButton();

    await subjectInput.setValue('new subject');
    await resetButton.click();
    const subjectValue = await subjectInput.getValue();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy.calls.mostRecent().args[0].type).toBe('[Form] Reset');
    expect(subjectValue).toBe('');
  });
});
