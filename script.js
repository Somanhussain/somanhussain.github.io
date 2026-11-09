const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const assistantToggle = document.querySelector(".assistant-toggle");
const assistantPanel = document.getElementById("assistant-panel");
const assistantInput = document.getElementById("assistant-input");
const assistantMessages = document.getElementById("assistant-messages");
const assistantForm = document.getElementById("assistant-form");
const assistantClose = document.querySelector("[data-assistant-close]");

const assistantAnswers = [
  {
    keywords: ["study", "education", "college", "degree", "course", "university"],
    answer: "Abdul is pursuing a B.Tech in Computer Science and Engineering at Royal College of Engineering and Technology, Thrissur."
  },
  {
    keywords: ["skill", "program", "language", "technology", "tech stack"],
    answer: "The portfolio lists C, Python, HTML, CSS, JavaScript, data structures, and algorithms. Abdul is also exploring Git and responsive web design."
  },
  {
    keywords: ["project", "work", "build", "portfolio"],
    answer: "The portfolio describes C sorting and searching practice programs and this personal portfolio website. The third project card is a placeholder for future work."
  },
  {
    keywords: ["location", "where", "based", "live", "city"],
    answer: "Abdul is based in Palakkad, Kerala, India."
  },
  {
    keywords: ["contact", "connect", "linkedin", "reach", "social"],
    answer: "You can connect with Abdul on LinkedIn: linkedin.com/in/abdul-asif-a-290b62373."
  },
  {
    keywords: ["github", "email", "mail"],
    answer: "There isn’t a confirmed personal email or GitHub profile linked here yet. You can connect with Abdul on LinkedIn: linkedin.com/in/abdul-asif-a-290b62373."
  },
  {
    keywords: ["who", "name", "about", "abdul"],
    answer: "Abdul Asif A. is a Computer Science and Engineering student who enjoys learning technology and building useful digital experiences."
  }
];

function addAssistantMessage(text, kind) {
  const message = document.createElement("p");
  message.className = `assistant-message ${kind}`;
  message.textContent = text;
  assistantMessages.append(message);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function answerAssistantQuestion(question) {
  const normalizedQuestion = question.toLowerCase();
  const match = assistantAnswers.find(({ keywords }) =>
    keywords.some(keyword => normalizedQuestion.includes(keyword))
  );
  return match?.answer ?? "I can answer questions about Abdul’s education, skills, projects, location, or LinkedIn. Try asking about one of those.";
}

function askAssistant(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addAssistantMessage(cleanQuestion, "assistant-question");
  addAssistantMessage(answerAssistantQuestion(cleanQuestion), "assistant-reply");
}

assistantToggle.addEventListener("click", () => {
  const isOpening = assistantPanel.hidden;
  assistantPanel.hidden = !isOpening;
  assistantToggle.setAttribute("aria-expanded", String(isOpening));
  if (isOpening) assistantInput.focus();
});

assistantClose.addEventListener("click", () => {
  assistantPanel.hidden = true;
  assistantToggle.setAttribute("aria-expanded", "false");
  assistantToggle.focus();
});

assistantForm.addEventListener("submit", event => {
  event.preventDefault();
  askAssistant(assistantInput.value);
  assistantInput.value = "";
  assistantInput.focus();
});

document.querySelectorAll("[data-assistant-prompt]").forEach(button => {
  button.addEventListener("click", () => askAssistant(button.dataset.assistantPrompt));
});

assistantPanel.addEventListener("keydown", event => {
  if (event.key === "Escape") assistantClose.click();
});

let pointerUpdatePending = false;
document.addEventListener("pointermove", event => {
  if (pointerUpdatePending || event.pointerType === "touch") return;
  pointerUpdatePending = true;
  window.requestAnimationFrame(() => {
    document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    pointerUpdatePending = false;
  });
}, { passive: true });

// Replace this with your real email address in index.html.
