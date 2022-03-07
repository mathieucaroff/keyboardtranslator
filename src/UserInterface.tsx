import { Input, PageHeader, Select } from "antd"
import { useState } from "react"
import { keyboardSet, Translator } from "./translator"

const { TextArea } = Input
const { Option } = Select

export interface UserInterfaceProp {
    title: string
    subtitle: string
    translator: Translator
    setSource: (s: string) => void
    setDestination: (s: string) => void
}

export function UserInterface(prop: UserInterfaceProp) {
    let { title, subtitle, setSource, setDestination, translator } = prop
    let [state, setState] = useState(() => ({
        sourceText: "",
        destinationText: "",
    }))

    let keyboardLayoutArray = Object.keys(keyboardSet).map((name) => (
        <Option key={name} value={name}>
            {name}
        </Option>
    ))

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.location.assign(".")}
                title={title}
                subTitle={subtitle}
            ></PageHeader>
            Select the <b>wanted</b> keyboard layout
            <Select
                style={{ width: 120 }}
                onChange={(value) => setDestination(value)}
                defaultValue="asset2018"
            >
                {keyboardLayoutArray}
            </Select>
            <br />
            Select the <b>actual</b> keyboard layout
            <Select
                style={{ width: 120 }}
                onChange={(value) => setSource(value)}
                defaultValue="azerty"
            >
                {keyboardLayoutArray}
            </Select>
            <p>Actual input</p>
            <TextArea
                rows={4}
                onChange={(ev) => {
                    setState({
                        sourceText: ev.target.value,
                        destinationText: translator.translate(ev.target.value),
                    })
                }}
                value={state.sourceText}
            />
            <p>Wanted output</p>
            <TextArea
                rows={4}
                value={state.destinationText}
                onKeyDown={(ev) => {
                    setState({
                        sourceText:
                            state.sourceText + translator.codeToSource(ev.code, ev.shiftKey),
                        destinationText:
                            state.destinationText +
                            translator.codeToDestination(ev.code, ev.shiftKey),
                    })
                }}
            />
        </div>
    )
}
