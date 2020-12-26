import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { firebase } from "../../../firebase/firebaseConfig";

import { AppRouter } from "../../../components/routers/AppRouter";
import { login } from "../../../actions/auth";
import { act } from "react-dom/test-utils";

jest.mock(".../../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "ABC",
    },
    notes: [],
  },
};
//Simular el store
let store = mockStore(initState);
//Cambiar el dispatch por una fn jest
store.dispatch = jest.fn();

describe("Pruebas en el <AppRouter/>", () => {
  test("Debe llamar el login si estoy autenticado", async () => {
    let user;

    await act(async () => {
      const userCred = await firebase
        .auth()
        .signInWithEmailAndPassword("test@testing.com", "123456");

      user = userCred.user;
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(login).toHaveBeenCalledWith("Cxfesejf9EQZt5aZh9IeGqzloN33", null);
  });
});
