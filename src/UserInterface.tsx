import { Col, Input, PageHeader, Row, Select } from "antd"
import { useEffect, useState } from "react"
import { keyboardSet } from "./layout"
import { Translator } from "./translator"
import { pushStateUrl } from "./util/pushStateUrl"

const { TextArea } = Input
const { Option } = Select

export interface UserInterfaceProp {
    title: string
    subtitle: string
    search: URLSearchParams
    translator: Translator
    sourceLayout: string
    destinationLayout: string
    setSourceLayout: (layout: string) => void
    setDestinationLayout: (layout: string) => void
}

export function UserInterface(prop: UserInterfaceProp) {
    let [state, setState] = useState(() => {
        let sourceLayoutName = "azerty"
        let destinationLayoutName = "asset2018"

        if (prop.search.has("sourceLayout")) {
            sourceLayoutName = "other"
        }
        if (prop.search.has("destinationLayout")) {
            destinationLayoutName = "other"
        }

        return {
            sourceLayoutName,
            destinationLayoutName,
            sourceText: "",
            destinationText: "",
        }
    })

    useEffect(() => {
        let { sourceLayout } = prop
        if (state.sourceLayoutName !== "other") {
            sourceLayout = ""
        }
        pushStateUrl({ sourceLayout }, window)
    }, [state.sourceLayoutName === "other", prop.sourceLayout])

    useEffect(() => {
        let { destinationLayout } = prop
        if (state.destinationLayoutName !== "other") {
            destinationLayout = ""
        }
        pushStateUrl({ destinationLayout }, window)
    }, [state.destinationLayoutName === "other", prop.destinationLayout])

    let keyboardLayoutArray = Object.keys(keyboardSet).map((name) => (
        <Option key={name} value={name}>
            {name}
        </Option>
    ))
    keyboardLayoutArray.push(
        <Option key="last" value="other">
            other
        </Option>,
    )

    return (
        <div>
            <PageHeader
                ghost={false}
                onBack={() => window.location.assign(".")}
                title={prop.title}
                subTitle={prop.subtitle}
            ></PageHeader>

            <Row>
                <Col span={12}>
                    {/* ACTUAL KEYBOARD LAYOUT DESCRIPTION */}
                    Describe the <b>actual</b> keyboard layout
                    <Select
                        style={{ width: 120, margin: "5px 1em" }}
                        onChange={(name) => {
                            if (name !== "other") {
                                prop.setSourceLayout(keyboardSet[name])
                            }
                            setState({ ...state, sourceLayoutName: name })
                        }}
                        value={state.sourceLayoutName}
                    >
                        {keyboardLayoutArray}
                    </Select>
                    <TextArea
                        rows={8}
                        disabled={state.sourceLayoutName !== "other"}
                        onChange={(ev) => {
                            prop.setSourceLayout(ev.target.value)
                        }}
                        value={prop.sourceLayout}
                    />
                </Col>
                <Col span={12}>
                    {/* WANTED KEYBOARD LAYOUT DESCRIPTION */}
                    Describe the <b>wanted</b> keyboard layout
                    <Select
                        style={{ width: 120, margin: "5px 1em" }}
                        onChange={(name) => {
                            if (name !== "other") {
                                prop.setDestinationLayout(keyboardSet[name])
                            }
                            setState({ ...state, destinationLayoutName: name })
                        }}
                        value={state.destinationLayoutName}
                    >
                        {keyboardLayoutArray}
                    </Select>
                    <TextArea
                        rows={8}
                        disabled={state.destinationLayoutName !== "other"}
                        onChange={(ev) => {
                            prop.setDestinationLayout(ev.target.value)
                        }}
                        value={prop.destinationLayout}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    {/*  */}
                    {/* INPUT and OUTPUT */}
                    <p>Actual input</p>
                    <TextArea
                        rows={4}
                        onChange={(ev) => {
                            setState({
                                ...state,
                                sourceText: ev.target.value,
                                destinationText: prop.translator.translate(ev.target.value),
                            })
                        }}
                        value={state.sourceText}
                    />
                </Col>
                <Col span={12}>
                    <p>Wanted output</p>
                    <TextArea
                        rows={4}
                        value={state.destinationText}
                        onKeyDown={(ev) => {
                            setState({
                                ...state,
                                sourceText:
                                    state.sourceText +
                                    prop.translator.codeToSource(ev.code, ev.shiftKey),
                                destinationText:
                                    state.destinationText +
                                    prop.translator.codeToDestination(ev.code, ev.shiftKey),
                            })
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}
