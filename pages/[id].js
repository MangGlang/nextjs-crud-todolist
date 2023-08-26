// **getDoc and Doc to get a single document from a collection in firebase**
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

// to get data from the server, not from client, use getServerSideProps
export async function getServerSideProps(context) {
  // context argument has info such as [id] for dynamic route
  //   console.log(context);
  // line 4 will not log onto browser console bc browser console = client side

  // ***vsc terminal will show information bc vsc terminal = server side rendering
  // must return an object with props property to hold info in context***

  //   With the information below, can now get todo doc from firestore database
  //   and then render information in the server
  //   query: { id: 'QlYk2Nf17hrkElIUJn9G' },
  //   resolvedUrl: '/QlYk2Nf17hrkElIUJn9G',
  //   params: { id: 'QlYk2Nf17hrkElIUJn9G' },

  //   console.log(id);
  //   return {
  //     props: {},
  //   };
  const id = context.query.id;
  // How to get a single document from a collection below:

  // getDoc(doc(db), collectionName, idOfDoc)
  // doc function(is a reference to the doc) similar to collections function;
  const docSnap = await getDoc(doc(db, "todos", id));
  //   title & detail stored in data
  const data = docSnap.data();

  return {
    props: {
      todo: {
        title: data.title,
        detail: data.detail,
      },
    },
  };
}

export default function Todo({ todo }) {
  return (
    <div className="container">
      <h1>Todo title: {todo.title}</h1>
      <h3>Detail: {todo.detail}</h3>
    </div>
  );
}
