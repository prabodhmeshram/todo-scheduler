import { generateSlots } from "../slots";
import {
  checkIfStartTimeAheadOfEndTime,
  checkIfTodoSlotAvailable,
  mapTodosToSlots,
} from "../todos";

describe("mapTodosToSlots", () => {
  it("should map a todo to the correct slot", () => {
    const todos = [
      {
        startTime: "2023-09-14 10:30:00",
        endTime: "2023-09-14 11:30:00",
      },
    ];
    const slots = generateSlots();

    // Call the function
    const result = mapTodosToSlots(todos, slots);

    // Assert that the todos have been correctly mapped to slots
    expect(result).toHaveLength(slots.length);
    expect(result[1].todo).toEqual({
      startTime: "2023-09-14 10:30:00",
      endTime: "2023-09-14 11:30:00",
      width: 200,
      occupied: true,
    });
  });
});

describe("checkIfTodoSlotAvailable", () => {
  it("should return true when no conflicts exist", () => {
    const existingTodos = [
      {
        id: "task-1",
        startTime: "2023-09-14 10:30:00",
        endTime: "2023-09-14 11:30:00",
      },
      {
        id: "task-2",
        startTime: "2023-09-14 13:30:00",
        endTime: "2023-09-14 14:00:00",
      },
    ];
    const startTime = "2023-09-14 12:00:00";
    const endTime = "2023-09-14 12:30:00";
    const skipId = null;

    const result = checkIfTodoSlotAvailable(
      startTime,
      endTime,
      existingTodos,
      skipId
    );

    expect(result).toBe(true);
  });

  it("should return true when skipId matches the conflicting todo", () => {
    const existingTodos = [
      {
        id: "task-1",
        startTime: "2023-09-14 12:00:00",
        endTime: "2023-09-14 12:30:00",
      },
    ];
    const startTime = "2023-09-14 12:00:00";
    const endTime = "2023-09-14 12:30:00";
    const skipId = "task-1";

    const result = checkIfTodoSlotAvailable(
      startTime,
      endTime,
      existingTodos,
      skipId
    );

    expect(result).toBe(true);
  });

  it("should return false when there is a conflict", () => {
    const existingTodos = [
      {
        id: "task-1",
        startTime: "2023-09-14 12:00:00",
        endTime: "2023-09-14 12:30:00",
      },
    ];
    const startTime = "2023-09-14 12:00:00";
    const endTime = "2023-09-14 13:30:00";
    const skipId = null;

    const result = checkIfTodoSlotAvailable(
      startTime,
      endTime,
      existingTodos,
      skipId
    );

    expect(result).toBe(false);
  });
});

describe("checkIfStartTimeAheadOfEndTime", () => {
  it("should return true when start time is ahead of end time", () => {
    const startTime = "2023-09-14T10:00:00Z";
    const endTime = "2023-09-14T09:00:00Z";

    const result = checkIfStartTimeAheadOfEndTime(startTime, endTime);

    expect(result).toBe(true);
  });

  it("should return true when start time is equal to end time", () => {
    const startTime = "2023-09-14 10:00:00";
    const endTime = "2023-09-14T 0:00:00";

    const result = checkIfStartTimeAheadOfEndTime(startTime, endTime);

    expect(result).toBe(true);
  });

  it("should return false when start time is behind end time", () => {
    const startTime = "2023-09-14T09:00:00Z";
    const endTime = "2023-09-14T10:00:00Z";

    const result = checkIfStartTimeAheadOfEndTime(startTime, endTime);

    expect(result).toBe(false);
  });
});
