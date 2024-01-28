const Access_key = "6yjAoLaRD0VFSzci6JxZTu99odWxLhgpAoaeA_55AAs"


const formEl = document.querySelector('form')
const userInput = document.querySelector('#input')
const button = document.querySelector('#search-button')
const loadMore = document.querySelector('#loadMore')
const result_container = document.querySelector('.card_wrapper')
// const downloadBtn = document.querySelector('#download')
let query = "";
let page = 1;
async function getImages() {
    if (page === 1) {
        result_container.innerHTML = ""
    }

    query = userInput.value

    if (!query) {
        getImagesOnLoad("nature")
        return alert('aka')

    }
    let url = `https://api.unsplash.com/search/photos/?query=${query}&page=${page}&client_id=${process.env.ACCESS_Key}`

    const response = await fetch(url)
    const data = await response.json()
    let results = await data.results

    results.map((result) => {
        createCard(result)
    })
    page = page + 1

    if (page > 1) {
        loadMore.style.display = "block";
    }
}


async function getImagesOnLoad(onLoadQuery) {


    let url = `https://api.unsplash.com/search/photos/?query=${onLoadQuery}&page=${page}&client_id=${Access_key}`

    const response = await fetch(url)
    const data = await response.json()
    let results = await data.results


    results.map((result) => {
        createCard(result)
    })

}
function createCard(result) {
    const div = document.createElement('div')
    div.classList.add('card')

    const img = document.createElement('img')
    img.src = result.urls.thumb
    img.alt = result.alt_description
    img.id = result.id

    div.appendChild(img)
    const downloadbtn = document.createElement('a')
    downloadbtn.href = result.links.download
    downloadbtn.textContent = "Download"
    downloadbtn.setAttribute('downlaod', "image")
    downloadbtn.classList.add('btn', 'download-btn')
    const desc = document.createElement('a')
    desc.textContent = result.alt_description

    desc.href = result.links.html
    div.appendChild(desc)
    div.appendChild(downloadbtn)
    result_container.appendChild(div)


}
formEl.addEventListener('submit', (event) => {
    event.preventDefault();

    page = 1
    getImages();
})

loadMore.addEventListener('click', () => {

    getImages();


})
window.addEventListener('load', () => {
    onLoadQuery = "nature"
    getImagesOnLoad(onLoadQuery)
})
