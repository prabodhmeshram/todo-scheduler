import dayjs from "../plugins/dayjs";

function mapTodosToSlots(todos, slots) {
  // Don't mutate existing slots
  let clonedSlots = JSON.parse(JSON.stringify(slots));
  for (let i = 0; i < todos.length; i++) {
    const { startTime, endTime } = todos[i];
    let start = dayjs(startTime);
    let end = dayjs(endTime);
    const targetId = start.hour() * 100 + start.minute();
    const targetIndex = clonedSlots.findIndex((slot) => slot.id === targetId);
    const width = (end.diff(start, "minute") * 100) / 30;
    clonedSlots[targetIndex].todo = { ...todos[i], width, occupied: true };
  }

  return clonedSlots;
}

function checkIfTodoSlotAvailable(startTime, endTime, existingTodos, skipId) {
  // logic to check if the todo slot is empty
  let filterTodos = existingTodos;
  if (skipId) {
    filterTodos = filterTodos.filter((todo) => todo.id !== skipId);
  }

  return filterTodos.find((todo) => {
    let c1s = dayjs(startTime);
    let c2s = dayjs(todo.startTime);
    let c1e = dayjs(endTime);
    let c2e = dayjs(todo.endTime);

    // Condition that tells if there is conflict
    // Either the schedule overlap from start or from behind
    return (
      (c1s < c2s && c1e > c2s) ||
      (c1s > c2s && c1s < c2e) ||
      (c1s <= c2s && c1e >= c2e)
    );
  });
}

function getTaskObj() {
  return {
    text: "",
    isCompleted: false,
    id: generateId("task"),
  };
}

function generateId(appendText) {
  return `${appendText}-${Math.random().toString(16).slice(2)}`;
}

function checkIfEndDateLessThanOrEqualToStartDate(startTime, endTime) {
  return dayjs(startTime) >= dayjs(endTime);
}

export {
  mapTodosToSlots,
  checkIfTodoSlotAvailable,
  generateId,
  checkIfEndDateLessThanOrEqualToStartDate,
  getTaskObj,
};
