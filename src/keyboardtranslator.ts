import "antd/dist/antd.css"

import React, { useState } from "react"
import ReactDOM from "react-dom"

import { githubCornerHTML } from "./lib/githubCorner"
import { repository, version } from "../package.json"
import { UserInterface } from "./UserInterface"
import { createTranslator } from "./translator"

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
    let [source, setSource] = useState("azerty")
    let [destination, setDestination] = useState("asset2018")
    let translator = createTranslator({ source, destination })

    return React.createElement(UserInterface, { ...prop, setSource, setDestination, translator })
}

main()
