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
        }

        await this.extract()
        assert.isEqual(passedCmd, `nm -g ${this.libPath}`)
    }

    private static async extract() {
        await this.instance.extract(this.libPath, this.unmangledNames)
    }

    private static readonly libPath = generateId()

    private static readonly unmangledNames = [generateId()]

    private static MangledNameExtractor() {
        return MangledNameExtractorImpl.Create()
    }
}
