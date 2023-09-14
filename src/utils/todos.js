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

  const conflictedTodo = filterTodos.find((todo) => {
    let cStartTime = dayjs(startTime);
    let existingStartTime = dayjs(todo.startTime);
    let cEndTime = dayjs(endTime);
    let existingEndTime = dayjs(todo.endTime);

    // Condition that tells if there is conflict
    // Either the schedule overlap from start or from behind
    return (
      (cStartTime < existingStartTime && cEndTime > existingStartTime) ||
      (cStartTime > existingStartTime && cStartTime < existingEndTime) ||
      (cStartTime <= existingStartTime && cEndTime >= existingEndTime)
    );
  });

  return conflictedTodo ? false : true;
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

function checkIfStartTimeAheadOfEndTime(startTime, endTime) {
  return dayjs(startTime) >= dayjs(endTime);
}

function getTimeSlotString(startTime, endTime) {
  const start =
    dayjs(startTime).format("mm") === "30"
      ? dayjs(startTime).format("h:mm")
      : dayjs(startTime).format("h");
  const end =
    dayjs(endTime).format("mm") === "30"
      ? dayjs(endTime).format("h:mmA")
      : dayjs(endTime).format("hA");

  return `${start} - ${end}`;
}

function getHour(date) {
  return dayjs(date).format("h:mmA");
}

function getPendingAndCompleteTasks(todos) {
  return todos.reduce(
    (accumulator, currentTodo) => {
      const totalTask = currentTodo.tasks.length;
      const completed = currentTodo.tasks.filter(
        (task) => task.isCompleted
      ).length;
      const pending = totalTask - completed;

      return [accumulator[0] + pending, accumulator[1] + completed];
    },
    [0, 0]
  );
}

function persistTodaysTodos(todos) {
  const today = dayjs().date();
  return todos.filter(({ startTime }) => dayjs(startTime).date() === today);
}

export {
  mapTodosToSlots,
  checkIfTodoSlotAvailable,
  generateId,
  checkIfStartTimeAheadOfEndTime,
  getTaskObj,
  getTimeSlotString,
  getHour,
  getPendingAndCompleteTasks,
  persistTodaysTodos,
};
