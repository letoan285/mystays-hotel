import createLogger from "vuex/dist/logger";
export const strict = false;
const debug = process.env.NODE_ENV !== "production";
export const plugins = debug ? [createLogger({})] : [];
export const namespaced = true;

export default (): any => ({
  additional: {
    title:
      "Additional Preferences for Depart from Shinjuku / Oji - Half Board Plan",
    detail:
      "Vivamus bibendum sem orci. Suspendisse ac tincidunt lacus, et tristique nisl. Proin quis ultricies tellus. Nullam vel sollicitudin velit, eu lacinia ante. Phasellus convallis dui vitae mi euismod luctus. Nulla efficitur et odio eu pharetra. In finibus bibendum ultricies. Nullam erat mi, finibus et lectus a, viverra ultrices orci.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQeW0gasj3N1iypaLQl6yMGHWHxfiHKpQ-BK0lqv6JkpFjkebuh&usqp=CAU"
  },
  diningTime: [
    {
      value: "19:00",
      text: "19:00"
    },
    {
      value: "20:00",
      text: "20:00"
    }
  ],
  isFormInvalid: true,
  isMakingForSomeoneFormInvalid: true,
  isSubmitted: false,
  additionalList: [],
  extrasList: [],
  guest: [],
  extrasParams: [
    {
      extra_id: "",
      quantity: 0,
      delivery_times: [
        {
          delivered_at: "",
          quantity: 0
        }
      ],
      answer: ""
    }
  ],
  someoneElseData: {},
  isBookingForSomeoneElse: false
});
