import dayjs from "../plugins/dayjs";

const DURATION = 30;

function generateSlots() {
  let startDate = dayjs().startOf("date").add(10, "hours");
  let slots = [];
  for (let i = 0; i < 16; i++) {
    const id = startDate.hour() * 100 + startDate.minute();
    slots.push({ ...getEmptySlot(startDate, DURATION), id });
    startDate = startDate.add(30, "minute");
  }
  return slots;
}

function getEmptySlot(startTime, duration) {
  const endTime = startTime.add(duration, "minute");
  return {
    startTime: startTime.format("MMMM D, YYYY h:mm A"),
    endTime: endTime.format("MMMM D, YYYY h:mm A"),
  };
}

export { generateSlots, getEmptySlot };
