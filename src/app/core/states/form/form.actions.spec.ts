import { actionFormReset, actionFormUpdate } from './form.actions';
import { Form } from './form.model';

describe('Form Actions', () => {
  it('should create ActionFormUpdate action', () => {
    const testForm: Form = {
      autosave: true,
      subject: 'test',
      description: 'test'
    };

    const action = actionFormUpdate({
      form: testForm
    });

    expect(action.type).toEqual(actionFormUpdate.type);
    expect(action.form).toEqual(jasmine.objectContaining(testForm));
  });

  it('should create ActionFormReset', () => {
    const action = actionFormReset();
    expect(action.type).toEqual(actionFormReset.type);
  });
});
