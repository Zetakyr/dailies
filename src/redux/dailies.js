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
        dailyStatistics: {},
        dailyPreviousDate: ""
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
        resetMandatoryComplete: (state) => {
            state.mandatoryComplete = false;
        },
        dailyAddDate: (state, action) => {
            let {year, month, day, dayOfWeek, status} = action.payload;
            if (!state.dailyStatistics[year]) {
                state.dailyStatistics[year] = {};
            }
            if (!state.dailyStatistics[year][month]) {
                state.dailyStatistics[year][month] = [];
            }
            let index = state.dailyStatistics[year][month].findIndex((element) => element.day === day);
            if (index === -1) {
                state.dailyStatistics[year][month].push({day, dayOfWeek, status});
            }
            else {
                state.dailyStatistics[year][month][index] = {day, dayOfWeek, status};
            }
            console.log(state.dailyStatistics);
        },
        dailyEditDate: (state, action) => {
            let {year, month, day, status} = action.payload;
            let index = state.dailyStatistics[year][month].findIndex((element) => element.day === day);
            let dayOfWeek = state.dailyStatistics[year][month][index].dayOfWeek;
            state.dailyStatistics[year][month][index] = {day, dayOfWeek, status};
            // const index = state.dailyStatistics.findIndex((element) => element.date === date);
            // state.dailyStatistics[index] = JSON.parse (`{"date": "${date}", "status": ${status}}`);
            console.log(state.dailyStatistics);
        },
        dailySetPreviousDate: (state, action) => {
            state.dailyPreviousDate = action.payload;
            console.log(state.dailyPreviousDate)
        }
    }
})

export const { dailySetPool, dailySetCurrentTasks, dailyToggleProgress, dailyEditNameName, toggleMandatoryComplete, resetMandatoryComplete, dailyAddDate, dailyEditDate, dailySetPreviousDate } = dailiesSlice.actions;

export default dailiesSlice.reducer;
