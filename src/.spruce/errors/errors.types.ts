import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'







export declare namespace SpruceErrors.NodeMangledNames {

	
	export interface TooManyMatches {
		
			
			'unmangledName': string
			
			'matchingNames': string[]
	}

	export interface TooManyMatchesSchema extends SpruceSchema.Schema {
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

	export type TooManyMatchesEntity = SchemaEntity<SpruceErrors.NodeMangledNames.TooManyMatchesSchema>

}


export declare namespace SpruceErrors.NodeMangledNames {

	
	export interface NoMatchesFound {
		
			
			'unmangledName': string
	}

	export interface NoMatchesFoundSchema extends SpruceSchema.Schema {
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

	export type NoMatchesFoundEntity = SchemaEntity<SpruceErrors.NodeMangledNames.NoMatchesFoundSchema>

}


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




