import { ConditionAttribute, ModelAttributes, ActionAttribute } from "../interfaces/modelAttributes"; 

export const modelAttributes = [
    new ModelAttributes(
        'Model1',
        [
            new ConditionAttribute("Фоторезистор", ["Вечер", "День"], ["Постоянно"], ["более", "менее", "равно"]),
            new ConditionAttribute(
                "Сухой контакт", 
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "Постоянно"], 
                ["более", "менее", "равно"]
            ),
        ],
        new ActionAttribute(
            ["Включить", "Мигать", "Выключить"], 
            [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000], 
            [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, "Нет"], 
            [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        )
    )
]