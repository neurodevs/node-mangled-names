import {
    MangledNameExtractor,
    MangledNameMap,
} from '../modules/MangledNameExtractor'

export default class FakeMangledNameExtractor implements MangledNameExtractor {
    public static numConstructorCalls = 0
    public static extractCalls: FakeExtractCall[] = []
    public static fakeResult: MangledNameMap = {}

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

    private get extractCalls() {
        return FakeMangledNameExtractor.extractCalls
    }

    private get fakeResult() {
        return FakeMangledNameExtractor.fakeResult
    }

    public static clearTestDouble() {
        FakeMangledNameExtractor.fakeResult = {}
        FakeMangledNameExtractor.extractCalls = []
        FakeMangledNameExtractor.numConstructorCalls = 0
    }
}

export interface FakeExtractCall {
    libPath: string
    unmangledNames: string[]
}
