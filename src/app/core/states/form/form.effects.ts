import { Injectable } from '@angular/core';
import { LocalStorageService } from '@core/local-storage/local-storage.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { actionFormUpdate } from './form.actions';

export const FORM_KEY = 'FORM';

@Injectable()
export class FormEffects {
  persistForm = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionFormUpdate),
        tap(action =>
          this.localStorageService.setItem(FORM_KEY, { form: action.form })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService
  ) {}
}
