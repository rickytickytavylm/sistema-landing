/**
 * Тест-навигатор по направлениям для лендинга.
 * Полностью клиентский: 5 вопросов -> баллы 6 направлениям -> результат
 * с рекомендованной программой и ссылкой на страницу направления.
 * Не требует бэкенда и внешних зависимостей.
 */
(function () {
  'use strict';

  var APP_URL = 'https://\u0441\u0438\u0441\u0442\u0435\u043c\u0430-\u043c\u043e\u043b\u043e\u0434\u0446\u043e\u0432\u0430.\u0440\u0444/';

  // Порядок разрешения ничьей (базовый маршрут — в конце).
  var TIE_ORDER = ['relationships', 'selfworth', 'body', 'calm', 'communication', 'selfstudy'];

  var DIRECTIONS = {
    selfstudy: {
      title: 'Понять себя глубже',
      why: 'Хочется разобраться в своих чувствах, потребностях и реакциях — это база, с которой начинается всё остальное.',
      program: 'Гештальт-подход',
      programDesc: 'Контакт, границы, эмоции и возвращение к себе',
      img: 'assets/find_myself.webp',
      href: 'directions/selfstudy/',
    },
    relationships: {
      title: 'Отношения / созависимость',
      why: 'Вас цепляют повторяющиеся сценарии в отношениях — пора вернуть себе опору и здоровые границы.',
      program: 'Созависимость',
      programDesc: 'Выход из созависимых сценариев и здоровый контакт',
      img: 'assets/coda2.webp',
      href: 'directions/relationships/',
    },
    selfworth: {
      title: 'Самооценка и опора',
      why: 'Много самокритики и мало внутренней опоры — начнём восстанавливать устойчивость и ценность себя.',
      program: 'Работа с травмами',
      programDesc: 'Кризисы и восстановление внутренней опоры',
      img: 'assets/geshtalt.webp',
      href: 'directions/selfworth/',
    },
    body: {
      title: 'Тело и симптомы',
      why: 'Напряжение и стресс говорят через тело — разберёмся, что стоит за симптомами.',
      program: 'Психосоматика',
      programDesc: 'Связь эмоций, стресса и телесных симптомов',
      img: 'assets/psysomatic.webp',
      href: 'directions/body/',
    },
    calm: {
      title: 'Йога / Забота о себе',
      why: 'Не хватает спокойствия и ресурса — мягкие практики через дыхание, движение и внимание к себе.',
      program: 'Мини-йога',
      programDesc: 'Мягкие практики дыхания и движения',
      img: 'assets/mini-yoga.webp',
      href: 'directions/calm/',
    },
    communication: {
      title: 'Коммуникация и конфликты',
      why: 'Сложно говорить о важном и держать границы в диалоге — прокачаем навыки общения.',
      program: 'Мастер Коммуникаций',
      programDesc: 'Навыки общения и управление конфликтом',
      img: 'assets/masterofcommication.webp',
      href: 'directions/communication/',
    },
  };

  var QUESTIONS = [
    {
      q: 'Что сейчас забирает больше всего сил?',
      options: [
        { t: 'Тревога, напряжение, не получается расслабиться', d: 'calm' },
        { t: 'Отношения: снова и снова один сценарий', d: 'relationships' },
        { t: 'Ощущение «я недостаточно хорош», нет опоры', d: 'selfworth' },
        { t: 'Тело: усталость, симптомы, зажимы', d: 'body' },
        { t: 'Конфликты, трудно говорить о важном', d: 'communication' },
        { t: 'Просто хочу лучше понимать себя', d: 'selfstudy' },
      ],
    },
    {
      q: 'Как вы чаще замечаете, что что-то не так?',
      options: [
        { t: 'Через тело — боли, бессонница, зажимы', d: 'body' },
        { t: 'Через эмоции — тревога, раздражение', d: 'calm' },
        { t: 'Через отношения — ссоры, обиды, зависимость', d: 'relationships' },
        { t: 'Через самокритику и сомнения в себе', d: 'selfworth' },
        { t: 'Через недопонимание с людьми', d: 'communication' },
      ],
    },
    {
      q: 'Что стало бы главным результатом за пару месяцев?',
      options: [
        { t: 'Спокойствие и нормальный сон', d: 'calm' },
        { t: 'Здоровые отношения, выход из созависимости', d: 'relationships' },
        { t: 'Уверенность и опора в себе', d: 'selfworth' },
        { t: 'Меньше телесных симптомов', d: 'body' },
        { t: 'Договариваться без конфликтов', d: 'communication' },
        { t: 'Понимать свои чувства и потребности', d: 'selfstudy' },
      ],
    },
    {
      q: 'Что ближе всего прямо сейчас?',
      options: [
        { t: '«Меня штормит эмоционально»', d: 'calm' },
        { t: '«Я теряю себя в отношениях»', d: 'relationships' },
        { t: '«Я слишком много себя критикую»', d: 'selfworth' },
        { t: '«Тело постоянно сигналит»', d: 'body' },
        { t: '«Сложные разговоры даются тяжело»', d: 'communication' },
      ],
    },
    {
      q: 'Какой формат работы вам ближе?',
      options: [
        { t: 'Мягкие телесные практики, дыхание', d: 'calm' },
        { t: 'Глубокие разборы и понимание себя', d: 'selfstudy' },
        { t: 'Практики про границы и отношения', d: 'relationships' },
        { t: 'Работа с самооценкой и поддержкой', d: 'selfworth' },
        { t: 'Навыки и техники общения', d: 'communication' },
        { t: 'Понять, что стоит за симптомами тела', d: 'body' },
      ],
    },
  ];

  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>';

  function $(id) { return document.getElementById(id); }

  function init() {
    var shell = $('dq-shell');
    if (!shell) return;

    var elIntro = $('dq-intro');
    var elQuiz = $('dq-quiz');
    var elResult = $('dq-result');
    var elQuestion = $('dq-question');
    var elOptions = $('dq-options');
    var elBar = $('dq-progress-bar');
    var elStepNum = $('dq-step-num');
    var elStepTotal = $('dq-step-total');
    var elBack = $('dq-back');

    var total = QUESTIONS.length;
    var answers = new Array(total).fill(null);
    var current = 0;

    if (elStepTotal) elStepTotal.textContent = String(total);

    function show(el) { if (el) el.hidden = false; }
    function hide(el) { if (el) el.hidden = true; }

    function renderStep(i) {
      current = i;
      var step = QUESTIONS[i];
      if (elStepNum) elStepNum.textContent = String(i + 1);
      if (elBar) elBar.style.width = (Math.round((i / total) * 100)) + '%';
      if (elQuestion) elQuestion.textContent = step.q;
      if (elBack) elBack.hidden = i === 0;

      elOptions.innerHTML = '';
      step.options.forEach(function (opt) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'dq-option' + (answers[i] === opt.d ? ' is-selected' : '');
        btn.innerHTML = '<span class="dq-option-dot"></span><span>' + opt.t + '</span>';
        btn.addEventListener('click', function () {
          answers[i] = opt.d;
          if (i + 1 < total) {
            renderStep(i + 1);
          } else {
            showResult();
          }
        });
        elOptions.appendChild(btn);
      });
    }

    function computeResult() {
      var scores = {};
      Object.keys(DIRECTIONS).forEach(function (k) { scores[k] = 0; });
      answers.forEach(function (d) { if (d && scores[d] != null) scores[d] += 1; });
      var best = null;
      var bestScore = -1;
      TIE_ORDER.forEach(function (k) {
        if (scores[k] > bestScore) { bestScore = scores[k]; best = k; }
      });
      return best || 'selfstudy';
    }

    function showResult() {
      var key = computeResult();
      var dir = DIRECTIONS[key];
      if (elBar) elBar.style.width = '100%';

      $('dq-result-title').textContent = dir.title;
      $('dq-result-why').textContent = dir.why;

      var img = $('dq-program-img');
      img.src = dir.img;
      img.alt = dir.program;
      $('dq-program-name').textContent = dir.program;
      $('dq-program-desc').textContent = dir.programDesc;

      var prog = $('dq-program');
      prog.setAttribute('href', dir.href);
      $('dq-open-route').setAttribute('href', dir.href);

      hide(elQuiz);
      show(elResult);
      try { shell.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) { /* ignore */ }
    }

    function restart() {
      answers = new Array(total).fill(null);
      hide(elResult);
      hide(elIntro);
      show(elQuiz);
      renderStep(0);
    }

    var startBtn = $('dq-start');
    if (startBtn) {
      startBtn.addEventListener('click', function () {
        hide(elIntro);
        show(elQuiz);
        renderStep(0);
      });
    }
    if (elBack) {
      elBack.addEventListener('click', function () {
        if (current > 0) renderStep(current - 1);
      });
    }
    var restartBtn = $('dq-restart');
    if (restartBtn) restartBtn.addEventListener('click', restart);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
