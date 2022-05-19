async function fetchIP(_fetch = fetch) {
    try {
        const response = await _fetch('https://www.api.ipify.org?format=json');
        if (!response.ok) {
            return 'response not ok'
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error.message);
        return 'response not found'
    }
}

async function test_fetchIP_not_ok() {
    // arrange
    const expected = 'response not ok'
    const _fetch = async () => {
        return {
            ok: false
        }
    }

    // act
    const result = await fetchIP(_fetch)

    // assert
    if (result !== expected) {
        console.log('test_fetchIP_not_ok - failed')
    } else {
        console.log('test_fetchIP_not_ok - passed')
    }
}
async function test_fetchIP_ok() {
    // arrange
    const expected = true;
    const _fetch = async () => {
        return {
            ok: true,
            json: async () => {
                return true;
            }
        }
    }

    const result = await fetchIP(_fetch);

    if (result !== expected) {
        console.log('test_fetchIP_ok - failed')
    } else {
        console.log('test_fetchIP_ok - passed')
    }
}
async function test_fetchIP_failed() {
    const expected = 'response not found';
    // const _fetch = () => {
    //     return new Promise((resolve, reject) =>{
    //         reject('fake-error')
    //     })
    // }

    const _fetch = async () => {
        throw new Error('fake-error')
    }

    const result = await fetchIP(_fetch);

    if (result !== expected) {
        console.log('test_fetchIP_failed - failed')
    } else {
        console.log('test_fetchIP_failed - passed')
    }
}

test_fetchIP_not_ok()
test_fetchIP_ok()
test_fetchIP_failed()