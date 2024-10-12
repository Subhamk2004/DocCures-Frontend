function RandomColorGenerator() {
    let color = ''

    for (let i = 0; i < 3; i++) {
        let sub = Math.floor(Math.random() * 256).toString(16)
        color += (sub.length === 1 ? '0' + sub : sub)
    }
    console.log(color);

    return color
}

export default RandomColorGenerator;