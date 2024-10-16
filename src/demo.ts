import MangledNameExtractorImpl from './MangledNameExtractor'

async function run() {
    const instance = MangledNameExtractorImpl.Create()
    await instance.extract('/usr/local/lib/libxdf/libxdf.dylib', [
        'unmangledNames',
    ])
}

run().catch((err) => {
    console.error(err)
})
