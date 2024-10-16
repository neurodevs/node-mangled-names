import { exec } from 'child_process'
import { promisify } from 'util'
import { assertOptions } from '@sprucelabs/schema'
import SpruceError from './errors/SpruceError'

export default class MangledNameExtractorImpl implements MangledNameExtractor {
    public static Class?: MangledNameExtractorConstructor
    public static execPromise = promisify(exec)

    private libPath!: string
    private unmangledNames!: string[]

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public async extract(libPath: string, unmangledNames: string[]) {
        assertOptions({ libPath, unmangledNames }, [
            'libPath',
            'unmangledNames',
        ])

        this.libPath = libPath
        this.unmangledNames = unmangledNames

        const symbols = await this.loadSymbols()

        return this.extractMangledNames(symbols)
    }

    private extractMangledNames(symbols: string) {
        const lines = symbols.split('\n')
        const map: MangledNameMap = {}

        for (const unmangledName of this.unmangledNames) {
            for (const line of lines) {
                if (line.includes(unmangledName)) {
                    const symbolEntries = line.split(' ')

                    if (symbolEntries.length > 0) {
                        map[unmangledName] = symbolEntries.pop() as string
                    }
                }
            }
        }

        return map
    }

    private async loadSymbols() {
        const { stdout, stderr } = await this.execPromise(
            `nm -g ${this.libPath}`
        )

        if (stderr) {
            throw new SpruceError({
                code: 'LOAD_SYMBOLS_FAILED',
                libPath: this.libPath,
                originalError: stderr as unknown as Error,
            })
        }

        return stdout
    }

    private get execPromise() {
        return MangledNameExtractorImpl.execPromise
    }
}

export interface MangledNameExtractor {
    extract(libPath: string, unmangledNames: string[]): Promise<MangledNameMap>
}

export type MangledNameExtractorConstructor = new () => MangledNameExtractor

export type MangledNameMap = Record<string, string>

export interface PromisifyResult {
    stdout: string
    stderr: string
}
