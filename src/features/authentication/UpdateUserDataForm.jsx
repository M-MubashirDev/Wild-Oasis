import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useAuth } from "./useAuth";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { name: currentFullName },
    },
  } = useAuth();
  const { updatedUser, isUserLoad } = useUpdateUser();
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(fullName, avatar);
    updatedUser(
      { name: fullName, imgFile: avatar },
      {
        onSuccess: () => {
          setAvatar("");
          e.target.reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled={isUserLoad} />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUserLoad}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          onClick={() => {
            setFullName(currentFullName);
            setAvatar(null);
          }}
          variation="secondary"
        >
          Cancel
        </Button>
        <Button>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
