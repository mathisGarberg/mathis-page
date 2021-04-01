import { Form } from './form.model';
import { formReducer, initialFormState } from './form.reducer';
import { actionFormReset, actionFormUpdate } from './form.actions';

describe('FormReducer', () => {
  const form: Form = {
    autosave: false,
    subject: 'test',
    description: 'test'
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = formReducer(undefined, action);
    expect(state).toBe(initialFormState);
  });

  it('should update the form', () => {
    const action = actionFormUpdate({
      form: { ...form, subject: 'updated' }
    });
    const state = formReducer(initialFormState, action);
    expect(state.form.subject).toBe('updated');
  });

  it('should reset the form', () => {
    const action = actionFormReset();
    const state = formReducer(undefined, action);
    expect(state).toEqual(initialFormState);
  });
});
