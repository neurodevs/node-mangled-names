import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import MangledNameExtractorImpl, {
    MangledNameExtractor,
    PromisifyResult,
} from '../../MangledNameExtractor'

export default class MangledNameExtractorTest extends AbstractSpruceTest {
    private static instance: MangledNameExtractor
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
    protected static async throwsWithMissingRequiredParams() {
        const err = await assert.doesThrowAsync(async () => {
            // @ts-ignore
            await this.instance.extract()
        })

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['libPath', 'unmangledNames'],
        })
    }

    @test()
    protected static async executesExpectedCommand() {
        let passedCmd = ''

        // @ts-ignore
        MangledNameExtractorImpl.execPromise = async (cmd: string) => {
            passedCmd = cmd
            return this.generateFakeExecReponse()
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

        errorAssert.assertError(err, 'LOAD_SYMBOLS_FAILED', {
            libPath: this.libPath,
            originalError: fakeError,
        })
    }

    @test()
    protected static async returnsExpectedResultWithOneMangledName() {
        const fakeStdout = this.generateFakeStdoutByNames(this.unmangledNames)
        this.setFakeExecPromise({ stdout: fakeStdout })

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
        MangledNameExtractorImpl.execPromise = async () => {
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
        return MangledNameExtractorImpl.Create()
    }
}
