import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  starNewNote,
  startLoadingNotes,
  startSaveNote,
  startUploading,
} from "../../actions/notes";
import { db } from "../../firebase/firebaseConfig";
import { types } from "../../types/types";
import { fileUpload } from "../../helpers/fileUpload";

jest.mock("../../helpers/fileUpload", () => ({
  fileUpload: jest.fn(() => {
    return "https://hola-mundo.com/cosa.jpg";
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "TESTING",
  },
  notes: {
    active: {
      id: "B9Xj8hTXH9riKNduYp3v",
      title: "Hola",
      body: "Mundo",
    },
  },
};

//Simular el store
let store = mockStore(initState);

describe("Pruebas en notes Actions", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("Debe crear una nueva nota starNewNote", async () => {
    await store.dispatch(starNewNote());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });
    //Para borrar inmediatamente el registro en firestore testing
    const docId = actions[0].payload.id;
    await db.doc(`/TESTING/journal/notes/${docId}`).delete();
  });

  test("Debe cargar las notas starLoadingNotes", async () => {
    await store.dispatch(startLoadingNotes("TESTING"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test("Debe actualizar la nota starSaveNote", async () => {
    const note = {
      id: "B9Xj8hTXH9riKNduYp3v",
      title: "titulo",
      body: "body",
    };
    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();

    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();

    expect(docRef.data().title).toBe(note.title);
  });

  test("Prueba con startUploading debe actualizar el url del entry", async () => {
    const file = new File([], "foto.jpg");
    await store.dispatch(startUploading(file));

    const docRef = await db
      .doc("/TESTING/journal/notes/B9Xj8hTXH9riKNduYp3v")
      .get();

    expect(docRef.data().url).toBe("https://hola-mundo.com/cosa.jpg");
  });
});
