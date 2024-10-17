import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'tooManyMatches',
    name: 'TOO_MANY_MATCHES',
    fields: {
        unmangledName: {
            type: 'text',
            isRequired: true,
        },
        matchingNames: {
            type: 'text',
            isRequired: true,
            isArray: true,
        },
    },
})
