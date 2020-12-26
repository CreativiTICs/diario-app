import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("Pruebas en el authReducer", () => {
  test("Debe realizar el login", () => {
    const initState = {};
    const action = {
      type: types.login,
      payload: {
        uid: "abc",
        displayName: "Carlos",
      },
    };
    const state = authReducer(initState, action);
    expect(state).toEqual({
      uid: "abc",
      name: "Carlos",
    });
  });

  test("Debe realizar el logout", () => {
    const initState = {
      uid: "adfh1afdh13ha12hf1",
      name: "Carlos",
    };
    const action = {
      type: types.logout,
    };
    const state = authReducer(initState, action);
    expect(state).toEqual({});
  });

  test("Debe retornar el state si no existe el action type", () => {
    const initState = {
      uid: "adfh1afdh13ha12hf1",
      name: "Carlos",
    };
    const action = {
      type: "sldllfjalsf",
    };
    const state = authReducer(initState, action);
    expect(state).toEqual(initState);
  });
});
