import { assertOptions } from '@sprucelabs/schema'

export default class MangledNameExtractorImpl implements MangledNameExtractor {
    public static Class?: MangledNameExtractorConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public extract(libPath: string, unmangledNames: string[]) {
        assertOptions({ libPath, unmangledNames }, [
            'libPath',
            'unmangledNames',
        ])
    }
}

export interface MangledNameExtractor {
    extract(libPath: string, unmangledNames: string[]): void
}

export type MangledNameExtractorConstructor = new () => MangledNameExtractor
