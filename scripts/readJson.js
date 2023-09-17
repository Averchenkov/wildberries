export default async function readJSON(file) {
    const data = await fetch("././data/" + file)
        .then((res) => {
        return res.json();
    })
    return data
}