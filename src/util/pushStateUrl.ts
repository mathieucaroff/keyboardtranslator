export function pushStateUrl(data: Record<string, string>, window: Window) {
    let url = new URL(window.location.href)
    Object.entries(data).forEach(([key, value]) => {
        if (value) {
            url.searchParams.set(key, value)
        } else {
            url.searchParams.delete(key)
        }
    })

    window.history.pushState({}, "", "" + url)
}
