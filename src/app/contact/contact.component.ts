import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { debounceTime, filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@core/animations/route.animations';

import {
  actionFormReset,
  actionFormUpdate
} from '@core/states/form/form.actions';
import { Form, FormState } from '@core/states/form/form.model';
import { selectFormState } from '@core/states/form/form.selectors';
import { select, Store } from '@ngrx/store';

enum Messages {
  sendEmailSuccess = 'Email was successfully sent!'
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  contactForm: FormGroup;

  formValueChanges$: Observable<Form>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.buildForm();

    this.formValueChanges$ = this.contactForm.valueChanges.pipe(
      debounceTime(500),
      filter((form: Form) => form.autosave)
    );

    // this.store
    //   .pipe(select(selectFormState), take(1))
    //   .subscribe((form: FormState) => this.contactForm.patchValue(form.form));
  }

  onSendEmailSubmit(): void {
    if (this.contactForm.valid) {
      this.save();
      //  this.notificationService.info(
      //    (this.form.value.requestGift
      //      ? this.translate.instant('anms.examples.form.text4')
      //      : this.translate.instant('anms.examples.form.text5')) +
      //      ' : ' +
      //      this.translate.instant('anms.examples.form.text6')
      //  );
    }
    // this.mailService
    //   .sendMail(this.contactForm.value)
    //   .subscribe(res => console.log(res));
    // this.notificationService.success(Messages.sendEmailSuccess);
  }

  buildForm(): void {
    this.contactForm = this.fb.group({
      autosave: [false],
      subject: ['', [Validators.required]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000)
        ]
      ]
    });
  }

  update(form: Form) {
    this.store.dispatch(actionFormUpdate({ form }));
  }

  save() {
    this.store.dispatch(actionFormUpdate({ form: this.contactForm.value }));
  }

  reset() {
    this.contactForm.reset();
    this.contactForm.clearValidators();
    this.contactForm.clearAsyncValidators();
    this.store.dispatch(actionFormReset());
  }
}
