// we will create this usePageState hook to manage the state of our application.
// it will receive the initial state as an argument & provide methods for adding a node , removing a node by index , changing the node type
// changing the Node Value , overriding the list of nodes entirely.
// it will also allow to edit the page title and the page cover
import { NodeData, NodeType, Page } from "../utils/types";
import { useImmer } from "use-immer";

// npm i --save use-immer - it is a state management library that allows you to work with complex state objects
export const usePageState = (initialState: Page) => {
  const [page, setPage] = useImmer<Page>(initialState); // works similarly to useState
  const addNode = (node: NodeData, index: number) => {
    // receive the node data & index where we want to insert this node
    setPage((draft) => {
      draft.nodes.splice(index, 0, node); // 0 means we don't want to remove any element
    });
  };

  const removeNodeByIndex = (nodeIndex: number) => {
    setPage((draft) => {
      draft.nodes.splice(nodeIndex, 1); // we remove 1 node at nodeIndex
    });
  };

  const changeNodeValue = (nodeIndex: number, value: string) => {
    // string value that we want to write into our node
    setPage((draft) => {
      draft.nodes[nodeIndex].value = value;
    });
  };

  const changeNodeType = (nodeIndex: number, type: NodeType) => {
    setPage((draft) => {
      draft.nodes[nodeIndex].type = type;
      draft.nodes[nodeIndex].value = ""; // reset the value of new node type
    });
  };

  const setNodes = (nodes: NodeData[]) => {
    setPage((draft) => {
      draft.nodes = nodes;
    });
  };

  const setTitle = (title: string) => {
    setPage((draft) => {
      draft.title = title;
    });
  };

  const setCoverImage = (coverImage: string) => {
    setPage((draft) => {
      draft.cover = coverImage;
    });
  };

  return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    addNode,
    removeNodeByIndex,
    changeNodeValue,
    changeNodeType,
    setNodes,
    setTitle,
    setCoverImage,
  };
};

// useImmer is a React hook that makes it easier to work with immutable state in your components. It's a thin wrapper around the Immer library, which lets you update state objects as if they were mutable, but under the hood, it creates new immutable copies, ensuring that your React components re-render correctly.

// Here's a breakdown of why you might want to use useImmer and how it works:

// Why use useImmer?

// Simplified State Updates: useImmer lets you update nested state objects directly without needing to use spread syntax (...) or other complex techniques to maintain immutability. This makes your code cleaner and easier to read.
// Improved Performance: For complex state objects, useImmer can be more performant than manually creating new state objects with spread syntax, as it optimizes the update process.
// Reduced Boilerplate: It can reduce the amount of boilerplate code you need to write, especially when dealing with nested state objects.

// import React from 'react';
// import { useImmer } from 'use-immer';

// function MyComponent() {
//   const [person, updatePerson] = useImmer({
//     name: 'John Doe',
//     address: {
//       street: '123 Main St',
//       city: 'Anytown',
//     },
//   });

//   const handleNameChange = (e) => {
//     updatePerson((draft) => {
//       draft.name = e.target.value;
//     });
//   };

//   const handleStreetChange = (e) => {
//     updatePerson((draft) => {
//       draft.address.street = e.target.value;
//     });
//   };

//   return (
//     <div>
//       <input type="text" value={person.name} onChange={handleNameChange} />
//       <input
//         type="text"
//         value={person.address.street}
//         onChange={handleStreetChange}
//       />
//       <p>Name: {person.name}</p>
//       <p>Street: {person.address.street}</p>
//     </div>
//   );
// }
// useImmer returns an array similar to useState. The first element is the current state, and the second is an updater function.
// The updater function takes a "producer" function as an argument.
// Inside the producer function, you get a draft of the state, which you can modify directly. Immer tracks these modifications.
// Immer automatically creates a new immutable state object based on your changes to the draft.
// Key Advantages over useState:

// Direct mutation: You manipulate the draft directly, making the code more intuitive and less verbose, especially for nested objects.
// Automatic immutability: Immer handles the creation of new immutable state objects behind the scenes.
// When to Consider useImmer:

// You have complex state objects with nested data.
// You find yourself writing a lot of code to update state immutably.
// You want to improve the performance of your state updates.
