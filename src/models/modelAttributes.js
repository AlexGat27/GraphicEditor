export const modelData = {
    delayTypes: ["более", "менее", "равно"],
    powers: ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
    conditionAttributes: [
        {
            condition: "",
            values: [],
            countSignals: [],
        },
        {
            condition: "Сухой контакт",
            values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            countSignals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "Постоянно"],
        },
        {
            condition: "Фоторезистор",
            values: ["День", "Ночь"],
            countSignals: ["Постоянно"],
        },
        {
            condition: "CAN команда",
            values: [],
            countSignals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "Постоянно"],
        },
    ],
    actionAttributes: [
        {
            action: "",
            interruptions: [],
            workingPeriod: []
        },
        {
            action: "Включить",
            interruptions: [],
            workingPeriod: ["1 sec", "2 sec", "5 sec", "10 sec", "15 sec", "20 sec", "30 sec", "40 sec", "50 sec", "100 sec", "Нет"]
        },
        {
            action: "Выключить",
            interruptions: [],
            workingPeriod: []
        },
        {
            action: "Включить/Выключить",
            interruptions: [],
            workingPeriod: []
        },
        {
            action: "Мигать",
            interruptions: ["0 ms","100 ms","200 ms","300 ms","400 ms","500 ms","600 ms","700 ms","800 ms","900 ms","1000 ms"],
            workingPeriod: ["1 sec", "2 sec", "5 sec", "10 sec", "15 sec", "20 sec", "30 sec", "40 sec", "50 sec", "100 sec", "Нет"]
        },
    ]
};