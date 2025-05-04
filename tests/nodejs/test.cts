import module = require("../../dist/index.cjs")

(async () =>
{
    const user = await module.SillyVUser.fetch("n1ghtthef0x")
    console.dir(user)
    const chars = await user.getCharacters()
    console.dir(chars)
    const drawings = await user.getDrawings({showNsfw: false,sortBy: "newest",limit: 40})
    console.dir(drawings)
    const layouts = await user.getLayoutAvatars()
    console.dir(layouts)
})()