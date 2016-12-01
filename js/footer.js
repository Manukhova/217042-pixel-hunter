export default (data) => `<div class="stats">
  <ul class="stats">
    ${data.statsOne.map((result) => `<li class="stats__result stats__result--${result}"></li>`).join('\n')}
  </ul>
</div>`;
