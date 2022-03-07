import { trim } from "./util/templateLiteral"

// codeLayout lists the code names of the keyboard keys. N.B Enter and Space are not listed.
export let codeLayout = trim`
    Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal
    KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Backslash
    KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote
    KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash
    `
    .split("\n")
    .map((line) => line.split(" "))

// keyboardSet maps keyboard names to their description
export const keyboardSet: Record<string, string> = {
    azerty: trim`
    ²1234567890°+
    ²&é"'(-è_çà)=
    AZERTYUIOP¨£µ
    azertyuiop^$*
    QSDFGHJKLM%
    qsdfghjklmù
    WXCVBN?./§
    wxcvbn,;:!
    `,
    qwerty: trim`
    ~!@#$%^&*()_+
   \`1234567890-=
    QWERTYUIOP{}|
    qwertyuiop[]\\
    ASDFGHJKL:"
    asdfghjkl;'
    ZXCVBNM<>?
    zxcvbnm,./
    `,
    asset2018: trim`
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
