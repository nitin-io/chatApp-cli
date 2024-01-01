import net from "node:net";
import readline from "node:readline";

const client = net.connect({ port: 8080 });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const usernameIn = new Promise((resolve) => {
  rl.question("Enter an username: ", (username) => {
    resolve(username);
  });
});

usernameIn.then((username) => {
  rl.on("line", (message) => {
    client.write(JSON.stringify({ username, message }));
  });
});

client.on("data", (data) => {
  console.log(data.toString());
});
