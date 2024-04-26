import { createSlice } from "@reduxjs/toolkit";

export const weekliesSlice = createSlice({
    name: "weeklies",
    initialState: {
        weeklyPool: [
            {task: "Wash your face"},
            {task: "Do 10 push-ups"},
        ],
        currentWeeklies: [
            {task: "Task A (weekly)" , progress: false},
            {task: "Task 2" , progress: false},
            {task: "Task 3" , progress: false},
            {task: "Task 4" , progress: false},
        ],
    },
    reducers: {
        weeklySetPool: (state, action) => {
            state.weeklyPool = action.payload;
        },
        weeklySetCurrentTasks: (state, action) => {
            state.currentWeeklies = action.payload;
        },
        weeklyToggleProgress: (state, action) => {
            let {index} = action.payload;
            let task = state.currentWeeklies[index].task;
            let progress = !(state.currentWeeklies[index].progress)
            state.currentWeeklies[index] = JSON.parse(`{"task": "${task}", "progress": ${progress}}`);
        },
        weeklyEditName: (state, action) => {
            let {index} = action.payload;
            let {task} = action.payload;
            state.weeklyPool[index] = JSON.parse (`{"task": "${task}"}`);
        },
    }
})

export const { weeklySetPool, weeklySetCurrentTasks, weeklyToggleProgress, weeklyEditName } = weekliesSlice.actions;

export default weekliesSlice.reducer;
