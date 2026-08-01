/**
 * Тест «С чего начать» — отдельная страница /quiz/.
 * Ситуативные сцены → одно направление + программа.
 * Без бэкенда.
 */
(function () {
  'use strict';

  var ASSET = '../assets/';
  var TIE_ORDER = ['relationships', 'selfworth', 'body', 'calm', 'communication', 'selfstudy'];

  var DIRECTIONS = {
    selfstudy: {
      title: 'Понять себя глубже',
      tag: 'Базовый маршрут',
      reading:
        'Сейчас важнее не «починить симптом», а понять, что вообще происходит внутри. Чувства, реакции, потребности — точка, с которой дальше строится любой маршрут.',
      program: 'Гештальт-подход',
      programDesc: 'Контакт, границы, эмоции и возвращение к себе',
      img: ASSET + 'find_myself.webp',
      href: '../directions/selfstudy/',
    },
    relationships: {
      title: 'Отношения / созависимость',
      tag: 'Контакт',
      reading:
        'Вас держит не «плохой человек», а повторяющийся сценарий: как вы сближаетесь, где теряете себя, куда возвращается боль. Здесь работает разбор динамики, а не советы «просто отпусти».',
      program: 'Созависимость',
      programDesc: 'Границы, привязанность и выход из знакомых кругов',
      img: ASSET + 'coda2.webp',
      href: '../directions/relationships/',
    },
    selfworth: {
      title: 'Самооценка и опора',
      tag: 'Опора',
      reading:
        'Внутри много оценки и мало почвы под ногами. Даже когда снаружи «всё нормально», опора шатается. Маршрут про устойчивость, а не про «полюби себя» лозунгами.',
      program: 'Работа с травмами',
      programDesc: 'Кризисы и восстановление внутренней опоры',
      img: ASSET + 'geshtalt.webp',
      href: '../directions/selfworth/',
    },
    body: {
      title: 'Тело и симптомы',
      tag: 'Тело',
      reading:
        'Тело уже говорит громче слов: напряжение, симптомы, усталость без понятной причины. Здесь имеет смысл идти через психосоматику — не вместо врача, а рядом с вопросом «что стоит за сигналом».',
      program: 'Психосоматика',
      programDesc: 'Связь эмоций, стресса и телесных симптомов',
      img: ASSET + 'psysomatic.webp',
      href: '../directions/body/',
    },
    calm: {
      title: 'Йога / Забота о себе',
      tag: 'Состояние',
      reading:
        'Сейчас важнее вернуть ресурс, чем разбирать глубокую теорию. Нервная система на взводе — и мягкий вход через тело, дыхание и ритм даст больше, чем ещё один «разбор головы».',
      program: 'Мини-йога',
      programDesc: 'Мягкие практики дыхания и движения',
      img: ASSET + 'mini-yoga.webp',
      href: '../directions/calm/',
    },
    communication: {
      title: 'Коммуникация и конфликты',
      tag: 'Диалог',
      reading:
        'Застревает не «характер», а навык: сказать важное, удержать границу, не сорваться в ссору или молчание. Здесь путь через конкретные инструменты диалога.',
      program: 'Мастер Коммуникаций',
      programDesc: 'Навыки общения и разговор о сложном',
      img: ASSET + 'masterofcommication.webp',
      href: '../directions/communication/',
    },
  };

  // Ситуации, а не анкета «что вас беспокоит».
  var QUESTIONS = [
    {
      kicker: 'Сцена',
      q: 'Какая картина ближе к вашему «сейчас»?',
      options: [
        { t: 'Ночь. Снаружи тихо — внутри уже эвакуация.', d: 'calm' },
        { t: 'Разговор закончился. В голове он всё ещё идёт.', d: 'relationships' },
        { t: 'В зеркале мелькает мысль: «чего-то не хватает».', d: 'selfworth' },
        { t: 'Тело гудит. Объяснения нет — только сигнал.', d: 'body' },
        { t: 'Хочется сказать важное. Слова застревают.', d: 'communication' },
        { t: 'Хочется наконец понять, что со мной происходит.', d: 'selfstudy' },
      ],
    },
    {
      kicker: 'Триггер',
      q: 'Что обычно запускает внутренний шум?',
      options: [
        { t: 'Тишина и пустое время — радар включается сам.', d: 'calm' },
        { t: 'Сообщение, пауза в ответе, взгляд «не так».', d: 'relationships' },
        { t: 'Сравнение с другими. Даже мимоходом.', d: 'selfworth' },
        { t: 'Нагрузка и недосып — тело сдаёт раньше головы.', d: 'body' },
        { t: 'Разговор, где нужно отстоять себя.', d: 'communication' },
        { t: 'Чувство, которое не получается назвать.', d: 'selfstudy' },
      ],
    },
    {
      kicker: 'Если бы это был фильм',
      q: 'С чего начинается ваша серия?',
      options: [
        { t: 'Человек не может выдохнуть, хотя опасности нет.', d: 'calm' },
        { t: 'Двое. Один и тот же круг. Разные декорации.', d: 'relationships' },
        { t: 'Герой всё делает «правильно» — и всё равно пусто.', d: 'selfworth' },
        { t: 'Тело подсказывает сюжет раньше слов.', d: 'body' },
        { t: 'Важный разговор снова откладывается.', d: 'communication' },
        { t: 'Герой останавливается и впервые смотрит внутрь.', d: 'selfstudy' },
      ],
    },
    {
      kicker: 'Чужая история',
      q: 'Какие истории цепляют сильнее всего?',
      options: [
        { t: 'Как люди возвращают спокойствие и сон.', d: 'calm' },
        { t: 'Как выходят из созависимых сценариев.', d: 'relationships' },
        { t: 'Как собирают опору после кризиса.', d: 'selfworth' },
        { t: 'Как разбирают симптомы и стресс в теле.', d: 'body' },
        { t: 'Как учатся говорить о сложном без войны.', d: 'communication' },
        { t: 'Как учатся чувствовать и понимать себя.', d: 'selfstudy' },
      ],
    },
    {
      kicker: 'Через месяц',
      q: 'Какой сдвиг был бы самым ценным?',
      options: [
        { t: 'Внутри тише. Можно просто быть.', d: 'calm' },
        { t: 'В отношениях больше себя — меньше игр.', d: 'relationships' },
        { t: 'Меньше самокритики. Больше почвы под ногами.', d: 'selfworth' },
        { t: 'Тело не орёт каждый день.', d: 'body' },
        { t: 'Могу сказать «нет» и не развалиться.', d: 'communication' },
        { t: 'Понимаю свои реакции — и не пугаюсь их.', d: 'selfstudy' },
      ],
    },
    {
      kicker: 'Формат',
      q: 'Какой вход сейчас ближе по ощущению?',
      options: [
        { t: 'Мягко через тело и дыхание.', d: 'calm' },
        { t: 'Разбор сценариев в отношениях.', d: 'relationships' },
        { t: 'Работа с опорой и старыми ранами.', d: 'selfworth' },
        { t: 'Понять, что говорит тело.', d: 'body' },
        { t: 'Конкретные навыки диалога.', d: 'communication' },
        { t: 'Глубокое понимание чувств и контакта.', d: 'selfstudy' },
      ],
    },
  ];

  function $(id) { return document.getElementById(id); }

  function init() {
    var shell = $('dq-shell');
    if (!shell) return;

    var elIntro = $('dq-intro');
    var elQuiz = $('dq-quiz');
    var elResult = $('dq-result');
    var elQuestion = $('dq-question');
    var elKicker = $('dq-q-kicker');
    var elOptions = $('dq-options');
    var elBar = $('dq-progress-bar');
    var elStepNum = $('dq-step-num');
    var elStepTotal = $('dq-step-total');
    var elNavBack = $('dq-nav-back');
    var nav = document.querySelector('.quiz-page .nav');

    var total = QUESTIONS.length;
    var answers = new Array(total).fill(null);
    var current = 0;

    if (elStepTotal) elStepTotal.textContent = String(total);

    function show(el) { if (el) el.hidden = false; }
    function hide(el) { if (el) el.hidden = true; }

    function setMode(mode) {
      document.body.classList.toggle('dq-playing', mode === 'playing');
      document.body.classList.toggle('dq-done', mode === 'done');
      if (nav) nav.classList.remove('menu-open');
      if (elNavBack) elNavBack.hidden = !(mode === 'playing' || mode === 'done');
    }

    function scrollQuizTop() {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        try { window.scrollTo(0, 0); } catch (err) { /* ignore */ }
      }
    }

    function renderStep(i) {
      current = i;
      var step = QUESTIONS[i];
      if (elStepNum) elStepNum.textContent = String(i + 1);
      if (elBar) elBar.style.width = Math.round(((i + 0.15) / total) * 100) + '%';
      if (elKicker) elKicker.textContent = step.kicker;
      if (elQuestion) elQuestion.textContent = step.q;

      elOptions.innerHTML = '';
      step.options.forEach(function (opt) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'dq-option' + (answers[i] === opt.d ? ' is-selected' : '');
        btn.innerHTML = '<span class="dq-option-text">' + opt.t + '</span>';
        btn.addEventListener('click', function () {
          answers[i] = opt.d;
          Array.prototype.forEach.call(elOptions.children, function (c) {
            c.classList.remove('is-selected');
          });
          btn.classList.add('is-selected');
          window.setTimeout(function () {
            if (i + 1 < total) renderStep(i + 1);
            else showResult();
          }, 160);
        });
        elOptions.appendChild(btn);
      });

      scrollQuizTop();
    }

    function computeResult() {
      var scores = {};
      Object.keys(DIRECTIONS).forEach(function (k) { scores[k] = 0; });
      answers.forEach(function (d) {
        if (d && scores[d] != null) scores[d] += 1;
      });
      var best = null;
      var bestScore = -1;
      TIE_ORDER.forEach(function (k) {
        if (scores[k] > bestScore) {
          bestScore = scores[k];
          best = k;
        }
      });
      return best || 'selfstudy';
    }

    function showResult() {
      var key = computeResult();
      var dir = DIRECTIONS[key];
      if (elBar) elBar.style.width = '100%';

      $('dq-result-tag').textContent = dir.tag;
      $('dq-result-title').textContent = dir.title;
      $('dq-result-why').textContent = dir.reading;

      var img = $('dq-program-img');
      img.src = dir.img;
      img.alt = dir.program;
      $('dq-program-name').textContent = dir.program;
      $('dq-program-desc').textContent = dir.programDesc;

      $('dq-program').setAttribute('href', dir.href);
      $('dq-open-route').setAttribute('href', dir.href);

      // В систему с фокусом — только если результат «отношения/созависимость».
      var enterApp = $('dq-enter-app');
      if (enterApp) {
        enterApp.setAttribute(
          'href',
          key === 'relationships'
            ? 'https://система-молодцова.рф/?focus=relationships'
            : 'https://система-молодцова.рф/'
        );
      }

      hide(elQuiz);
      show(elResult);
      setMode('done');
      scrollQuizTop();
    }

    function exitToIntro() {
      hide(elResult);
      hide(elQuiz);
      show(elIntro);
      setMode('');
      answers = new Array(total).fill(null);
      current = 0;
      if (elBar) elBar.style.width = '0%';
      try {
        if (history.replaceState) {
          history.replaceState(null, '', location.pathname);
        }
      } catch (e) { /* ignore */ }
      scrollQuizTop();
    }

    function start(ev) {
      if (ev) ev.preventDefault();
      answers = new Array(total).fill(null);
      hide(elIntro);
      hide(elResult);
      show(elQuiz);
      setMode('playing');
      renderStep(0);
    }

    function restart() {
      exitToIntro();
    }

    function goBack() {
      if (document.body.classList.contains('dq-done')) {
        // С результата — снова к вопросам с последнего шага, или к интро.
        hide(elResult);
        show(elQuiz);
        setMode('playing');
        renderStep(Math.max(0, total - 1));
        return;
      }
      if (current > 0) {
        renderStep(current - 1);
        return;
      }
      exitToIntro();
    }

    var startBtn = $('dq-start');
    if (startBtn) startBtn.addEventListener('click', start);
    var heroStart = $('dq-hero-start');
    if (heroStart) {
      heroStart.addEventListener('click', function (ev) {
        // Уже на странице — стартуем без перезагрузки.
        if (location.pathname.indexOf('/quiz') !== -1) start(ev);
      });
    }
    if (elNavBack) {
      elNavBack.addEventListener('click', goBack);
    }
    var restartBtn = $('dq-restart');
    if (restartBtn) restartBtn.addEventListener('click', restart);

    // Прямой заход с ?start=1 или #start — сразу в вопросы.
    if (/[?&]start=1\b/.test(location.search) || location.hash === '#start') {
      start();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
