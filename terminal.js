const cmd = document.getElementById("cmd");
const hist = document.getElementById("hist");
const cmdHist = [];

window.addEventListener("load", () => {
  fetch();
});

window.addEventListener("keydown", (event) => { 
  event.preventDefault();
  getInput(event.key);
});

function getInput(input) {
  if (input == "Backspace") {
    cmd.textContent = cmd.textContent.substring(0, cmd.textContent.length - 1);
  } else if (input == "Enter") {
    execute(cmd.textContent);
  } else if (input == "ArrowUp") {
    cmd.textContent = cmdHist.pop();
  } else if (input.length > 1) {
    return;
  } else {
    cmd.textContent += input;
  }
}

function execute(cmdExe) {
  const lastCmdLine = document.createElement("p");
  const lastPrompt = document.createElement("span");
  const lastCmd = document.createElement("span");
  lastPrompt.classList.add("prompt");
  lastPrompt.textContent = "caleb@calebstein1.github.io";
  lastCmd.textContent = cmdExe
  lastCmdLine.appendChild(lastPrompt);
  lastCmdLine.innerHTML += " $ ";
  lastCmdLine.appendChild(lastCmd);
  hist.appendChild(lastCmdLine);

  switch (cmdExe) {
    case "ls":
      ls();
      break;
    case "ls Documents":
      ls("documents");
      break;
    case "ls Projects":
      ls("projects");
      break;
    case "cat":
      cat();
      break;
    case "cat Documents/about-me.txt":
      cat("about");
      break;
    case "cat Projects/calebstein-web.txt":
      cat("calebstein");
      break;
    case "cat Projects/private-events.txt":
      cat("events");
      break;
    case "cat Projects/shttr.txt":
      cat("shttr");
      break;
    case "cat Projects/ipak-edu-ppv.txt":
      cat("ipak");
      break;
    case "uname":
      uname();
      break;
    case "neofetch":
      fetch();
      break;
    case "clear":
      clearTerm();
      break;
    case "help":
      help();
      break;
    default:
      const returnValText = "Command not found, run 'help' to see what's available"
      const returnVal = document.createElement("p");
      returnVal.textContent = returnValText;
      hist.appendChild(returnVal);
  }

  cmdHist.push(cmd.textContent);
  window.scrollTo(0, document.body.scrollHeight);
  cmd.textContent = "";
}

function ls(lsDir) {
  let returnValText;
  if (lsDir == "documents") {
    returnValText = "about-me.txt";
  } else if (lsDir == "projects") {
    returnValText = "calebstein-web.txt private-events.txt shttr.txt ipak-edu-ppv.txt";
  } else {
    returnValText = "Documents Projects";
  }
  const returnVal = document.createElement("p");
  returnVal.textContent = returnValText;
  hist.appendChild(returnVal);
}

function cat(catFile) {
  let returngValText;
  if (catFile == "about") {
    returnValText = "Hi, welcome to my little corner of the internet, I'm glad you're here! I grew up in Seattle, WA, and graduated from Berklee College of Music in 2019 with a B.M. in Music Production & Engineering, specializing in recoridng hi-fi quality classical music. After spending some time back in Seattle recording music, I realized I was far too much of a Linux nerd to not be doing something in tech, so I decided to teach myself web development. I now live in the woods on Washington's Kitsap Peninsula making cool software and enjoying beautifully recorded classical music.";
  } else if (catFile == "calebstein") {
    returnValText = "The source code for calebstein.net. Demonstrates a more complex example of what can be built on the Shttr/Bootstrap stack by utilizing many of the deeper features provided by Shttr. It also shows how client-side Javascript can interact with Shttr's use of Turbo. <a href=\"https://calebstein.net/\">Visit Site</a>";
  } else if (catFile == "events") {
    returnValText = "The Private Events project from The Odin Project Ruby on Rails track. This project demonstrates modeling a many-to-many relationship using through tables, as well as different foreign key and class names. It also uses Turbo Frames to create an SPA-like UI without relying on frameworks like React.<a href=\"https://github.com/calebstein1/private-events\">View Code</a>";
  } else if (catFile == "shttr") {
    returnValText = "A full backend web framework built using shell scripts on a CGI enabled server. It sits somewhere between the simplicity of a static site generator and the complexity of a fully-featured framework such as Rails. <a href=\"https://shttr.io/\">Visit Site</a>";
  } else if (catFile == "ipak") {
    returnValText = "An on-demand video streaming service for IPAK-EDU courses. Written with Rails, using Bootstrap as the frontend framework and PostgreSQL as the database. <a href=\"https://ppv.ipak-edu.com/\">Visit Site</a>";
  } else {
    returnValText = "missing file";
  }
  const returnVal = document.createElement("p");
  returnVal.innerHTML = returnValText;
  hist.appendChild(returnVal);
}

function uname() {
  const returnValText = navigator.userAgent;
  const returnVal = document.createElement("p");
  returnVal.textContent = returnValText;
  hist.appendChild(returnVal);
}

function fetch() {
  const fetch = document.createElement("div");
  const fetchImg = document.createElement("img");
  const fetchText = document.createElement("div");
  const fetchTextList = document.createElement("ul");
  const user = document.createElement("li");
  const line = document.createElement("li");
  const platform = document.createElement("li");
  const os = document.createElement("li");
  const browser = document.createElement("li");
  const shell = document.createElement("li");

  fetch.classList.add("fetch");
  fetchImg.setAttribute("src", "me-ascii-art.png");
  fetchText.classList.add("fetch-text");
  user.textContent = "caleb@calebstein1.github.io";
  line.textContent = "---------------------------";
  platform.textContent = "Platform: Github Pages";
  os.textContent = `OS: ${navigator.platform}`;
  browser.textContent = `Browser: ${navigator.product}`;
  shell.textContent = "Shell: websh 0.1"

  fetchTextList.appendChild(user);
  fetchTextList.appendChild(line);
  fetchTextList.appendChild(platform);
  fetchTextList.appendChild(os);
  fetchTextList.appendChild(browser);
  fetchTextList.appendChild(shell);
  fetchText.appendChild(fetchTextList);
  fetch.appendChild(fetchImg);
  fetch.appendChild(fetchText);
  hist.appendChild(fetch);
}

function clearTerm() {
  hist.innerHTML = "";
}

function help() {
  const returnValText = "Welcome to websh! Websh is the perfect way to read about me and my projects if you prefer a crappy shell emulation that I put together in two hours after a couple of glasses of wine instead of my actual website, which can be found at <a href=\"https://calebstein.net/\">calebstein.net</a>. Available commands are: ls cat uname neofetch clear help";
  const returnVal = document.createElement("p");
  returnVal.innerHTML = returnValText;
  hist.appendChild(returnVal);
}
