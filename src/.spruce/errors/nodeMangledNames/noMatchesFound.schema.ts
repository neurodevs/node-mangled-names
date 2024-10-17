import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const noMatchesFoundSchema: SpruceErrors.NodeMangledNames.NoMatchesFoundSchema  = {
	id: 'noMatchesFound',
	namespace: 'NodeMangledNames',
	name: 'NO_MATCHES_FOUND',
	    fields: {
	            /** . */
	            'unmangledName': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(noMatchesFoundSchema)

export default noMatchesFoundSchema
