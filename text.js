// 1234 = DBFHY$^&%$^%#$%WSGERHE^%$$YBVBD

const bcrypt = require("bcrypt")

async function test() {
    const password = "12345"


    const hash1 = await bcrypt.hash(password, 10)

    const result = await bcrypt.compare("1235", hash1)

    console.log(result)

    console.log(hash1)

}

test()