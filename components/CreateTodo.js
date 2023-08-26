import { useState } from "react";

// To create TODO data in firestore database, import 3 things below:
import { db } from "@/firebase";
// Import remaining 2 functions
import { addDoc, collection } from "firebase/firestore";

export default function CreateTodo() {
  const [todo, setTodo] = useState({
    title: "",
    detail: "",
  });

  async function handleSubmit() {
    const docRef = await addDoc(collection(db, "todos"), todo);
    setTodo({
      title: "",
      detail: "",
    });
    // To send data to firebase, use reference to document
    // addDoc(x,y)
    // x = location to add doc; in this case, add into todos collection
    // y = What you want to be added, so for instance an object; since todo is already
    // y is instantiated as an object because our useState, just call todo.

    // collection (z,w)
    // z = Database that you want
    // w = Collection you want the doc to be added into
  }

  return (
    <>
      <form>
        <label>Title: </label>
        <br />
        <input
          // onchange = changes input; You take the value, and merge it with the useState
          // object to set name
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          type="text"
          // Value = initially set to "todo" initial useState value.
          value={todo.title}
        ></input>
        <br />
        <label>Detail: </label>
        <br />
        <textarea
          onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
          value={todo.detail}
        ></textarea>
      </form>
      <button onClick={handleSubmit}>Add Todo</button>
      <p>{JSON.stringify(todo)}</p>
    </>
  );
}
