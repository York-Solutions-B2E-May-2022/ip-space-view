async function runFetch(url, _fetch = fetch) {
    try {
        const response = await _fetch(url);
        if (!response.ok) {
            return 'response not ok'
        }

        const json = await response.json();
        return json;
    } catch (error) {
        return 'response not found'
    }
}

async function getIp() {
    const data = await runFetch('https://api.ipify.org/?format=json');
    return data?.ip;

}

async function getLocation(ip) {
    return await runFetch(`https://www.ipinfo.io/${ip}?token=4cca1d0904433e`);
}


async function renderLocation() {
    const ip = await getIp();
    const location = await getLocation(ip);
    console.log(location);
}

renderLocation()

async function test_runFetch_not_ok() {
    // arrange
    const expected = 'response not ok'
    const _fetch = async () => {
        return {
            ok: false
        }
    }

    // act
    const result = await runFetch('', _fetch)

    // assert
    if (result !== expected) {
        console.log('test_runFetch_not_ok - failed')
    } else {
        console.log('test_runFetch_not_ok - passed')
    }
}

async function test_runFetch_ok() {
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

    const result = await runFetch('', _fetch);

    if (result !== expected) {
        console.log('test_runFetch_ok - failed')
    } else {
        console.log('test_runFetch_ok - passed')
    }
}

async function test_runFetch_failed() {
    const expected = 'response not found';
    // const _fetch = () => {
    //     return new Promise((resolve, reject) =>{
    //         reject('fake-error')
    //     })
    // }

    const _fetch = async () => {
        throw false
    }

    const result = await runFetch('', _fetch);

    if (result !== expected) {
        console.log('test_runFetch_failed - failed')
    } else {
        console.log('test_runFetch_failed - passed')
    }
}

test_runFetch_not_ok()
test_runFetch_ok()
test_runFetch_failed()