import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const tooManyMatchesSchema: SpruceErrors.NodeMangledNames.TooManyMatchesSchema  = {
	id: 'tooManyMatches',
	namespace: 'NodeMangledNames',
	name: 'TOO_MANY_MATCHES',
	    fields: {
	            /** . */
	            'unmangledName': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'matchingNames': {
	                type: 'text',
	                isRequired: true,
	                isArray: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(tooManyMatchesSchema)

export default tooManyMatchesSchema
