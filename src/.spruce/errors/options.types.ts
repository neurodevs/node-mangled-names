import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface TooManyMatchesErrorOptions extends SpruceErrors.NodeMangledNames.TooManyMatches, ISpruceErrorOptions {
	code: 'TOO_MANY_MATCHES'
}
export interface NoMatchesFoundErrorOptions extends SpruceErrors.NodeMangledNames.NoMatchesFound, ISpruceErrorOptions {
	code: 'NO_MATCHES_FOUND'
}
export interface LoadSymbolsFailedErrorOptions extends SpruceErrors.NodeMangledNames.LoadSymbolsFailed, ISpruceErrorOptions {
	code: 'LOAD_SYMBOLS_FAILED'
}

type ErrorOptions =  | TooManyMatchesErrorOptions  | NoMatchesFoundErrorOptions  | LoadSymbolsFailedErrorOptions 

export default ErrorOptions
