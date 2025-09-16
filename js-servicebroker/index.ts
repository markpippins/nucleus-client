export function hello() {
  return "Hello from TypeScript!";
}

async function loadContent(page: RequestInfo | URL) {
  const content = await fetch(page).then(res => res.text());
  const mainContentElement = document.getElementById('main-content');
  if (mainContentElement) {
    mainContentElement.innerHTML = content;
  }
}

// Load home.html by default
loadContent('home.html');