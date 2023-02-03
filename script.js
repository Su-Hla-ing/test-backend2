/*const fetchData = async () => {
    const response = await fetch("http://localhost:3000/fileUpload", {
        method: "POST",
        body: JSON.stringify({"hello": "This is cat"})
    })
    console.log(await response.json())
}
fetchData()
*/
const handleClick = async () => {
    const inputTag = document.querySelector("#input");
    console.log(inputTag.files)

    const response = await fetch("http://localhost:3000/fileUpload", {
        method: "POST",
        body: inputTag.files[0]
    })
}
