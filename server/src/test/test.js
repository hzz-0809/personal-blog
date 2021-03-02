function test() {
    return Promise.reject("发生了未知错误！")
}

async function main() {
    let a = await test().catch(reason => {
        console.log(reason)
    });

}
main();