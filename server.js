import { Server } from "socket.io";
import http from "http";
import fs from "fs";

const server = http.createServer();
const io = new Server(server, {
  cors: { origin: "*" }
});

// Load your chatbot flow
const flow = JSON.parse(fs.readFileSync("./flow.json", "utf-8"));

// Recursive search for node by id
function findNodeById(node, id) {
  if (node.id === id) return node;
  if (node.next && node.next.length > 0) {
    for (const child of node.next) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
}

// Handle socket connection
io.on("connection", socket => {
  console.log("✅ User connected:", socket.id);

  // Send first node when user connects
  socket.emit("message", {
    text: flow.text,
    options: flow.next.map(n => ({ id: n.id, text: n.text }))
  });

  // Handle user’s choice event
  socket.on("choice", idx => {
    console.log(`📩 Received choice: ${idx}`);
    const node = findNodeById(flow, idx);

    if (!node) {
      socket.emit("message", {
        text: "❌ Invalid option. Please try again."
      });
      return;
    }

    // Prepare next options
    if (node.next && node.next.length > 0) {
      socket.emit("message", {
        text: node.text,
        options: node.next.map(n => ({ id: n.id, text: n.text }))
      });
    } else {
      // End of flow
      socket.emit("message", {
        text: node.text + " ✅ (End of flow)",
        options: []
      });
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🚀 Socket server running on http://localhost:3000");
});
