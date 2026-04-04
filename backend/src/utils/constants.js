// 1. User Roles
export const UserRolesEnum = {
    ADMIN:  "admin",
    PROJECT_ADMIN:  "project_admin",
    MEMBER: "member"
}

export const AvailableUserRoles = Object.values(UserRolesEnum)


// 2. Task Status
export const TaskStatusEnum = {
    TODO:"todo",
    IN_PROGRESS: "in_progress",
    DONE: "done"
};
export const AvailableTaskStatuses = Object.values(TaskStatusEnum)

// 3. Kan-ban tages
export const BoardTages = {
    NOT_STARTED: "not_started",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed",
    REWORKING: "reworking",
    DONE: "done",
    TESTING: "testing"
}
export const AvailableBoardTages = Object.values(BoardTages)

// 4.  kan-ban priority
export const BoardPriority = {
    LOWEST: "lowest",
    LOW: "low",
    HIGH: "high",
    HIGHEST: "highest"
}
export const AvailableBoardPriority = Object.values(BoardPriority)

// 5. Todo status
export const TodoStatusEnum = {
    TODO:"todo",
    IN_PROGRESS: "in_progress",
    DONE: "done"
};
export const AvailableTodoStatuses = Object.values(TodoStatusEnum)

// 6. Todo priority
export const TodoPriority = {
    LOWEST: "lowest",
    LOW: "low",
    HIGH: "high",
    HIGHEST: "highest"
}
export const AvailableTodoPriority = Object.values(TodoPriority)