// handle template literal

export function templateLiteralIdentity(content: TemplateStringsArray, ...interpolated: string[]) {
    let result: string[] = []
    interpolated.forEach((v, k) => {
        result.push(content[k], v.toString())
    })
    result.push(content.slice(-1)[0])
    return result.join("")
}

export function trim(content: TemplateStringsArray, ...interpolated: string[]) {
    let result = templateLiteralIdentity(content, ...interpolated)
    return result
        .trim()
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
}
