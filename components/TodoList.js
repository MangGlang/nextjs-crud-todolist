// To get all documents from firebase collection, use 2 functions below:
import { db } from "@/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      // console.log(snapshot)
      setTodos(
        snapshot.docs.map((doc) => {
          // console.log(doc.data())
          return {
            // id is available automatically generated
            id: doc.id,
            // gives data inside doc; title & detail
            title: doc.data().title,
            detail: doc.data().detail,
            // Now, todos usestate array is full of objects of todos
            // can now map and display in todo's list below
          };
        })
      );
    });

    // Why return?
    // onSnapshot is an event listener, and is listening for any changes
    // But, always listening = taking/using resources to constantly check
    // returning = stop listener to stop taking extra resources; = more performant
    return unsubscribe;

    // onSnapshot (event-listener function) takes a snapshot of all documents from collection &
    // sends it to us as usable
    // Essentially: upon changes, will update documents & collections

    // onSnapshot(x,y) --> returns an object
    // x = reference to collection we want documents from
    // y = callback function where we use object (that is a snapshot of collection)

    // docs property inside console.log(snapshot) is an array with all documents in our collection
    // map through docs property & put inside todos array in useState
  }, []);
  return (
    <>
      <div>
        <h1>Todos</h1>
        <ul className="todoList">
          {todos.map((todo) => {
            return (
              <Link key={todo.id} href={"/" + todo.id}>
                <li className="listItem">{todo.title}</li>
              </Link>
            )
          })}
          <li className="listItem">Todo 1</li>
          <li className="listItem">Todo 2</li>
          <li className="listItem">Todo 3</li>
        </ul>
      </div>
    </>
  );
}
