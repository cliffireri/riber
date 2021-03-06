
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages')

//get username and room from url

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

console.log(username, room)

const socket = io();

socket.on('message', message => {
    console.log(message)
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    //emit message to server
    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = ''

    e.target.elements.msg.focus()
})

//output message to DOM
function outputMessage(msg){
    const div = document.createElement('div');
    div.classList.add('message');
div.innerHTML = `<p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p class="text">
        ${msg.message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}