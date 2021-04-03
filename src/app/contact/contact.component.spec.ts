// import { ReactiveFormsModule } from '@angular/forms';
// import { TextFieldModule } from '@angular/cdk/text-field';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
// import { HarnessLoader } from '@angular/cdk/testing';
// import { MatButtonHarness } from '@angular/material/button/testing';
// import { MatInputHarness } from '@angular/material/input/testing';

// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';

// import { MockStore, provideMockStore } from '@ngrx/store/testing';
// import { selectFormState } from '@core/states/form/form.selectors';
// import { Form } from '@core/states/form/form.model';

// import { NotificationService } from '@core/services/notification.service';

// import { TranslateModule } from '@ngx-translate/core';

// import { ContactComponent } from './contact.component';

// describe('ContactComponent', () => {
//   let store: MockStore;
//   let component: ContactComponent;
//   let fixture: ComponentFixture<ContactComponent>;
//   let dispatchSpy: jasmine.Spy;
//   let loader: HarnessLoader;

//   const getInput = (fieldName: string) =>
//     loader.getHarness(
//       MatInputHarness.with({ selector: `[formControlName="${fieldName}"]` })
//     );

//   const getSaveButton = () =>
//     loader.getHarness(MatButtonHarness.with({ text: 'Send' }));

//   const getResetButton = async () =>
//     loader.getHarness(MatButtonHarness.with({ text: 'app.reset-form' }));

//   beforeEach(async () => {
//     TestBed.configureTestingModule({
//       imports: [
//         NoopAnimationsModule,
//         ReactiveFormsModule,
//         TextFieldModule,
//         MatCardModule,
//         MatInputModule,
//         MatFormFieldModule,
//         TranslateModule.forRoot()
//       ],
//       declarations: [ContactComponent],
//       providers: [provideMockStore(), NotificationService]
//     });

//     store = TestBed.inject(MockStore);
//     store.overrideSelector(selectFormState, { form: {} as Form });
//     fixture = TestBed.createComponent(ContactComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     loader = TestbedHarnessEnvironment.loader(fixture);

//     dispatchSpy = spyOn(store, 'dispatch');
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ContactComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should save form', async () => {
//     const subjectInput = await getInput('subject');
//     const descriptionInput = await getInput('description');
//     const saveButton = await getSaveButton();

//     await subjectInput.setValue('new subject');
//     await descriptionInput.setValue(
//       'some random description with required length'
//     );
//     await saveButton.click();

//     expect(dispatchSpy).toHaveBeenCalledTimes(1);
//     expect(dispatchSpy.calls.mostRecent().args[0].type).toBe('[Form] Update');
//     expect(dispatchSpy.calls.mostRecent().args[0].form).toEqual({
//       autosave: false,
//       subject: 'new subject',
//       description: 'some random description with required length'
//     });
//   });

//   it('should reset form', async () => {
//     const subjectInput = await getInput('subject');
//     const resetButton = await getResetButton();

//     await subjectInput.setValue('new subject');
//     await resetButton.click();
//     const subjectValue = await subjectInput.getValue();

//     expect(dispatchSpy).toHaveBeenCalledTimes(1);
//     expect(dispatchSpy.calls.mostRecent().args[0].type).toBe('[Form] Reset');
//     expect(subjectValue).toBe('');
//   });
// });
