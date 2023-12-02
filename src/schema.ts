import { TreeConfiguration, SchemaFactory } from "@fluid-experimental/tree2";

const sf = new SchemaFactory('d302b84c-75f6-4ecd-9663-524f467013e3');

export class App extends sf.object('App', {    
    left: sf.list(sf.string),
    right: sf.list(sf.string)
}) {
    // Moves the first item in the source list to the start of the destination list
    public move(target: "left" | "right", destination: "left" | "right") {
        if (this[target].length > 0) this[destination].moveToStart(0, this[target]);
    }
    
    // Remove the first item in the list if the list is not empty
    public remove(target: "left" | "right") {
        if (this[target].length > 0) this[target].removeAt(0);
    }

    // Add an item to the beginning of the list
    public insert(target: "left" | "right") {
        this[target].insertAtStart('');
    }
}    

export const treeConfiguration = new TreeConfiguration(
    App,
    () => new App({        
        left: [],
        right: []
    }),    
)
