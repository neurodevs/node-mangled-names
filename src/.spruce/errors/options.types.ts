import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface LoadSymbolsFailedErrorOptions extends SpruceErrors.NodeMangledNames.LoadSymbolsFailed, ISpruceErrorOptions {
	code: 'LOAD_SYMBOLS_FAILED'
}

type ErrorOptions =  | LoadSymbolsFailedErrorOptions 

export default ErrorOptions
