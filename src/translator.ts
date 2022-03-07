import { codeLayout } from "./layout"

export interface TranslatorProp {
    source: string
    destination: string
}

export function createTranslator(prop: TranslatorProp) {
    let { source, destination } = prop

    // Precompute the tables
    let codeSourceUpperTable = {}
    let codeSourceLowerTable = {}
    let codeDestinationUpperTable = {}
    let codeDestinationLowerTable = {}

    let characterTable = {}
    let sourceRowArray = source.trim().split("\n")
    let destinationRowArray = destination.trim().split("\n")
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
