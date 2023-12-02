import { TreeConfiguration, SchemaFactory } from "@fluid-experimental/tree2";

const sf = new SchemaFactory('d302b84c-75f6-4ecd-9663-524f467013e3');

export class Container extends sf.object('Container', {    
    items: sf.list(sf.string),    
}) {
    // Moves the first item in the source list to the start of this container's list
    public move(source: Container) {
        if (source.items.length > 0) this.items.moveToStart(0, source.items);
    }
    
    // Remove the first item in the list if the list is not empty
    public remove() {
        if (this.items.length > 0) this.items.removeAt(0);
    }

    // Add an item to the beginning of the list
    public insert() {
        this.items.insertAtStart('');
    }
}

export class App extends sf.object('App', {    
    left: Container,
    right: Container
}) {}

// Specify the root type - in this case the only type: App.
// Specify the initial state of the tree if this is a new tree.
// This object is passed into the SharedTree via the schematize
// method.
export const treeConfiguration = new TreeConfiguration(
    App,
    () => new App({        
        left: {items: []},
        right: {items: []}
    }),    
)
