import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRows from "../../ui/FormRows";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";
// import { da } from "date-fns/locale";

function CreateCabinForm({ editCabin = {} }) {
  const { id: cabinId } = editCabin;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({ defaultValues: editCabin ? editCabin : {} });
  const { CreateCabin, isInserted } = useCreateCabin();
  const { mutateEdit, loadEdit } = useEditCabin();

  function onsubmit(data) {
    const image =
      typeof editCabin.image === "string" ? data.image : data.image[0];
    cabinId
      ? mutateEdit(
          {
            ...data,
            image,
          },
          {
            onSuccess: () => {
              reset();
            },
          }
        )
      : CreateCabin(
          { ...data, image },
          {
            onSuccess: (data) => {
              console.log(data);
              reset();
            },
          }
        );
  }

  return (
    <Form onSubmit={handleSubmit(onsubmit)}>
      <FormRows label="Cabin name" errors={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "please fill the field first" })}
        />
      </FormRows>

      <FormRows label="Maximum capacity" errors={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "please fill the field first",
            min: 1,
          })}
        />
      </FormRows>

      <FormRows label="Regular price" errors={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "please fill the field first",
          })}
        />
      </FormRows>

      <FormRows label="Discount" errors={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "please fill the field first",
            validate: (value) =>
              value < getValues().regularPrice ||
              "discount should be less than the regular price",
          })}
        />
      </FormRows>

      <FormRows
        label="Description for website"
        errors={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          // defaultValue=""
          {...register("description", {
            required: "please fill the field first",
          })}
        />
      </FormRows>

      <FormRows label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: cabinId ? false : "please insert the file",
          })}
        />
        {/* cabinId ? false : "please select a file first" */}
      </FormRows>

      <FormRows>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isInserted}>Edit cabin</Button>
      </FormRows>
    </Form>
  );
}

export default CreateCabinForm;
///./////////////////////////
