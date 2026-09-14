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
  var salesLabels = widget.querySelectorAll('[data-sales-amount]');
  var quotaLabels = widget.querySelectorAll('[data-quota-amount]');
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
    salesLabels.forEach(function (el) { el.textContent = formatCLP(sales); });
    quotaLabels.forEach(function (el) { el.textContent = formatCLP(quota); });

    var scenario = widget.querySelector('[data-quota-scenario]');
    if (scenario) {
      if (sales < max * 0.4) {
        scenario.textContent = 'Ventas bajas: la cuota disminuye y tu caja no se asfixia.';
      } else if (sales > max * 0.75) {
        scenario.textContent = 'Temporada alta: pagas más porque vendes más, y el financiamiento se cubre solo.';
      } else {
        scenario.textContent = 'Ventas normales: la cuota se mantiene proporcional a tu flujo real.';
      }
    }
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

/**
 * Mapa del local con hotspots (Multiservicios)
 */
(function () {
  var map = document.querySelector('[data-store-map]');
  if (!map) return;

  var buttons = map.querySelectorAll('[data-hotspot]');
  var panels = map.querySelectorAll('[data-hotspot-panel]');

  function activate(id) {
    buttons.forEach(function (button) {
      var on = button.getAttribute('data-hotspot') === id;
      button.classList.toggle('is-active', on);
      button.setAttribute('aria-expanded', on ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      var on = panel.getAttribute('data-hotspot-panel') === id;
      panel.hidden = !on;
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      activate(button.getAttribute('data-hotspot'));
    });
    button.addEventListener('mouseenter', function () {
      activate(button.getAttribute('data-hotspot'));
    });
    button.addEventListener('focus', function () {
      activate(button.getAttribute('data-hotspot'));
    });
  });

  activate('1');
})();

/**
 * Barras de métricas: animan al entrar en viewport
 */
(function () {
  document.querySelectorAll('[data-metric-bars]').forEach(function (el) {
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-inview');
      return;
    }

    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-inview');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    io.observe(el);
  });
})();

/**
 * Checklist interactivo (expansión / segundo local)
 */
(function () {
  document.querySelectorAll('[data-check-list]').forEach(function (list) {
    var boxes = list.querySelectorAll('input[type="checkbox"]');
    var counter = list.querySelector('[data-check-count]');

    function update() {
      var n = 0;
      boxes.forEach(function (box) {
        if (box.checked) n += 1;
      });
      if (counter) counter.textContent = n + ' de ' + boxes.length + ' listos';
    }

    boxes.forEach(function (box) {
      box.addEventListener('change', update);
    });
    update();
  });
})();
