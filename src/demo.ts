import MangledNameExtractorImpl from './MangledNameExtractor'

async function run() {
    const instance = MangledNameExtractorImpl.Create()

    const result = await instance.extract(
        '/usr/local/lib/libxdf/libxdf.dylib',
        ['load_xdf']
    )

    console.log(result)
}

run().catch((err) => {
    console.error(err)
})
