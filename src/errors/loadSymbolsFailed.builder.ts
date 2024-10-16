import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'loadSymbolsFailed',
    name: 'LOAD_SYMBOLS_FAILED',
    fields: {
        libPath: {
            type: 'text',
            isRequired: true,
        },
    },
})
