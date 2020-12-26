import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import { NoteScreen } from "../../../components/notes/NoteScreen";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { activeNote } from "../../../actions/notes";

jest.mock("../../../actions/notes", () => ({
  activeNote: jest.fn(),
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
    active: {
      id: 1234,
      title: "Hola",
      body: "mundo",
      date: 0,
    },
    notes: [],
  },
};
//Simular el store
let store = mockStore(initState);
//Cambiar el dispatch por una fn jest
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);

describe("Pruebas en <NoteScreen/>", () => {
  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe disparar el active note", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola de nuevo",
      },
    });

    expect(activeNote).toHaveBeenLastCalledWith(1234, {
      body: "mundo",
      title: "Hola de nuevo",
      id: 1234,
      date: 0,
    });
  });
});
