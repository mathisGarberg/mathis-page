import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FormState } from './form.model';

export const formState = createFeatureSelector<FormState>('form');

export const selectFormState = createSelector(formState, state => state);
