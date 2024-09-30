export const ModelAttributesType = Object.freeze({
    CONDITION: 'conditionAttributes',
    ACTION: 'actionAttributes'
});

export const ActionAttributesType = Object.freeze({
    ACTION: 'action',
    WORKING_PERIOD: 'workingPeriod',
    INTERRUPTION: 'interruptions',
    POWER: 'powers'
});

export const ConditionAttributesType = Object.freeze({
    CONDITION: 'condition',
    VALUE: 'values',
    COUNT_SIGNALS: 'countSignals',
    DELAY_TYPE: 'delayType',
    DELAY_VALUE: 'delayValue'
});

export const ActionParams = Object.freeze({
    ON: 'Включить',
    OFF: 'Выключить',
    TOGGLE: 'Включить/Выключить',
    BLINK: "Мигать",
    EMPTY: ''
})

export const Roles = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
    BANNED: 'banned'
})

export const ConditionParams = Object.freeze({
    CAN: "CAN команда",
    CONTACT: "Сухой контакт",
    PHOTO: "Фоторезистор"
})