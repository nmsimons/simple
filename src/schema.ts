import { TreeConfiguration, SchemaFactory, NodeFromSchema } from "@fluid-experimental/tree2";

const sf = new SchemaFactory('d302b84c-75f6-4ecd-9663-524f467013e3');

export const ListOfStrings = sf.list(sf.string);
export type ListOfStrings = NodeFromSchema<typeof ListOfStrings>;

export class App extends sf.object('App', {    
    left: ListOfStrings,
    right: ListOfStrings
}) {}

export const treeConfiguration = new TreeConfiguration(
    App,
    () => new App({        
        left: [],
        right: []
    }),    
)
