import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import { useSignUp } from "../features/authentication/useSignUp";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUp, isSignUpLoad } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  // const { errors } = formState();
  function onhandle({ text: name, email, password }) {
    signUp({ name, email, password });
    console.log(name, email, password);
  }
  return (
    <Form onSubmit={handleSubmit(onhandle)}>
      <FormRow label="Full name" error={errors?.text?.message}>
        <Input
          type="text"
          {...register("text", { required: "please fill the field" })}
          id="fullName"
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          {...register("email", {
            required: "please fill the field",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "invalid email address",
            },
          })}
          id="email"
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          {...register("password", {
            required: "please fill the field",
            minLength: 8,
          })}
          id="password"
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          {...register("passwordConfirm", {
            required: "please fill the field",
            validate: (value) => {
              return (
                getValues().password === value || "Passwords should match!"
              );
            },
          })}
          id="passwordConfirm"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
