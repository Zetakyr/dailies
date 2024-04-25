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
            {task: "Task 1" , progress: false},
            {task: "Task 2" , progress: false},
            {task: "Task 3" , progress: false},
            {task: "Task 4" , progress: false},
        ],
    },
    reducers: {
        setPool: (state, action) => {
            state.dailyPool = action.payload;
        },
        setCurrentDailies: (state, action) => {
            state.currentDailies = action.payload;
        },
        toggleProgress: (state, action) => {
            let {index} = action.payload;
            let task = state.currentDailies[index].task;
            let progress = !(state.currentDailies[index].progress)
            state.currentDailies[index] = JSON.parse(`{"task": "${task}", "progress": ${progress}}`);
        },
        editName: (state, action) => {
            let {index} = action.payload;
            let {task} = action.payload;
            let progress = (state.currentDailies[index].progress)
            state.channelList[index] = JSON.parse (`{"task": "${task}", "progress": ${progress}}`);
        },
    }
})

export const { setPool, setCurrentDailies, toggleProgress, editName } = dailiesSlice.actions;

export default dailiesSlice.reducer;
