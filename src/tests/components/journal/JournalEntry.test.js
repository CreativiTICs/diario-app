import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";

import { JournalEntry } from "../../../components/journal/JournalEntry";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { activeNote } from "../../../actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
//Simular el store
let store = mockStore(initState);
//Cambiar el dispatch por una fn jest
store.dispatch = jest.fn();

const nota = {
  id: 10,
  date: 0,
  title: "Hola",
  body: "Mundo",
  url: "https://algunlugar.com/foto.jpg",
};

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...nota} />
  </Provider>
);

describe("Pruebas en <JournalEntry/>", () => {
  test("Debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe activar la nota", () => {
    wrapper.find(".journal__entry").prop("onClick")();
    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(nota.id, { ...nota })
    );
  });
});
