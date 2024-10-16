import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'





export declare namespace SpruceErrors.NodeMangledNames {

	
	export interface LoadSymbolsFailed {
		
			
			'libPath': string
	}

	export interface LoadSymbolsFailedSchema extends SpruceSchema.Schema {
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

	export type LoadSymbolsFailedEntity = SchemaEntity<SpruceErrors.NodeMangledNames.LoadSymbolsFailedSchema>

}




