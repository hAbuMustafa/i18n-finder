const terms = [];
const term = document.querySelector('#term');
const results = document.querySelector('#results');

(async function getTerms() {
  return await fetch('https://raw.githubusercontent.com/softvenue/i18n/master/i18n.json')
    .then((response) => response.json())
    .then((data) => terms.push(...data));
})();

term.addEventListener('input', (e) => {
  term.style.direction = e.target.value === '' ? 'rtl' : 'ltr';
  if (e.target.value === '' || e.target.value.length < 3) {
    results.innerHTML = '';
    return;
  }
  const filteredResults = terms.filter((item) =>
    item.term.toLowerCase().includes(e.target.value.toLowerCase())
  );
  results.innerHTML = filteredResults.length
    ? filteredResults
        .map(
          (item) => `
      <div class="result">
        <h4 dir="ltr">🔤 ${item.term.replace(
          new RegExp(e.target.value, 'gi'),
          `<span class="hl">${e.target.value.toUpperCase()}</span>`
        )}</h4>
        <ul>
            ${
              Array.isArray(item.wAR)
                ? item.wAR.map((meaning) => `<li>${meaning}</li>`).join('')
                : `<li>${item.wAR}</li>`
            }
        </ul>
      </div>
    `
        )
        .join('')
    : `
    <div class="no-results">
      لا توجد نتيجة للبحث المطلوب: ${e.target.value}
    </div>
    `;
});

function lockFocus() {
  term.focus();
  term.select();
}

lockFocus();

document.addEventListener('click', () => {
  lockFocus();
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') lockFocus();
});
