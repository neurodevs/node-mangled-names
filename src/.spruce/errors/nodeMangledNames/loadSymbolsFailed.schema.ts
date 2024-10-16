import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const loadSymbolsFailedSchema: SpruceErrors.NodeMangledNames.LoadSymbolsFailedSchema  = {
	id: 'loadSymbolsFailed',
	namespace: 'NodeMangledNames',
	name: 'LOAD_SYMBOLS_FAILED',
	    fields: {
	            /** . */
	            'libPath': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(loadSymbolsFailedSchema)

export default loadSymbolsFailedSchema
