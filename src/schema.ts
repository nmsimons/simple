import { TreeConfiguration, SchemaFactory } from "@fluid-experimental/tree2";
import { NodeFromSchema } from "@fluid-experimental/tree2/dist/class-tree";

const sb = new SchemaFactory('d302b84c-75f6-4ecd-9663-524f467013e3');

export const ListOfStrings = sb.list(sb.string);

export class App extends sb.object('App', {    
    left: ListOfStrings,
    right: ListOfStrings
}) {}

export type ListOfStrings = NodeFromSchema<typeof ListOfStrings>;

export const treeConfiguration = new TreeConfiguration(
    App,
    () => new App({        
        left: [],
        right: []
    }),    
)
