import { TreeConfiguration, SchemaFactory } from "@fluid-experimental/tree2";

const sf = new SchemaFactory('d302b84c-75f6-4ecd-9663-524f467013e3');

export class List extends sf.list('Test', sf.string) {
    // Moves the first item in the source list to the start of this list
    public move(source: List) {
        if (source.length > 0) this.moveToStart(0, source);
    }
    
    // Remove the first item in the list if the list is not empty
    public remove() {
        if (this.length > 0) this.removeAt(0);
    }

    // Add an item to the beginning of the list
    public insert() {
        this.insertAtStart('');
    }
}

export class App extends sf.object('App', {    
    left: List,
    right: List
}) {}

// Specify the root type - in this case the only type: App.
// Specify the initial state of the tree if this is a new tree.
// This object is passed into the SharedTree via the schematize
// method.
export const treeConfiguration = new TreeConfiguration(
    App,
    () => new App({        
        left: [],
        right: []
    }),    
)
