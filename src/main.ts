import './style.css';

export function main() {
  const appEl = document.createElement('div');
  appEl.id = 'app';
  document.body.append(appEl);

  appEl.innerHTML = `
  <div>
    This is a test content
  </div>
`;
}

main();
