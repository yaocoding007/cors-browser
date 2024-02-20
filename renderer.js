/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const loading = document.getElementById('loading')

loading.style.display = 'none'

const setButton = document.getElementById('btn')

// 获取输入框
const urlInput = document.getElementById('url')

function go2Page() {
    const url = urlInput.value
    if(!url) {
        alert('请输入URL')
        return
    }
    const list = localStorage.getItem('list')
    const listData = list ? JSON.parse(list) : []
    const newList = [url, ...listData].slice(0, 5)
    localStorage.setItem('list', JSON.stringify(newList))
    loading.style.display = 'block'
    window.EDK.showPage(url)
}

urlInput.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    go2Page()
  }
});

setButton.addEventListener('click', () => {
    go2Page();
})


const list = localStorage.getItem('list')
const listData = list ? JSON.parse(list) : []
const listEl = document.getElementById('history')
listData.forEach((url) => {
    const li = document.createElement('li')
    li.textContent = url
    li.addEventListener('click', () => {
        const urlInput = document.getElementById('url')
        urlInput.value = url
        urlInput.focus();
    })
    listEl.appendChild(li)
})