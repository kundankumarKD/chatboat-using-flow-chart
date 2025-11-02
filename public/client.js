const socket = io();
const chat   = document.getElementById('chat');
const opts   = document.getElementById('options');
const diagramDiv = document.getElementById('diagram');

mermaid.initialize({ startOnLoad: false, theme: 'neutral' });

// ---- render a bubble ------------------------------------------------
function addBubble(text, type = 'bot') {
  const div = document.createElement('div');
  div.className = `msg ${type}`;
  div.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// ---- render option buttons -----------------------------------------
function renderOptions(list) {
    console.log("rendering options:", list);
  opts.innerHTML = '';
  list.forEach(obj => {
    const btn = document.createElement('button');
    btn.textContent = obj.label;
    btn.onclick = () => {
      addBubble(obj.label, 'user');
      console.log(obj.next, "user chose option", obj.label);
      socket.emit('choice', obj.next);
      opts.innerHTML = '';
    };
    opts.appendChild(btn);
  });
}

// ---- socket listeners -----------------------------------------------
socket.on('bot', data => addBubble(data.text, 'bot'));
socket.on('options', data => renderOptions(data.options));

// ---- optional: show the original Mermaid diagram --------------------
const MERMAID_SRC = `
flowchart TD
    A[Hi] --> B[How can I help?]
    B --> C[Book ticket]
    B --> D[Cancel ticket]
    C --> E[Confirm]
    D --> E
    E --> F[Thank you]
    E --> B[← Go back to Help]
`;

mermaid.render('diagram-svg', MERMAID_SRC).then(({svg}) => {
  diagramDiv.innerHTML = `<details><summary>View Flowchart</summary>${svg}</details>`;
});