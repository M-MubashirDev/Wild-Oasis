import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { insertCabin } from "../../services/apiCabins";
import FormRows from "../../ui/FormRows";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const queryClient = useQueryClient();
  const { mutate, isloading: isInserted } = useMutation({
    mutationFn: insertCabin,
    onSuccess: function () {
      toast.success("inserted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  function onsubmit(data) {
    // console.log({ ...data, image: data.image[0].name });
    mutate({ ...data, image: data.image[0] });
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
            required: "please select a file first",
          })}
        />
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
