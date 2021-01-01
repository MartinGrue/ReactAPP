import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { Form, Button, Segment } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IProfileFormValues } from '../../app/models/IProfile';
import { combineValidators, isRequired } from 'revalidate';

export const ProfileEditForm: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, profile } = rootStore.profileStore;
  const { updateUser} = rootStore.userStore;

  const validate = combineValidators({
    userName: isRequired('displayName')
  });

  return (
    <Segment clearing>
      <FinalForm
        validate={validate}
        initialValues={profile!}
        onSubmit={
          (values: IProfileFormValues) => 
          updateUser(values).catch(error => ({
            [FORM_ERROR]: error
          }))
        }
        render={({
          handleSubmit,
          submitting,
          invalid,
          pristine,
          dirtySinceLastSubmit
        }) => (
          <Form onSubmit={handleSubmit} error>
            <Field
              name='displayName'
              value={profile!.displayName}
              component={TextInput}
              placeholder='displayName'
            ></Field>
            <Field
              name='bio'
              value={profile!.bio}
              component={TextInput}
              placeholder='bio'
            ></Field>
            {isLoggedIn && (
              <Button
                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                loading={submitting}
                positive
                content='Update Profile'
                floated='right'
              ></Button>
            )}
            {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
          </Form>
        )}
      ></FinalForm>
    </Segment>
  );
};

export default ProfileEditForm;
