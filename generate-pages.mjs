// Генератор внутренних страниц: node generate-pages.mjs
// Направления → directions/<slug>/index.html
// Возможности → features/<slug>/index.html
// Правки контента — в DIRECTIONS / FEATURES ниже, потом перегенерировать.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const MAIN_SITE = 'https://система-молодцова.рф/';

const DIRECTIONS = [
  {
    slug: 'selfstudy',
    tag: 'Базовый маршрут',
    title: 'Понять себя глубже',
    titleHtml: 'Понять себя<br /><span class="text-gradient">глубже</span>',
    description: 'Базовая программа Системы для самопонимания и работа с состояниями внимания. Эмоции, потребности, контакт и границы.',
    hero: 'find_myself.webp',
    lead: 'Это главный маршрут Системы. Он для тех, кто хочет разобраться: что я чувствую, чего на самом деле хочу и почему повторяются одни и те же сценарии.',
    fits: [
      { title: 'Эмоции живут своей жизнью', text: 'Вспышки, заморозка или «ничего не чувствую» — программа учит распознавать и проживать эмоции, а не подавлять их.' },
      { title: 'Непонятно, чего хочу', text: 'Потребности спрятаны за «надо» и чужими ожиданиями. Гештальт-подход возвращает контакт с собственными желаниями.' },
      { title: 'Границы постоянно продавливаются', text: 'Сложно говорить «нет» и замечать, где заканчиваюсь я и начинается другой. Здесь этому учат на практике.' },
    ],
    programs: [
      { pill: 'Основная программа', title: 'Гештальт-подход', image: 'courses.webp', text: 'Эмоции, потребности, контакт и границы. Последовательный видео-курс: от теории контакта до практик возвращения к себе.' },
      { pill: 'Дополнительная', title: 'Гипноз', image: 'hipno.webp', text: 'Внимание, трансовые состояния и безопасная работа с внушением. Расширяет основную программу работой с состояниями.' },
    ],
  },
  {
    slug: 'calm',
    tag: 'Состояние',
    title: 'Спокойствие',
    titleHtml: 'Спокойствие<br /><span class="text-gradient">как навык</span>',
    description: 'Два мягких входа: через движение и через внимание к телу. Мини-йога и телесная терапия в Системе Молодцова.',
    hero: 'king_calm.webp',
    lead: 'Когда внутри постоянный шум, бесполезно «просто успокоиться». Этот маршрут учит снижать напряжение через тело — самым коротким путём к нервной системе.',
    fits: [
      { title: 'Тревога фоном', text: 'Внутренний моторчик не выключается даже вечером. Практики дыхания и движения мягко снижают обороты.' },
      { title: 'Тело зажато', text: 'Плечи у ушей, челюсть сжата, дыхание поверхностное. Телесные практики возвращают ощущение опоры и расслабления.' },
      { title: 'Сложно замедлиться', text: 'Отдых не восстанавливает, а выходные пролетают в делах. Маршрут учит замедляться без чувства вины.' },
    ],
    programs: [
      { pill: 'Основная программа', title: 'Мини-йога', image: 'mini-yoga.webp', text: 'Мягкое начало через дыхание и движение. Короткие практики, которые встраиваются даже в плотный день.' },
      { pill: 'Дополнительная', title: 'Телесная терапия', image: 'theraphy.webp', text: 'Вернуть внимание в тело и снизить внутреннее напряжение. Практики заземления и контакта с ощущениями.' },
    ],
  },
  {
    slug: 'body',
    tag: 'Тело',
    title: 'Тело и симптомы',
    titleHtml: 'Когда тело<br /><span class="text-gradient">говорит за вас</span>',
    description: 'Психосоматика и телесная терапия: понять связь эмоций и симптомов и мягко вернуться в телесное ощущение.',
    hero: 'body.webp',
    lead: 'Непрожитые эмоции не исчезают — они находят выход через тело. Этот маршрут о том, как услышать сигналы симптомов и вернуть себе телесную опору.',
    fits: [
      { title: 'Симптомы без причины', text: 'Обследования в норме, а тело продолжает сигналить. Психосоматика помогает найти эмоциональный корень.' },
      { title: 'Стресс уходит «в тело»', text: 'Зажимы, головные боли, проблемы со сном в напряжённые периоды — разбираем механизм и учимся его останавливать.' },
      { title: 'Потерян контакт с телом', text: 'Тело как «транспорт для головы». Практики возвращают чувствительность и умение слышать себя раньше, чем заболит.' },
    ],
    programs: [
      { pill: 'Основная программа', title: 'Психосоматика', image: 'psysomatic.webp', text: 'Связь эмоций, стресса и телесных симптомов. Разборы реальных случаев и психодраматические техники работы с симптомом.' },
      { pill: 'Дополнительная', title: 'Телесная терапия', image: 'theraphy.webp', text: 'Практики, которые возвращают внимание в тело: заземление, дыхание, работа с напряжением.' },
    ],
  },
  {
    slug: 'relationships',
    tag: 'Контакт',
    title: 'Отношения',
    titleHtml: 'Отношения<br /><span class="text-gradient">без сценариев</span>',
    description: 'Созависимость и мужско-женская динамика: распознать повторяющиеся сценарии и построить здоровый контакт.',
    hero: 'new_soc.webp',
    lead: 'Если в отношениях повторяется одна и та же боль — дело не в «не тех людях», а в сценарии. Маршрут помогает увидеть свой и выйти из него.',
    fits: [
      { title: 'Одни и те же грабли', text: 'Разные партнёры — одинаковый финал. Учимся видеть сценарий до того, как он разворачивается.' },
      { title: 'Растворяюсь в другом', text: 'Чужие потребности всегда важнее своих, а «нет» застревает в горле. Работаем с созависимой динамикой.' },
      { title: 'Не понимаем друг друга', text: 'Мужская и женская природа конфликтуют вместо того, чтобы дополнять. Разбираем психологию полов без штампов.' },
    ],
    programs: [
      { pill: 'Основная программа', title: 'Созависимость', image: 'coda2.webp', text: 'Границы, привязанность и повторяющиеся сценарии. Психологические игры созависимых и выход из них.' },
      { pill: 'Дополнительная', title: 'Мужское и Женское', image: 'man_woman.webp', text: 'Психология отношений и природа полов: роли, ожидания и зрелый контакт.' },
    ],
  },
  {
    slug: 'selfworth',
    tag: 'Опора',
    title: 'Самооценка и опора',
    titleHtml: 'Опора,<br /><span class="text-gradient">которая внутри</span>',
    description: 'Работа с травмами и гештальт-подход: восстановить внутреннюю опору после кризисов и вернуть контакт с собой.',
    hero: 'opora.webp',
    lead: 'Когда самоценность зависит от чужих оценок, любой кризис выбивает землю из-под ног. Этот маршрут — про опору, которую не могут забрать.',
    fits: [
      { title: 'После кризиса или потери', text: 'Развод, выгорание, потеря — когда старые опоры рухнули. Программа помогает пересобрать фундамент.' },
      { title: 'Зависимость от оценок', text: 'Самооценка скачет от похвалы к критике. Учимся опираться на себя, а не на чужое мнение.' },
      { title: 'Внутренний критик', text: 'Голос «ты недостаточно хорош» громче всех остальных. Работаем с его происхождением и силой.' },
    ],
    programs: [
      { pill: 'Основная программа', title: 'Работа с травмами', image: 'geshtalt.webp', text: 'Кризисы, травматичный опыт и восстановление опоры. Практический курс о том, как тело и психика проживают сложное.' },
      { pill: 'Дополнительная', title: 'Гештальт-подход', image: 'courses.webp', text: 'Контакт, эмоции, границы и возвращение к себе. Базовая программа Системы как поддержка маршрута.' },
    ],
  },
  {
    slug: 'communication',
    tag: 'Диалог',
    title: 'Коммуникация и конфликты',
    titleHtml: 'Говорить сложное<br /><span class="text-gradient">без разрушения</span>',
    description: 'Мастер Коммуникаций и работа со сценариями: навыки общения, границы и зрелый диалог в конфликте.',
    hero: 'conflicts_programs.webp',
    lead: 'Конфликт — это не катастрофа, а навык. Маршрут учит говорить о сложном так, чтобы контакт укреплялся, а не рвался.',
    fits: [
      { title: 'Конфликты заканчиваются взрывом', text: 'Либо терплю до последнего, либо взрываюсь. Учимся замечать напряжение раньше и говорить о нём вовремя.' },
      { title: 'Сложно отстоять позицию', text: 'В споре теряются слова, а правильный ответ приходит через час. Тренируем уверенный диалог.' },
      { title: 'Манипуляции и игры', text: 'После некоторых разговоров остаётся чувство вины непонятно за что. Разбираем механики скрытого давления.' },
    ],
    programs: [
      { pill: 'Основная программа', title: 'Мастер Коммуникаций', image: 'masterofcommication.webp', text: 'Навыки общения, диалог и управление конфликтом. Включая практики распознавания лжи и скрытых мотивов.' },
      { pill: 'Дополнительная', title: 'Созависимость', image: 'coda2.webp', text: 'Границы и повторяющиеся сценарии в контакте — фундамент зрелой коммуникации.' },
    ],
  },
];

const FEATURES = [
  {
    slug: 'ai',
    tag: 'AI',
    title: 'Лиза — AI-помощник',
    shortTitle: 'Лиза — AI',
    titleHtml: 'Лиза знает<br /><span class="text-gradient">каждый урок</span>',
    description: 'AI-помощник Системы Молодцова: объяснит сложное место в уроке, подберёт практику под состояние и поможет выбрать программу.',
    hero: 'ai_back.webp',
    lead: 'Лиза обучена на всех материалах Системы. Это не «чат-бот для галочки», а собеседник, который держит контекст вашего маршрута и отвечает по делу.',
    fits: [
      { title: 'Объяснит сложное место', text: 'Застряли на уроке? Спросите Лизу — она перескажет мысль другими словами и приведёт пример из жизни.' },
      { title: 'Подберёт практику под состояние', text: 'Тревожно, нет сил, не уснуть — Лиза предложит подходящую медитацию или упражнение прямо сейчас.' },
      { title: 'Поможет выбрать программу', text: 'Не знаете, с чего начать? Опишите запрос своими словами — Лиза сориентирует по направлениям и программам.' },
    ],
    steps: [
      { title: 'Доступна из любого раздела', text: 'Кнопка Лизы всегда рядом: в уроке, в практике, на главном экране. Не нужно никуда переключаться.' },
      { title: 'Помнит контекст', text: 'Лиза видит, какой урок вы смотрите, и отвечает с учётом вашего маршрута — без пересказа всего заново.' },
      { title: 'Отвечает 24/7', text: 'Вопрос в три часа ночи — нормально. Лиза на связи всегда, когда есть вы.' },
    ],
  },
  {
    slug: 'chat',
    tag: 'Сообщество',
    title: 'Общий чат',
    shortTitle: 'Общий чат',
    titleHtml: 'Путь легче,<br /><span class="text-gradient">когда рядом люди</span>',
    description: 'Живое сообщество Системы Молодцова: вопросы, поддержка, обратная связь и общий ритм практики.',
    hero: 'coman.webp',
    lead: 'Внутренняя работа в одиночку буксует. Общий чат — это пространство, где участники делятся опытом, задают вопросы и поддерживают друг друга.',
    fits: [
      { title: 'Поддержка без осуждения', text: 'Здесь все идут похожим путём. Можно говорить о сложном — и встретить понимание, а не советы «просто не грусти».' },
      { title: 'Живые вопросы и ответы', text: 'Часто чужой вопрос — это и ваш вопрос. Обсуждения по урокам и практикам помогают понять глубже.' },
      { title: 'Ритм и регулярность', text: 'Когда видно, что другие практикуют, проще не бросить. Сообщество мягко держит в процессе.' },
    ],
    steps: [
      { title: 'Открыт всем участникам', text: 'Чат доступен сразу после входа в Систему — отдельно подключать ничего не нужно.' },
      { title: 'Модерируемое пространство', text: 'Бережная атмосфера: без спама, рекламы и токсичности. Правила защищают каждого.' },
      { title: 'Рядом с материалами', text: 'Чат живёт внутри платформы: обсуждение урока — в один тап от самого урока.' },
    ],
  },
  {
    slug: 'meditations',
    tag: 'Аудио',
    title: 'Медитации',
    shortTitle: 'Медитации',
    titleHtml: 'Практики,<br /><span class="text-gradient">которые возвращают в тело</span>',
    description: 'Библиотека медитаций Системы Молодцова: сон, тревога, заземление и возвращение внимания в тело.',
    hero: 'mmeditation.webp',
    lead: 'Короткие аудио-практики на каждый день: уснуть, успокоиться, собраться. Записаны Русланом Молодцовым — без эзотерики, на языке тела и внимания.',
    fits: [
      { title: 'Для сна', text: 'Практики, которые помогают отпустить день и уснуть без прокручивания мыслей по кругу.' },
      { title: 'Для тревоги', text: 'Дыхание и заземление: вернуть себе устойчивость за несколько минут, где бы вы ни были.' },
      { title: 'Для контакта с собой', text: 'Внимание к ощущениям, сканирование тела, пауза среди дня — навык слышать себя раньше, чем накроет.' },
    ],
    steps: [
      { title: 'От 5 минут', text: 'Большинство практик короткие — встраиваются в обед, дорогу или вечер перед сном.' },
      { title: 'Под состояние', text: 'Каталог собран по запросам: сон, тревога, усталость, концентрация. А Лиза подскажет, с чего начать.' },
      { title: 'Слушайте где угодно', text: 'Телефон или компьютер — медитации доступны с любого устройства внутри Системы.' },
    ],
  },
  {
    slug: 'shorts',
    tag: 'Видео',
    title: 'Shorts',
    shortTitle: 'Shorts',
    titleHtml: 'Психология<br /><span class="text-gradient">за пару минут</span>',
    description: 'Короткие видео-разборы Системы Молодцова: одна мысль — один ролик. Психология в формате пары минут.',
    hero: 'shorts_hero.webp',
    lead: 'Не всегда есть час на урок. Shorts — это концентрированные разборы: одна тема, одна мысль, которую можно применить сразу.',
    fits: [
      { title: 'Быстрый вход в тему', text: 'Пара минут — и у вас рабочая идея: про границы, эмоции, отношения или самооценку.' },
      { title: 'Между делами', text: 'Очередь, дорога, перерыв — короткий формат превращает паузы в маленькие шаги маршрута.' },
      { title: 'Точка входа в программы', text: 'Зацепила тема ролика — рядом всегда программа, где она разобрана глубоко.' },
    ],
    steps: [
      { title: 'Лента внутри Системы', text: 'Удобная вертикальная лента — листайте и смотрите, как привыкли в соцсетях, только с пользой.' },
      { title: 'Без алгоритмов-ловушек', text: 'Лента не затягивает в думскроллинг: только материалы Системы, отобранные автором.' },
      { title: 'Постоянно пополняется', text: 'Новые разборы выходят регулярно — лента не заканчивается и не устаревает.' },
    ],
  },
  {
    slug: 'marathons',
    tag: 'Практика',
    title: 'Марафоны',
    shortTitle: 'Марафоны',
    titleHtml: 'Несколько дней —<br /><span class="text-gradient">ощутимый сдвиг</span>',
    description: 'Марафоны Системы Молодцова: самооценка, конфликты, материнство. Концентрированные треки практики на несколько дней.',
    hero: 'maraphones.webp',
    lead: 'Марафон — это короткий интенсив: каждый день задание, практика и фокус на одной теме. Лучший формат, когда нужен сдвиг, а не «когда-нибудь потом».',
    fits: [
      { title: 'Самооценка', text: 'Несколько дней работы с внутренним критиком и опорой на себя — заметный сдвиг в отношении к себе.' },
      { title: 'Конфликты', text: 'Трек про то, как перестать взрываться или терпеть — и начать говорить о сложном вовремя.' },
      { title: 'Материнство', text: 'Бережный марафон для мам: ресурс, границы и контакт с ребёнком без выгорания.' },
    ],
    steps: [
      { title: 'День — шаг', text: 'Каждый день открывается новое задание: смотрите, практикуете, замечаете изменения.' },
      { title: 'Конкретная тема', text: 'Никакой размытости: марафон решает один запрос и доводит его до результата.' },
      { title: 'Вместе с другими', text: 'Участники проходят трек одновременно — общий ритм и поддержка в чате усиливают эффект.' },
    ],
  },
];

const arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>';

const liquidGlassSvg = `  <!-- Liquid glass: SVG-фильтр преломления для backdrop-filter кнопок -->
  <svg class="lg-filter" aria-hidden="true" focusable="false">
    <filter id="liquid-glass" x="-50%" y="-50%" width="200%" height="200%" primitiveUnits="objectBoundingBox">
      <feImage x="-50%" y="-50%" width="200%" height="200%" href="../../assets/map.png" result="map" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur" />
      <feDisplacementMap id="disp" in="blur" in2="map" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>`;

function navHtml() {
  return `  <nav class="nav" aria-label="Главная навигация">
    <div class="nav-inner">
      <a href="../../" class="nav-brand">
        <img src="../../assets/logo2-Photoroom.webp" alt="Система" />
      </a>
      <div class="nav-links">
        <a href="../../#directions">Направления</a>
        <a href="../../#features">Возможности</a>
        <a href="../../#programs">Программы</a>
        <a href="../../#author">Автор</a>
      </div>
      <div class="nav-cta">
        <a class="btn btn-ghost btn-sm" href="../../#directions">Все направления</a>
        <a class="btn btn-primary btn-sm" href="${MAIN_SITE}" target="_blank" rel="noopener">Войти в систему</a>
        <button class="nav-burger" type="button" aria-label="Меню" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
    <div class="nav-mobile">
      <a href="../../#directions">Направления</a>
      <a href="../../#features">Возможности</a>
      <a href="../../#programs">Программы</a>
      <a href="${MAIN_SITE}" target="_blank" rel="noopener">Войти в систему</a>
    </div>
  </nav>`;
}

function footerHtml(currentSlug) {
  return `  <footer class="footer">
    <div class="container footer-inner">
      <a href="../../" class="footer-brand">
        <img src="../../assets/logo2-Photoroom.webp" alt="Система" />
      </a>
      <div class="footer-links">
${DIRECTIONS.map((d) => `        <a href="../../directions/${d.slug}/"${d.slug === currentSlug ? ' aria-current="page"' : ''}>${d.title}</a>`).join('\n')}
        <a href="${MAIN_SITE}" target="_blank" rel="noopener">Войти в систему</a>
      </div>
      <p class="footer-note">© Система Молодцова. Платформа психологического развития. Материалы не заменяют консультацию специалиста.</p>
    </div>
  </footer>`;
}

function headHtml(title, description, hero) {
  return `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${title} — Система Молодцова</title>
  <meta name="description" content="${description}" />
  <meta name="theme-color" content="#05070d" />
  <meta name="color-scheme" content="dark" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title} — Система Молодцова" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="../../assets/${hero}" />
  <link rel="icon" type="image/png" href="../../assets/logo2.png" />
  <link rel="apple-touch-icon" href="../../assets/logo2.png" />
  <link rel="preload" as="image" href="../../assets/${hero}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../css/style.css?v=145" />
</head>`;
}

function directionPage(dir) {
  const others = DIRECTIONS.filter((d) => d.slug !== dir.slug);
  return `<!DOCTYPE html>
<html lang="ru">
${headHtml(dir.title, dir.description, dir.hero)}
<body>

${navHtml()}

  <header class="dir-hero">
    <img class="card-media" src="../../assets/${dir.hero}" alt="" />
    <div class="container">
      <div class="breadcrumbs reveal">
        <a href="../../">Главная</a><i>/</i><a href="../../#directions">Направления</a><i>/</i><span>${dir.title}</span>
      </div>
      <span class="kicker reveal">${dir.tag}</span>
      <h1 class="display reveal">${dir.titleHtml}</h1>
      <p class="lead reveal">${dir.lead}</p>
      <div class="dir-hero-actions reveal">
        <a class="btn btn-primary" href="${MAIN_SITE}" target="_blank" rel="noopener">
          Войти в систему
          ${arrowSvg}
        </a>
        <a class="btn btn-ghost" href="#programs">Смотреть программы</a>
      </div>
    </div>
  </header>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Кому подойдёт</span>
        <h2 class="h2">Этот маршрут — для вас, если</h2>
      </div>
      <div class="fit-grid" data-stagger>
${dir.fits.map((fit) => `        <div class="fit-item reveal">
          <strong>${fit.title}</strong>
          <p>${fit.text}</p>
        </div>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="section" id="programs">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Маршрут</span>
        <h2 class="h2">Две программы — один путь</h2>
        <p class="lead">Система не разбрасывает внимание: основная программа задаёт глубину, дополнительная — поддерживает. AI-помощник поможет выбрать, с чего начать.</p>
      </div>
      <div class="dir-programs" data-stagger>
${dir.programs.map((program) => `        <a class="program-card reveal" href="${MAIN_SITE}" target="_blank" rel="noopener">
          <img class="card-media" src="../../assets/${program.image}" alt="" loading="lazy" />
          <span class="bento-pill">${program.pill}</span>
          <h3>${program.title}</h3>
          <p>${program.text}</p>
          <span class="program-card-cta">Открыть в Системе ${arrowSvg}</span>
        </a>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Внутри Системы</span>
        <h2 class="h2">Вы не останетесь один на один с материалом</h2>
      </div>
      <div class="steps" data-stagger>
        <div class="step reveal">
          <h3>Вкладка «Сегодня»</h3>
          <p>Маршрут «${dir.title}» появится на главном экране: следующий шаг всегда перед глазами, без поиска по библиотеке.</p>
        </div>
        <div class="step reveal">
          <h3>AI-помощник Лиза</h3>
          <p>Знает каждый урок направления: объяснит сложное место, ответит на вопрос по материалу и подскажет практику под состояние.</p>
        </div>
        <div class="step reveal">
          <h3>Практики и сообщество</h3>
          <p>Медитации, марафоны и общий чат поддерживают ритм — путь легче, когда рядом живые люди.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Другие направления</span>
        <h2 class="h2">Не ваш запрос? Посмотрите рядом</h2>
      </div>
      <div class="more-dirs" data-stagger>
${others.map((other) => `        <a class="more-dir reveal" href="../${other.slug}/">
          <img class="card-media" src="../../assets/${other.hero}" alt="" loading="lazy" />
          <strong>${other.title}</strong>
        </a>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="final-cta">
    <div class="container">
      <span class="kicker reveal">${dir.tag}</span>
      <h2 class="h2 reveal">Начните маршрут<br />«${dir.title}» сегодня</h2>
      <p class="lead reveal">Регистрация занимает минуту. Система соберёт первый шаг — останется только начать.</p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary" href="${MAIN_SITE}" target="_blank" rel="noopener">
          Войти в систему
          ${arrowSvg}
        </a>
      </div>
    </div>
  </section>

${footerHtml(dir.slug)}

${liquidGlassSvg}

  <script src="../../js/main.js"></script>
</body>
</html>
`;
}

function featurePage(feature) {
  const others = FEATURES.filter((f) => f.slug !== feature.slug);
  return `<!DOCTYPE html>
<html lang="ru">
${headHtml(feature.title, feature.description, feature.hero)}
<body>

${navHtml()}

  <header class="dir-hero">
    <img class="card-media" src="../../assets/${feature.hero}" alt="" />
    <div class="container">
      <div class="breadcrumbs reveal">
        <a href="../../">Главная</a><i>/</i><a href="../../#features">Возможности</a><i>/</i><span>${feature.title}</span>
      </div>
      <span class="kicker reveal">${feature.tag}</span>
      <h1 class="display reveal">${feature.titleHtml}</h1>
      <p class="lead reveal">${feature.lead}</p>
      <div class="dir-hero-actions reveal">
        <a class="btn btn-primary" href="${MAIN_SITE}" target="_blank" rel="noopener">
          Войти в систему
          ${arrowSvg}
        </a>
        <a class="btn btn-ghost" href="../../#features">Все возможности</a>
      </div>
    </div>
  </header>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Что это даёт</span>
        <h2 class="h2">Зачем это в вашем маршруте</h2>
      </div>
      <div class="fit-grid" data-stagger>
${feature.fits.map((fit) => `        <div class="fit-item reveal">
          <strong>${fit.title}</strong>
          <p>${fit.text}</p>
        </div>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Как это устроено</span>
        <h2 class="h2">Просто и без лишних настроек</h2>
      </div>
      <div class="steps" data-stagger>
${feature.steps.map((step) => `        <div class="step reveal">
          <h3>${step.title}</h3>
          <p>${step.text}</p>
        </div>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Другие возможности</span>
        <h2 class="h2">Что ещё есть внутри Системы</h2>
      </div>
      <div class="more-dirs" data-stagger>
${others.map((other) => `        <a class="more-dir reveal" href="../${other.slug}/">
          <img class="card-media" src="../../assets/${other.hero}" alt="" loading="lazy" />
          <strong>${other.shortTitle}</strong>
        </a>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="final-cta">
    <div class="container">
      <span class="kicker reveal">${feature.tag}</span>
      <h2 class="h2 reveal">${feature.title} уже ждёт<br />внутри Системы</h2>
      <p class="lead reveal">Регистрация занимает минуту. Всё, что вы видели на этой странице, доступно сразу после входа.</p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary" href="${MAIN_SITE}" target="_blank" rel="noopener">
          Войти в систему
          ${arrowSvg}
        </a>
      </div>
    </div>
  </section>

${footerHtml(null)}

${liquidGlassSvg}

  <script src="../../js/main.js"></script>
</body>
</html>
`;
}

for (const dir of DIRECTIONS) {
  const folder = join(ROOT, 'directions', dir.slug);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'index.html'), directionPage(dir), 'utf8');
  console.log(`✓ directions/${dir.slug}/index.html`);
}
for (const feature of FEATURES) {
  const folder = join(ROOT, 'features', feature.slug);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'index.html'), featurePage(feature), 'utf8');
  console.log(`✓ features/${feature.slug}/index.html`);
}
console.log('Готово.');
