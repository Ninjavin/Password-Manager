'use strict'

const { ipcRenderer } = require('electron');

const deletePassword = (e) => {
    console.log("e: ", e);
    console.log("e.target: ", e.target)
    ipcRenderer.send('delete-password', e.target.textContent)
}

document.getElementById('createPasswordBtn').addEventListener('click', () => {
    ipcRenderer.send('add-password-window')
})

ipcRenderer.on('passwordData', (event, passwords) => {
    const passwordTable = document.getElementById('passwordTable')

    console.log(passwords)

    const passwordItems = passwords.reduce((html, password) => {
        
        html += `<tr class="password-item">
            <td>${password.Description}</td>
            <td>${password.Username}</td>
            <td>${password.Password}</td>
        </tr>`;
        return html
    }, '')

    passwordTable.innerHTML = passwordItems

    passwordTable.querySelectorAll('.password-item').forEach(item => {
        item.addEventListener('click', deletePassword)
    })
})
