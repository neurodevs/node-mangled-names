import generateId from '@neurodevs/generate-id'
import AbstractModuleTest, { test, assert } from '@neurodevs/node-tdd'

import MangledNameExtractor, {
    NameExtractor,
} from '../../impl/MangledNameExtractor.js'

export default class MangledNameExtractorTest extends AbstractModuleTest {
    private static instance: NameExtractor
    private static _mangledName?: string

    protected static async beforeEach() {
        await super.beforeEach()
        this.instance = this.MangledNameExtractor()
    }

    @test()
    protected static async canCreateMangledNameExtractor() {
        assert.isTruthy(this.instance, 'Should create an instance!')
    }

    @test()
    protected static async executesExpectedCommand() {
        let passedCmd = ''

        // @ts-ignore
        MangledNameExtractor.execPromise = async (cmd: string) => {
            passedCmd = cmd
            return { stdout: this.mangledName }
        }

        await this.extract()
        assert.isEqual(passedCmd, `nm -g ${this.libPath}`)
    }

    @test()
    protected static async throwsIfExecFails() {
        const fakeError = 'Fake error!'
        this.setFakeExecPromise({ stderr: fakeError })

        const err = await assert.doesThrowAsync(async () => {
            await this.extract()
        })

        assert.isEqual(
            err.message,
            `Failed to load symbols from library: ${this.libPath}!\n\n${fakeError}\n\n`,
            'Did not receive the expected error!'
        )
    }

    @test()
    protected static async returnsExpectedResultWithOneMangledName() {
        const fakeStdout = this.fakeStdoutAndSetFakeExecPromise()

        const result = await this.extract()
        assert.isEqualDeep(result, { [this.unmangledName]: fakeStdout })
    }

    @test()
    protected static async returnsExpectedResultWithMultipleMangledNames() {
        const numMangledNames = 2
        const fakeStdout =
            this.generateNumFakeStdout(numMangledNames) +
            `\n${this.mangledName}`

        this.setFakeExecPromise({ stdout: fakeStdout })

        const result = await this.extract()

        const expected = {
            [this.unmangledName]: this.mangledName,
        }

        assert.isEqualDeep(result, expected)
    }

    @test()
    protected static async worksWithMultipleUnmangledNames() {
        const unmangledNames = Array.from({ length: 3 }, () => generateId())
        const fakeStdout = this.generateFakeStdoutByNames(unmangledNames)

        this.setFakeExecPromise({ stdout: fakeStdout })

        const result = await this.instance.extract(this.libPath, unmangledNames)

        const lines = fakeStdout.split('\n')

        const expected = {
            [unmangledNames[0]]: lines[0],
            [unmangledNames[1]]: lines[1],
            [unmangledNames[2]]: lines[2],
        }

        assert.isEqualDeep(result, expected)
    }

    @test()
    protected static async worksWithDelimiterForSymbolType() {
        const fakeStdoutWithDelimiter = `${generateId()} T ${this.mangledName}`
        this.setFakeExecPromise({ stdout: fakeStdoutWithDelimiter })

        const result = await this.extract()

        assert.isEqualDeep(result, { [this.unmangledName]: this.mangledName })
    }

    @test()
    protected static async throwsIfMoreThanOneNameMatches() {
        const matchingName1 = this.mangledName
        const matchingName2 = `${this.mangledName}-2`

        const fakeStdout = `${matchingName1}\n${matchingName2}`
        this.setFakeExecPromise({ stdout: fakeStdout })

        const err = await assert.doesThrowAsync(async () => {
            await this.extract()
        })

        assert.isEqual(
            err.message,
            `Too many matching functions found for "${this.unmangledName}"! Matches: ${matchingName1}, ${matchingName2}`,
            'Did not receive the expected error!'
        )
    }

    @test()
    protected static async throwsIfNoNameMatches() {
        this.setFakeExecPromise()

        const err = await assert.doesThrowAsync(
            async () => await this.extract()
        )

        assert.isEqual(
            err.message,
            `No matching functions found for "${this.unmangledName}!`,
            'Did not receive the expected error!'
        )
    }

    private static fakeStdoutAndSetFakeExecPromise() {
        const fakeStdout = this.generateFakeStdoutByNames(this.unmangledNames)
        this.setFakeExecPromise({ stdout: fakeStdout })
        return fakeStdout
    }

    private static generateNumFakeStdout(numMangledNames = 1) {
        return Array.from({ length: numMangledNames }, () => {
            const fakeUnmangledName = generateId()
            return this.generateFakeMangledName(fakeUnmangledName)
        }).join('\n')
    }

    private static generateFakeStdoutByNames(unmangledNames: string[]) {
        return unmangledNames
            .map((unmangledName) => {
                return this.generateFakeMangledName(unmangledName)
            })
            .join('\n')
    }

    private static setFakeExecPromise(options?: Partial<PromisifyResult>) {
        // @ts-ignore
        MangledNameExtractor.execPromise = async () => {
            return this.generateFakeExecReponse(options)
        }
    }

    private static generateFakeExecReponse(options?: Partial<PromisifyResult>) {
        const { stdout = '', stderr = '' } = options ?? {}
        return { stdout, stderr }
    }

    private static generateFakeMangledName(unmangledName = this.unmangledName) {
        return `${generateId()}${unmangledName}${generateId()}`
    }

    private static async extract() {
        return await this.instance.extract(this.libPath, this.unmangledNames)
    }

    private static get unmangledName() {
        return this.unmangledNames[0]
    }

    private static get mangledName() {
        if (!this._mangledName) {
            this._mangledName = this.generateFakeMangledName()
        }
        return this._mangledName
    }

    private static readonly libPath = generateId()

    private static readonly unmangledNames = [generateId()]

    private static MangledNameExtractor() {
        return MangledNameExtractor.Create()
    }
}

interface PromisifyResult {
    stdout: string
    stderr: string
}
