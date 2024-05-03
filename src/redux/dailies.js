import { createSlice } from "@reduxjs/toolkit";

export const dailiesSlice = createSlice({
    name: "dailies",
    initialState: {
        dailyPool: [
            [
                {task: "Wash your face"},
                {task: "Do 10 push-ups"},
            ],
            [
                {task: "Cook an egg"}, 
                {task: "Brush your teeth"},
                {task: "Clean up your room"},
                {task: "Leetcode for an hour"},
                {task: "Apply on LinkedIn"},
            ],
        ],
        currentDailies: [
            {task: "Wash your face" , progress: false},
            {task: "Do 10 push-ups" , progress: false},
        ],
        mandatoryComplete: false,
        dailyStatistics: [],
    },
    reducers: {
        dailySetPool: (state, action) => {
            state.dailyPool = action.payload;
            console.log(state.dailyPool);
        },
        dailySetCurrentTasks: (state, action) => {
            state.currentDailies = action.payload;
        },
        dailyToggleProgress: (state, action) => {
            let {index} = action.payload;
            let task = state.currentDailies[index].task;
            let progress = !(state.currentDailies[index].progress)
            state.currentDailies[index] = JSON.parse(`{"task": "${task}", "progress": ${progress}}`);
        },
        dailyEditName: (state, action) => {
            let {index} = action.payload;
            let {task} = action.payload;
            state.dailyPool[index] = JSON.parse (`{"task": "${task}", "progress": ${progress}}`);
        },
        toggleMandatoryComplete: (state) => {
            state.mandatoryComplete = !state.mandatoryComplete;
            console.log(state.mandatoryComplete);
        },
        dailyAddDate: (state, action) => {
            state.dailyStatistics.push(action.payload);
            console.log(state.dailyStatistics);
        },
        dailyEditDate: (state, action) => {
            let {date} = action.payload;
            let {status} = action.payload;
            const index = state.dailyStatistics.findIndex((element) => element.date === date);
            state.dailyStatistics[index] = JSON.parse (`{"date": "${date}", "status": "${status}"}`);
        }
    }
})

export const { dailySetPool, dailySetCurrentTasks, dailyToggleProgress, dailyEditNameName, toggleMandatoryComplete } = dailiesSlice.actions;

export default dailiesSlice.reducer;
