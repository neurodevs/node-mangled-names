import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import MangledNameExtractorImpl, {
    MangledNameExtractor,
} from '../../MangledNameExtractor'

export default class MangledNameExtractorTest extends AbstractSpruceTest {
    private static instance: MangledNameExtractor

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
        this.setFakeExecPromise(fakeError)

        const err = await assert.doesThrowAsync(async () => {
            await this.extract()
        })

        errorAssert.assertError(err, 'LOAD_SYMBOLS_FAILED', {
            libPath: this.libPath,
            originalError: fakeError,
        })
    }

    private static setFakeExecPromise(stdError?: string) {
        // @ts-ignore
        MangledNameExtractorImpl.execPromise = async () => {
            return this.generateFakeExecReponse(stdError)
        }
    }

    private static generateFakeExecReponse(stderr?: string) {
        return { stderr: stderr ?? '' }
    }

    private static async extract() {
        return await this.instance.extract(this.libPath, this.unmangledNames)
    }

    private static readonly libPath = generateId()

    private static readonly unmangledNames = [generateId()]

    private static MangledNameExtractor() {
        return MangledNameExtractorImpl.Create()
    }
}
