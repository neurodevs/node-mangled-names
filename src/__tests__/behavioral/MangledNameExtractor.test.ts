import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
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

    private static MangledNameExtractor() {
        return MangledNameExtractorImpl.Create()
    }
}
