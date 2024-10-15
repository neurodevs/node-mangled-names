import { exec } from 'child_process'
import { promisify } from 'util'
import { assertOptions } from '@sprucelabs/schema'

export default class MangledNameExtractorImpl implements MangledNameExtractor {
    public static Class?: MangledNameExtractorConstructor
    public static execPromise = promisify(exec)

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public async extract(libPath: string, unmangledNames: string[]) {
        assertOptions({ libPath, unmangledNames }, [
            'libPath',
            'unmangledNames',
        ])

        await this.execPromise(`nm -g ${libPath}`)
    }

    private get execPromise() {
        return MangledNameExtractorImpl.execPromise
    }
}

export interface MangledNameExtractor {
    extract(libPath: string, unmangledNames: string[]): Promise<void>
}

export type MangledNameExtractorConstructor = new () => MangledNameExtractor
