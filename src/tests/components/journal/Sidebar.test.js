import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import { Sidebar } from "../../../components/journal/Sidebar";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { starLogout } from "../../../actions/auth";
import { starNewNote } from "../../../actions/notes";

jest.mock("../../../actions/auth", () => ({
  starLogout: jest.fn(),
}));

jest.mock("../../../actions/notes", () => ({
  starNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "1",
    name: "Carlos",
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: null,
    notes: [],
  },
};
//Simular el store
let store = mockStore(initState);
//Cambiar el dispatch por una fn jest
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
);

describe("Pruebas en el <Sidebar/>", () => {
  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe llamar el starLogout", () => {
    wrapper.find("button").prop("onClick")();
    expect(starLogout).toHaveBeenCalled();
  });

  test("Debe llamar el startNewNote", () => {
    wrapper.find(".journal__new-entry").prop("onClick")();
    expect(starNewNote).toHaveBeenCalled();
  });
});
