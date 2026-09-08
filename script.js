document.addEventListener('DOMContentLoaded', () => {
  const nameLine = document.getElementById('typed-line');
  const roleLine = document.getElementById('line-role');
  const text = 'Rafael Alves';
  const role = 'estudante de ADS — em busca de estágio em TI';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    nameLine.textContent = text;
    roleLine.textContent = role;
    return;
  }

  let i = 0;
  function typeName() {
    if (i <= text.length) {
      nameLine.textContent = text.slice(0, i);
      i++;
      setTimeout(typeName, 60);
    } else {
      setTimeout(typeRole, 200);
    }
  }

  let j = 0;
  function typeRole() {
    if (j <= role.length) {
      roleLine.textContent = role.slice(0, j);
      j++;
      setTimeout(typeRole, 22);
    }
  }

  typeName();
});
