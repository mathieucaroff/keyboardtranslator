export interface TranslatorProp {
    source: string
    destination: string
}

let codeLayout = `
Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal
KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Backslash
KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote
KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash
`
    .trim()
    .split("\n")
    .map((line) => line.split(" "))

export const keyboardSet: Record<string, string> = {
    azerty: `
    ²1234567890°+
    ²&é"'(-è_çà)=
    AZERTYUIOP¨£µ
    azertyuiop^$*
    QSDFGHJKLM%
    qsdfghjklmù
    WXCVBN?./§
    wxcvbn,;:!
    `,
    qwerty: `
    ~!@#$%^&*()_+
   \`1234567890-=
    QWERTYUIOP{}|
    qwertyuiop[]\\
    ASDFGHJKL:"
    asdfghjkl;'
    ZXCVBNM<>?
    zxcvbnm,./
    `,
    asset2018: `
    ~1234567890_+
   \`!@#$%^&*()-=
    QWDGJYPUL:{}|
    qwdgjypul;[]\\
    ASETFHNIOR"
    asetfhnior'
    ZXCVBKM<>?
    zxcvbkm,./
    `,
}

export function createTranslator(prop: TranslatorProp) {
    let { source, destination } = prop

    // Precompute the tables
    let codeSourceUpperTable = {}
    let codeSourceLowerTable = {}
    let codeDestinationUpperTable = {}
    let codeDestinationLowerTable = {}

    let characterTable = {}
    let sourceRowArray = keyboardSet[source].trim().split("\n")
    let destinationRowArray = keyboardSet[destination].trim().split("\n")
    sourceRowArray.forEach((sourceRow, ky) => {
        let codeRow = codeLayout[Math.floor(ky / 2)]
        let destinationRow = destinationRowArray[ky].trim()
        sourceRow
            .trim()
            .split("")
            .forEach((character, kx) => {
                characterTable[character] = destinationRow[kx] || character

                if (ky % 2 == 0) {
                    codeSourceUpperTable[codeRow[kx]] = character
                    codeDestinationUpperTable[codeRow[kx]] = destinationRow[kx]
                } else {
                    codeSourceLowerTable[codeRow[kx]] = character
                    codeDestinationLowerTable[codeRow[kx]] = destinationRow[kx]
                }
            })
    })

    sourceRowArray.forEach((sourceRow, key) => {
        let destinationRow = destinationRowArray[key].trim()
        sourceRow
            .trim()
            .split("")
            .forEach((character, k) => {
                characterTable[character] = destinationRow.charAt(k) || character
            })
    })

    return {
        translate(text: string) {
            return text
                .split("")
                .map((x) => characterTable[x] ?? x)
                .join("")
        },
        codeToSource(code: string, shift: boolean) {
            if (code === "Space") {
                return " "
            } else if (code === "Enter") {
                return "\n"
            } else if (shift) {
                return codeSourceUpperTable[code] ?? ""
            } else {
                return codeSourceLowerTable[code] ?? ""
            }
        },
        codeToDestination(code: string, shift: boolean) {
            if (code === "Space") {
                return " "
            } else if (code === "Enter") {
                return "\n"
            } else if (shift) {
                return codeDestinationUpperTable[code] ?? ""
            } else {
                return codeDestinationLowerTable[code] ?? ""
            }
        },
    }
}

export type Translator = ReturnType<typeof createTranslator>
