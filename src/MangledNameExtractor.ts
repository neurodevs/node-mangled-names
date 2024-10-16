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

        return await this.loadSymbols()
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

        return { [this.unmangledNames[0]]: stdout }
    }

    private get execPromise() {
        return MangledNameExtractorImpl.execPromise
    }
}

export interface MangledNameExtractor {
    extract(libPath: string, unmangledNames: string[]): Promise<MangledNameMap>
}

export type MangledNameExtractorConstructor = new () => MangledNameExtractor

export interface MangledNameMap {}

export interface PromisifyResult {
    stdout: string
    stderr: string
}
