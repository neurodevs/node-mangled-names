import { NameExtractor, MangledNameMap } from '../impl/MangledNameExtractor.js'

export default class FakeNameExtractor implements NameExtractor {
    public static numConstructorCalls = 0
    public static extractCalls: FakeExtractCall[] = []
    public static fakeResult: MangledNameMap = {}

    public constructor() {
        FakeNameExtractor.numConstructorCalls++
    }

    public async extract(libPath: string, unmangledNames: string[]) {
        this.extractCalls.push({
            libPath,
            unmangledNames,
        })
        return this.fakeResult
    }

    private get extractCalls() {
        return FakeNameExtractor.extractCalls
    }

    private get fakeResult() {
        return FakeNameExtractor.fakeResult
    }

    public static clearTestDouble() {
        FakeNameExtractor.fakeResult = {}
        FakeNameExtractor.extractCalls = []
        FakeNameExtractor.numConstructorCalls = 0
    }
}

export interface FakeExtractCall {
    libPath: string
    unmangledNames: string[]
}
