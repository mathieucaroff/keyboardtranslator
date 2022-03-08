import "antd/dist/antd.css"

import React, { useState } from "react"
import ReactDOM from "react-dom"

import { githubCornerHTML } from "./lib/githubCorner"
import { repository, version } from "../package.json"
import { UserInterface } from "./UserInterface"
import { createTranslator } from "./translator"
import { keyboardSet } from "./layout"

function main() {
    let div = document.createElement("div")
    div.innerHTML = githubCornerHTML(repository.url, version)
    document.body.appendChild(div)

    let title = document.getElementsByClassName("title")[0].textContent!
    let subtitle = document.getElementsByClassName("subtitle")[0].textContent!

    let titleDiv = document.getElementById("titleDiv")!
    titleDiv.parentElement!.removeChild(titleDiv)

    let appRoot = document.getElementById("appRoot")!
    ReactDOM.render(React.createElement(App, { title, subtitle }), appRoot)
}

interface AppProp {
    title: string
    subtitle: string
}

function App(prop: AppProp) {
    let search = new URLSearchParams(location.search)

    let [source, setSourceLayout] = useState(() => {
        return search.get("sourceLayout") || keyboardSet["azerty"]
    })
    let [destination, setDestinationLayout] = useState(() => {
        return search.get("destinationLayout") || keyboardSet["asset2018"]
    })
    let translator = createTranslator({ source, destination })

    return React.createElement(UserInterface, {
        ...prop,
        search,
        sourceLayout: source,
        destinationLayout: destination,
        setSourceLayout,
        setDestinationLayout,
        translator,
    })
}

main()
