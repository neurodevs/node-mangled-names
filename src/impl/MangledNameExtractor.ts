import { exec } from 'child_process'
import { promisify } from 'util'

export default class MangledNameExtractor implements NameExtractor {
    public static Class?: NameExtractorConstructor
    public static execPromise = promisify(exec)

    private libPath!: string
    private unmangledNames!: string[]

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public async extract(libPath: string, unmangledNames: string[]) {
        this.libPath = libPath
        this.unmangledNames = unmangledNames

        const symbols = await this.loadSymbols()

        return this.extractMangledNames(symbols)
    }

    private extractMangledNames(symbols: string) {
        const lines = symbols.split('\n')
        const map: MangledNameMap = {}

        for (const unmangledName of this.unmangledNames) {
            const matchingLines: string[] = []

            for (const line of lines) {
                if (line.includes(unmangledName)) {
                    matchingLines.push(line)
                }
            }

            if (matchingLines.length > 1) {
                throw new Error(
                    `Too many matching functions found for "${unmangledName}"! Matches: ${matchingLines.join(', ')}`
                )
            }

            if (matchingLines.length === 0) {
                throw new Error(
                    `No matching functions found for "${unmangledName}!`
                )
            }

            const match = matchingLines[0]
            const symbolEntries = match.split(' ')

            if (symbolEntries.length > 0) {
                map[unmangledName] = symbolEntries.pop() as string
            }
        }

        return map
    }

    private async loadSymbols() {
        const { stdout, stderr } = await this.execPromise(
            `nm -g ${this.libPath}`
        )

        if (stderr) {
            throw new Error(
                `Failed to load symbols from library: ${this.libPath}!\n\n${stderr}\n\n`
            )
        }

        return stdout
    }

    private get execPromise() {
        return MangledNameExtractor.execPromise
    }
}

export interface NameExtractor {
    extract(libPath: string, unmangledNames: string[]): Promise<MangledNameMap>
}

export type NameExtractorConstructor = new () => NameExtractor

export type MangledNameMap = Record<string, string>
