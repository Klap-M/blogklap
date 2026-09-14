/**
 * Blog Klap — TOC active state + mobile menu + TOC toggle
 */
(function () {
  /* --- Mobile nav toggle --- */
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      siteNav.classList.toggle('is-open', !expanded);
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
      });
    });
  }

  /* --- TOC mobile toggle --- */
  var toc = document.querySelector('.toc');
  var tocToggle = document.querySelector('.toc__toggle');

  if (toc && tocToggle) {
    tocToggle.addEventListener('click', function () {
      var expanded = tocToggle.getAttribute('aria-expanded') === 'true';
      tocToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      toc.classList.toggle('is-open', !expanded);
    });
  }

  /* --- TOC scroll spy --- */
  if (!toc) return;

  var links = toc.querySelectorAll('.toc__panel a[href^="#"], .toc ol a[href^="#"]');
  var headings = Array.from(links).map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  }).filter(Boolean);

  if (!headings.length) return;

  function updateActive() {
    var scrollY = window.scrollY + 120;
    var current = headings[0];

    headings.forEach(function (heading) {
      if (heading.offsetTop <= scrollY) current = heading;
    });

    links.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + current.id);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

/**
 * Tablas responsive: en mobile cada fila se muestra como tarjeta.
 * Copia los encabezados del thead a data-label en cada td.
 */
(function () {
  document.querySelectorAll('.prose table').forEach(function (table) {
    var headers = Array.from(table.querySelectorAll('thead th')).map(function (th) {
      return th.textContent.trim();
    });

    if (!headers.length) return;

    table.querySelectorAll('tbody tr').forEach(function (row) {
      row.querySelectorAll('td').forEach(function (cell, index) {
        if (headers[index]) {
          cell.setAttribute('data-label', headers[index]);
        }

        if (index === 0) return;

        var text = cell.textContent.trim();
        if (text === '✓' || text === 'Si' || text === 'Sí') {
          cell.classList.add('table-cell--yes');
        } else if (text === '—' || text === '-' || text === 'No') {
          cell.classList.add('table-cell--no');
        }
      });
    });
  });
})();

/**
 * Barra de progreso de lectura
 */
(function () {
  var bar = document.querySelector('.reading-progress__bar');
  var track = document.querySelector('.reading-progress');
  if (!bar) return;

  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    var percent = height > 0 ? Math.min(100, Math.max(0, (scrollTop / height) * 100)) : 0;
    bar.style.width = percent + '%';
    if (track) track.setAttribute('aria-valuenow', String(Math.round(percent)));
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
})();

/**
 * Widget de cuota variable (artículo de financiamiento)
 */
(function () {
  var widget = document.querySelector('[data-quota-visual]');
  if (!widget) return;

  var range = widget.querySelector('input[type="range"]');
  var fillSales = widget.querySelector('[data-sales-fill]');
  var fillQuota = widget.querySelector('[data-quota-fill]');
  var salesLabel = widget.querySelector('[data-sales-amount]');
  var quotaLabel = widget.querySelector('[data-quota-amount]');
  var percent = parseFloat(widget.getAttribute('data-percent')) || 8;

  if (!range) return;

  function formatCLP(n) {
    return '$' + Math.round(n).toLocaleString('es-CL');
  }

  function update() {
    var max = Number(range.max) || 1;
    var sales = Number(range.value);
    var quota = sales * (percent / 100);
    var salesPct = (sales / max) * 100;
    var quotaPct = Math.min(100, (quota / (max * (percent / 100))) * 100);

    if (fillSales) fillSales.style.height = salesPct + '%';
    if (fillQuota) fillQuota.style.height = quotaPct + '%';
    if (salesLabel) salesLabel.textContent = formatCLP(sales);
    if (quotaLabel) quotaLabel.textContent = formatCLP(quota);
  }

  range.addEventListener('input', update);
  update();
})();

/**
 * Flip-cards: tap en mobile además del hover
 */
(function () {
  document.querySelectorAll('.flip-card').forEach(function (card) {
    if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('click', function () {
      card.classList.toggle('is-flipped');
    });

    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });
})();
