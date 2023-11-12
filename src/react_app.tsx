import React, { ReactNode, useEffect, useState } from 'react';
import { TreeView } from '@fluid-experimental/tree2';
import { App, ListOfStrings } from './schema';
import { IFluidContainer } from 'fluid-framework';
import { Tree } from '@fluid-experimental/tree2';

export function ReactApp(props: {
    data: TreeView<App>;
    container: IFluidContainer;
}): JSX.Element {
    const [invalidations, setInvalidations] = useState(0);

    const appRoot = props.data.root;

    // Register for tree deltas when the component mounts.
    // Any time the tree changes, the app will update
    useEffect(() => {
        // Returns the cleanup function to be invoked when the component unmounts.
        return Tree.on(appRoot, 'afterChange', () => {
            setInvalidations(invalidations + Math.random());
        });
    }, [invalidations]);

    return (
        <div className="flex flex-col gap-3 items-center justify-center content-center m-6">
            <div className="flex flex-row gap-3 justify-center flex-wrap w-full h-full">
                <ListGroup list={appRoot.left} destination={appRoot.right} />
                <ListGroup list={appRoot.right} destination={appRoot.left} />
            </div>
            <Explanation />
        </div>
    );
}

export function ItemCount(props: { list: ListOfStrings }): JSX.Element {
    // Show the length of the list
    return (
        <div className="flex flex-col justify-center bg-black w-24 h-24 rounded-full shadow-md">
            <div className="text-center text-4xl font-extrabold bg-transparent text-white">
                {props.list.length}
            </div>
        </div>
    );
}

export function InsertButton(props: { list: ListOfStrings }): JSX.Element {
    const handleClick = () => {
        // Add an item to the beginning of the list
        props.list.insertAtStart(['']);
    };

    return <Button handleClick={handleClick}>Insert</Button>;
}

export function RemoveButton(props: { list: ListOfStrings }): JSX.Element {
    const handleClick = () => {
        // Remove the first item in the list if the list is not empty
        if (props.list.length > 0) props.list.removeAt(0);
    };

    return <Button handleClick={handleClick}>Remove</Button>;
}

export function MoveButton(props: {
    list: ListOfStrings;
    destination: ListOfStrings;
}): JSX.Element {
    const handleClick = () => {
        // Moves the first item in the list to the start of the destination list
        if (props.list.length > 0) props.destination.moveToStart(0, props.list);
    };

    return <Button handleClick={handleClick}>Move</Button>;
}

export function Explanation(): JSX.Element {
    return (
        <div className="flex flex-col max-w-sm gap-4 justify-left my-8">
            <div className="text-xl bg-black text-white p-2 rounded shadow-md">
                Copy the full URL to another browser tab or send it to someone to see
                that the data is synched between clients.
            </div>
            <div className="text-base">
                This is a simple demonstration of Fluid Framework. The circles show
                the number of items in one of two list data structures.
            </div>
            <div className="text-base">
                Clicking the insert and remove buttons inserts or removes an item
                from the list.
            </div>
            <div className="text-base">
                Clicking the move button moves an item from one list to the other.
            </div>
            <div className="text-base">
                In this case, the items in the lists are just empty strings, but they
                can be complex objects, maps, or other lists.
            </div>
        </div>
    );
}

export function ListGroup(props: {
    list: ListOfStrings;
    destination: ListOfStrings;
}): JSX.Element {
    return (
        <div className="flex flex-col gap-3 justify-center content-center m-6">
            <div className="flex flex-row gap-3 justify-center content-center ">
                <ItemCount list={props.list} />
            </div>
            <div className="flex flex-row gap-3 justify-center content-center ">
                <InsertButton list={props.list} />
                <RemoveButton list={props.list} />
                <MoveButton list={props.list} destination={props.destination} />
            </div>
        </div>
    );
}

export function Button(props: {
    children: ReactNode;
    handleClick: () => void;
}): JSX.Element {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-24"
            onClick={() => props.handleClick()}
        >
            {props.children}
        </button>
    );
}
