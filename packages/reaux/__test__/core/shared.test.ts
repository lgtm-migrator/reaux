import {setModuleAction, createActionType, setErrorAction} from "../../src/core/shared";

test("Create Action Type", () => {
    expect(createActionType("name")).toEqual("@@framework/actionType/name");
    expect(createActionType("home")).toEqual("@@framework/actionType/home");
});

test("Set Module Action", () => {
    expect(setModuleAction("moduleName", {name: "name", age: 11})).toEqual({
        type: createActionType("moduleName"),
        payload: {name: "name", age: 11},
    });

    expect(setModuleAction("moduleName2", {name: "name2", age: 22})).toEqual({
        type: createActionType("moduleName2"),
        payload: {name: "name2", age: 22},
    });
});

test("Set Error Action", () => {
    expect(setErrorAction(new Error())).toEqual({type: "@@framework/error", payload: new Error()});

    expect(setErrorAction("error")).toEqual({type: "@@framework/error", payload: "error"});
});
