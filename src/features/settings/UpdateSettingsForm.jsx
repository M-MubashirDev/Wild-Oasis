import Form from "../../ui/Form";
import FormRow from "../../ui/FormRows";
import Input from "../../ui/Input";
// import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting";
import { useSetting } from "./useSetting";
function UpdateSettingsForm() {
  const { updateSetting, loadSetting } = useUpdateSetting();
  const {
    data: {
      maxBookingLength,
      maxGuestsperBooking,
      minBookinglength,
      breakFastPrice,
    } = {},
    isLoading: settingsLoading,
  } = useSetting();
  function handleUpdates(e, fieldName) {
    const value = e.target.value;
    updateSetting({ [fieldName]: value });
  }
  if (settingsLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={loadSetting}
          defaultValue={minBookinglength}
          onBlur={(e) => handleUpdates(e, "minBookinglength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={loadSetting}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdates(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={loadSetting}
          onBlur={(e) => handleUpdates(e, "maxGuestsperBooking")}
          defaultValue={maxGuestsperBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={loadSetting}
          onBlur={(e) => handleUpdates(e, "breakFastPrice")}
          defaultValue={breakFastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
