export default class MangledNameExtractorImpl implements MangledNameExtractor {
    public static Class?: MangledNameExtractorConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }
}

export interface MangledNameExtractor {}

export type MangledNameExtractorConstructor = new () => MangledNameExtractor
