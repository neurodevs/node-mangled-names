import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
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
        assert.isTruthy(this.instance)
    }

    @test()
    protected static async throwsWithMissingRequiredParams() {
        const err = assert.doesThrow(() => {
            // @ts-ignore
            this.instance.extract()
        })

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['libPath', 'unmangledNames'],
        })
    }

    private static MangledNameExtractor() {
        return MangledNameExtractorImpl.Create()
    }
}
