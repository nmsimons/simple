import {
    AllowedUpdateType,
    ProxyNode,
    SchemaBuilder,
    buildTreeConfiguration,
} from '@fluid-experimental/tree2';

const sb = new SchemaBuilder({ scope: 'd302b84c-75f6-4ecd-9663-524f467013e3' });

export const listOfStrings = sb.list(sb.string);
export const app = sb.object('app', {    
    left: listOfStrings,
    right: listOfStrings,

});

export type App = ProxyNode<typeof app>;
export type ListOfStrings = ProxyNode<typeof listOfStrings>;

export const appSchema = sb.intoSchema(app);

export const appSchemaConfig = buildTreeConfiguration({
    schema: appSchema,
    initialTree: {        
        left: {"":[]},
        right: {"":[]}
    },
    allowedSchemaModifications: AllowedUpdateType.SchemaCompatible,
});
