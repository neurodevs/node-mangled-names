import BaseSpruceError from '@sprucelabs/error'
import ErrorOptions from '#spruce/errors/options.types'

export default class SpruceError extends BaseSpruceError<ErrorOptions> {
    /** an easy to understand version of the errors */
    public friendlyMessage(): string {
        const { options } = this
        let message
        switch (options?.code) {
            case 'LOAD_SYMBOLS_FAILED':
                message = `Failed to load symbols from library: ${options.libPath}`
                break

            case 'TOO_MANY_MATCHES':
                message = `Too many matching functions found for "${options.unmangledName}"! Matches: ${options.matchingNames.join(', ')}`
                break

            case 'NO_MATCHES_FOUND':
                message = `No matching functions found for "${options.unmangledName}!`
                break

            default:
                message = super.friendlyMessage()
        }

        const fullMessage = options.friendlyMessage
            ? options.friendlyMessage
            : message

        return fullMessage
    }
}
