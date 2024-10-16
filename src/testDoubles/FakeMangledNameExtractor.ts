import { MangledNameExtractor, MangledNameMap } from '../MangledNameExtractor'

export default class FakeMangledNameExtractor implements MangledNameExtractor {
    public static fakeResult: MangledNameMap = {}
    public static extractCalls: FakeExtractCall[] = []
    public static numConstructorCalls = 0

    public constructor() {
        FakeMangledNameExtractor.numConstructorCalls++
    }

    public async extract(libPath: string, unmangledNames: string[]) {
        this.extractCalls.push({
            libPath,
            unmangledNames,
        })
        return this.fakeResult
    }

    private get fakeResult() {
        return FakeMangledNameExtractor.fakeResult
    }

    private get extractCalls() {
        return FakeMangledNameExtractor.extractCalls
    }

    public static clearTestDouble() {
        FakeMangledNameExtractor.fakeResult = {}
        FakeMangledNameExtractor.extractCalls = []
    }
}

export interface FakeExtractCall {
    libPath: string
    unmangledNames: string[]
}
