'use strict'

const { ipcRenderer } = require('electron');

document.getElementById('passwordForm').addEventListener('submit', (evt) => {
    evt.preventDefault()
    const input = evt.target[0]
    const input2 = evt.target[1];
    const input3 = evt.target[2];
    
    ipcRenderer.send('add-password', { Description: input.value, Username: input2.value, Password: input3.value })

    input.value = "";
    input2.value = "";
    input3.value = "";

})