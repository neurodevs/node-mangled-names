import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'noMatchesFound',
    name: 'NO_MATCHES_FOUND',
    fields: {
        unmangledName: {
            type: 'text',
            isRequired: true,
        },
    },
})
