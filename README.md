---

# 🧠 Chatbot Flow with Socket.io & JSON

A simple **Node.js + Socket.io** chatbot that dynamically responds based on a **JSON-defined conversation flow**.
This project includes both **server** and **client** sides, and a ready-to-use example of how to represent and traverse deeply nested conversation trees.

---

## ⚙️ Tools & Technologies Used

| Tool / Library            | Purpose                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Node.js**               | Runtime environment for running JavaScript on the backend.                                                          |
| **Socket.io**             | Enables real-time, bidirectional communication between client and server (used for chat messages and user choices). |
| **Express / HTTP module** | Creates a lightweight HTTP server that Socket.io can attach to.                                                     |
| **JSON**                  | Defines the chatbot conversation flow in a structured, easy-to-modify format.                                       |
| **HTML + JavaScript**     | Client-side chat UI that connects to the Socket.io server and displays messages dynamically.                        |
| **Mermaid (optional)**    | Used to visualize the JSON flow as a flowchart for documentation or debugging.                                      |

---

## 🧩 Project Structure

```
chatbot-flow/
├── server.js         # Node.js Socket.io server
├── flow.json         # Conversation flow definition
├── client.html       # Simple browser-based chat interface
├── README.md         # Project documentation
```

---

## 🚀 How It Works

1. **Server (server.js)**

   * Loads the conversation tree from `flow.json`.
   * Listens for socket connections (`io.on('connection')`).
   * Sends the initial message when a user connects.
   * On receiving a `"choice"` event from the client, it looks up the next node using a recursive `findNodeById()` function and replies with new options.

2. **Client (client.html)**

   * Connects to `http://localhost:3000` using Socket.io.
   * Displays messages from the server as chat bubbles.
   * Shows clickable options for each step.
   * When a user clicks an option, it sends that node’s ID back to the server via `"choice"` event.

3. **Flow JSON (flow.json)**

   * Defines how each conversation node is linked.
   * Each node has:

     ```json
     {
       "id": "A",
       "text": "Hi 👋",
       "next": [ ... child nodes ... ]
     }
     ```

4. **Mermaid Command to paste on https://mermaid.live/ for visual flow**

   flowchart TD
    A[Hi 👋] --> B[How can I help you today?]
    B --> C[Book a Ticket 🎫]
    B --> D[Cancel Ticket ❌]
    B --> Z[Talk to Customer Support ☎️]
    C --> G[Are you an existing user?]
    G --> H[Yes, Existing User]
    G --> I[No, New User]
    H --> H1[Please login to your account]
    H1 --> E[Confirm Booking ✅]
    E --> F[Thank you! 🎉 Your ticket is booked.]
    E --> B[← Go back to Help]
    I --> I1[Please register with your details]
    I1 --> E[Confirm Booking ✅]
    D --> E1[Enter your booking ID]
    E1 --> E2[Your ticket has been canceled.]
    E2 --> B[← Go back to Help]
    Z --> Z1[Connecting you to our support agent...]
    Z1 --> Z2[Agent joined the chat 💬]


---

## 🧰 Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install socket.io
```

### 2️⃣ Start the server

```bash
node server.js
```

### 3️⃣ Open the client

* Open `client.html` in your browser.
* You’ll see the chatbot greeting and interactive choices.

---

## 💡 Example Interaction

```
Bot: Hi 👋
[Book a Ticket 🎫]
[Cancel Ticket ❌]
[Talk to Support ☎️]

User clicks "Book a Ticket 🎫"

Bot: Are you an existing user?
[Yes, Existing User]
[No, New User]
```

---

## 🧠 Key Concepts Learned

✅ How to build a real-time chatbot using Socket.io
✅ How to structure conversation flows using JSON
✅ How to dynamically traverse deeply nested trees
✅ How to render flows visually using Mermaid

---

## 🧾 License

MIT License — Feel free to use, modify, and share.

---

Would you like me to add a **“Quick Demo GIF section”** and command to auto-generate Mermaid flow from `flow.json` (for documentation)? It makes the README visually impressive.
