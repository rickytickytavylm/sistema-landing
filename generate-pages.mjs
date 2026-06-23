// Генератор внутренних страниц: node generate-pages.mjs
// Направления → directions/<slug>/index.html
// Возможности → features/<slug>/index.html
// Ивенты → events/<slug>/index.html
// Правки контента, в DIRECTIONS / FEATURES / EVENTS ниже, потом перегенерировать.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  LANDING_SITE,
  MAIN_SITE,
  SITE_NAME,
  SITE_TAGLINE,
  AUTHOR,
  DEFAULT_OG_IMAGE,
  INDEXNOW_KEY,
  TODAY_ISO,
  EVENT_DATE_LABEL,
  EVENT_START_ISO,
} from './seo.config.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));

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
      { title: 'Эмоции живут своей жизнью', text: 'Вспышки, заморозка или «ничего не чувствую», программа учит распознавать и проживать эмоции, а не подавлять их.' },
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
    tag: 'Йога',
    title: 'Йога / Забота о себе',
    titleHtml: 'Йога / Забота о себе<br /><span class="text-gradient">как навык</span>',
    description: 'Два мягких входа: через движение и через внимание к телу. Мини-йога и телесная терапия в Системе Молодцова.',
    hero: 'king_calm.webp',
    lead: 'Когда внутри постоянный шум, бесполезно «просто успокоиться». Этот маршрут учит снижать напряжение через тело, самым коротким путём к нервной системе.',
    previewVideo: {
      slug: 'Мини курс Йога/Что такое йога.mp4',
      title: 'Что такое йога',
      caption: 'Короткое введение из программы «Мини-йога»: йога как практический инструмент для тела и нервной системы. Первый урок доступен прямо здесь.',
      poster: 'mini-yoga.webp',
      duration: '2 мин',
    },
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
    lead: 'Непрожитые эмоции не исчезают, они находят выход через тело. Этот маршрут о том, как услышать сигналы симптомов и вернуть себе телесную опору.',
    fits: [
      { title: 'Симптомы без причины', text: 'Обследования в норме, а тело продолжает сигналить. Психосоматика помогает найти эмоциональный корень.' },
      { title: 'Стресс уходит «в тело»', text: 'Зажимы, головные боли, проблемы со сном в напряжённые периоды, разбираем механизм и учимся его останавливать.' },
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
    title: 'Отношения / созависимость',
    titleHtml: 'Отношения / созависимость<br /><span class="text-gradient">без сценариев</span>',
    description: 'Созависимость и мужско-женская динамика: распознать повторяющиеся сценарии и построить здоровый контакт.',
    hero: 'new_soc.webp',
    lead: 'Если в отношениях повторяется одна и та же боль, дело не в «не тех людях», а в сценарии. Маршрут помогает увидеть свой и выйти из него.',
    fits: [
      { title: 'Одни и те же грабли', text: 'Разные партнёры, одинаковый финал. Учимся видеть сценарий до того, как он разворачивается.' },
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
    lead: 'Когда самоценность зависит от чужих оценок, любой кризис выбивает землю из-под ног. Этот маршрут про опору, которую не могут забрать.',
    fits: [
      { title: 'После кризиса или потери', text: 'Развод, выгорание, потеря, когда старые опоры рухнули. Программа помогает пересобрать фундамент.' },
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
    lead: 'Конфликт: это не катастрофа, а навык. Маршрут учит говорить о сложном так, чтобы контакт укреплялся, а не рвался.',
    fits: [
      { title: 'Конфликты заканчиваются взрывом', text: 'Либо терплю до последнего, либо взрываюсь. Учимся замечать напряжение раньше и говорить о нём вовремя.' },
      { title: 'Сложно отстоять позицию', text: 'В споре теряются слова, а правильный ответ приходит через час. Тренируем уверенный диалог.' },
      { title: 'Манипуляции и игры', text: 'После некоторых разговоров остаётся чувство вины непонятно за что. Разбираем механики скрытого давления.' },
    ],
    programs: [
      { pill: 'Основная программа', title: 'Мастер Коммуникаций', image: 'masterofcommication.webp', text: 'Навыки общения, диалог и управление конфликтом. Включая практики распознавания лжи и скрытых мотивов.' },
      { pill: 'Дополнительная', title: 'Созависимость', image: 'coda2.webp', text: 'Границы и повторяющиеся сценарии в контакте, фундамент зрелой коммуникации.' },
    ],
  },
];

const FEATURES = [
  {
    slug: 'ai',
    tag: 'AI',
    title: 'Лиза, AI-помощник',
    shortTitle: 'Лиза, AI',
    titleHtml: 'Лиза знает<br /><span class="text-gradient">каждый урок</span>',
    description: 'AI-помощник Системы Молодцова: объяснит сложное место в уроке, подберёт практику под состояние и поможет выбрать программу.',
    hero: 'ai_back.webp',
    lead: 'Лиза обучена на всех материалах Системы. Это не «чат-бот для галочки», а собеседник, который держит контекст вашего маршрута и отвечает по делу.',
    fits: [
      { title: 'Объяснит сложное место', text: 'Застряли на уроке? Спросите Лизу, она перескажет мысль другими словами и приведёт пример из жизни.' },
      { title: 'Подберёт практику под состояние', text: 'Тревожно, нет сил, не уснуть, Лиза предложит подходящую медитацию или упражнение прямо сейчас.' },
      { title: 'Поможет выбрать программу', text: 'Не знаете, с чего начать? Опишите запрос своими словами, Лиза сориентирует по направлениям и программам.' },
    ],
    steps: [
      { title: 'Доступна из любого раздела', text: 'Кнопка Лизы всегда рядом: в уроке, в практике, на главном экране. Не нужно никуда переключаться.' },
      { title: 'Помнит контекст', text: 'Лиза видит, какой урок вы смотрите, и отвечает с учётом вашего маршрута, без пересказа всего заново.' },
      { title: 'Отвечает 24/7', text: 'Вопрос в три часа ночи, нормально. Лиза на связи всегда, когда есть вы.' },
    ],
  },
  {
    slug: 'chat',
    hidden: true,
    tag: 'Сообщество',
    title: 'Общий чат',
    shortTitle: 'Общий чат',
    titleHtml: 'Путь легче,<br /><span class="text-gradient">когда рядом люди</span>',
    description: 'Живое сообщество Системы Молодцова: вопросы, поддержка, обратная связь и общий ритм практики.',
    hero: 'coman.webp',
    lead: 'Внутренняя работа в одиночку буксует. Общий чат: это пространство, где участники делятся опытом, задают вопросы и поддерживают друг друга.',
    fits: [
      { title: 'Поддержка без осуждения', text: 'Здесь все идут похожим путём. Можно говорить о сложном, и встретить понимание, а не советы «просто не грусти».' },
      { title: 'Живые вопросы и ответы', text: 'Часто чужой вопрос, это и ваш вопрос. Обсуждения по урокам и практикам помогают понять глубже.' },
      { title: 'Ритм и регулярность', text: 'Когда видно, что другие практикуют, проще не бросить. Сообщество мягко держит в процессе.' },
    ],
    steps: [
      { title: 'Открыт всем участникам', text: 'Чат доступен сразу после входа в Систему, отдельно подключать ничего не нужно.' },
      { title: 'Модерируемое пространство', text: 'Бережная атмосфера: без спама, рекламы и токсичности. Правила защищают каждого.' },
      { title: 'Рядом с материалами', text: 'Чат живёт внутри платформы: обсуждение урока, в один тап от самого урока.' },
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
    lead: 'Короткие аудио-практики на каждый день: уснуть, успокоиться, собраться. Записаны Русланом Молодцовым без эзотерики, на языке тела и внимания.',
    fits: [
      { title: 'Для сна', text: 'Практики, которые помогают отпустить день и уснуть без прокручивания мыслей по кругу.' },
      { title: 'Для тревоги', text: 'Дыхание и заземление: вернуть себе устойчивость за несколько минут, где бы вы ни были.' },
      { title: 'Для контакта с собой', text: 'Внимание к ощущениям, сканирование тела, пауза среди дня, навык слышать себя раньше, чем накроет.' },
    ],
    steps: [
      { title: 'От 5 минут', text: 'Большинство практик короткие, встраиваются в обед, дорогу или вечер перед сном.' },
      { title: 'Под состояние', text: 'Каталог собран по запросам: сон, тревога, усталость, концентрация. А Лиза подскажет, с чего начать.' },
      { title: 'Слушайте где угодно', text: 'Телефон или компьютер, медитации доступны с любого устройства внутри Системы.' },
    ],
  },
  {
    slug: 'shorts',
    tag: 'Видео',
    title: 'Shorts',
    shortTitle: 'Shorts',
    titleHtml: 'Психология<br /><span class="text-gradient">за пару минут</span>',
    description: 'Короткие видео-разборы Системы Молодцова: одна мысль, один ролик. Психология в формате пары минут.',
    hero: 'shorts_hero.webp',
    lead: 'Не всегда есть час на урок. Shorts: это концентрированные разборы: одна тема, одна мысль, которую можно применить сразу.',
    fits: [
      { title: 'Быстрый вход в тему', text: 'Пара минут, и у вас рабочая идея: про границы, эмоции, отношения или самооценку.' },
      { title: 'Между делами', text: 'Очередь, дорога, перерыв, короткий формат превращает паузы в маленькие шаги маршрута.' },
      { title: 'Точка входа в программы', text: 'Зацепила тема ролика, рядом всегда программа, где она разобрана глубоко.' },
    ],
    steps: [
      { title: 'Лента внутри Системы', text: 'Удобная вертикальная лента, листайте и смотрите, как привыкли в соцсетях, только с пользой.' },
      { title: 'Без алгоритмов-ловушек', text: 'Лента не затягивает в думскроллинг: только материалы Системы, отобранные автором.' },
      { title: 'Постоянно пополняется', text: 'Новые разборы выходят регулярно, лента не заканчивается и не устаревает.' },
    ],
  },
  {
    slug: 'marathons',
    tag: 'Практика',
    title: 'Марафоны',
    shortTitle: 'Марафоны',
    titleHtml: 'Несколько дней,<br /><span class="text-gradient">ощутимый сдвиг</span>',
    description: 'Марафоны Системы Молодцова: самооценка, конфликты, материнство. Концентрированные треки практики на несколько дней.',
    hero: 'maraphones.webp',
    lead: 'Марафон: это короткий интенсив: каждый день задание, практика и фокус на одной теме. Лучший формат, когда нужен сдвиг, а не «когда-нибудь потом».',
    fits: [
      { title: 'Самооценка', text: 'Несколько дней работы с внутренним критиком и опорой на себя, заметный сдвиг в отношении к себе.' },
      { title: 'Конфликты', text: 'Трек про то, как перестать взрываться или терпеть и начать говорить о сложном вовремя.' },
      { title: 'Материнство', text: 'Бережный марафон для мам: ресурс, границы и контакт с ребёнком без выгорания.' },
    ],
    steps: [
      { title: 'День за шагом', text: 'Каждый день открывается новое задание: смотрите, практикуете, замечаете изменения.' },
      { title: 'Конкретная тема', text: 'Никакой размытости: марафон решает один запрос и доводит его до результата.' },
      { title: 'Вместе с другими', text: 'Участники проходят трек одновременно, общий ритм и поддержка в чате усиливают эффект.' },
    ],
  },
];

const EVENTS = [
  {
    slug: 'event-yoga',
    tag: 'Ивент',
    title: 'Йога и терапия',
    titleHtml: 'Йога и<br /><span class="text-gradient">терапия</span>',
    description: 'Ивент Системы Молодцова: 52 видео-урока йоги и терапии в двух модулях, дыхание, практики и работа с состояниями.',
    hero: 'mmeditation.webp',
    appUrl: `${MAIN_SITE}event-yoga/`,
    note: '52 видео · 2 модуля',
    seoTitle: 'Йога и терапия — ивент 21 июня 2026',
    eventStart: EVENT_START_ISO,
    eventDateLabel: EVENT_DATE_LABEL,
    eventEnd: '2026-12-31T23:59:59+03:00',
    keywords: 'йога и терапия, ивент система молодцова, йога онлайн, практики дыхания, руслан молодцов, 52 видео, 21 июня',
    lead: `Два модуля видео-уроков и практик: тело, дыхание, внимание и работа с состояниями. Старт ивента — ${EVENT_DATE_LABEL}.`,
    fits: [
      { title: 'Модуль 1', text: 'Базовый трек: теория, практика, дыхание, типология характеров, фасции, чакры и методология ведения.' },
      { title: 'Модуль 2', text: 'Продолжение: сеттинг, практики, эмоциональные нарушения, коммуникация, отношения, потребности, диагностика и пранаямы.' },
      { title: 'Формат и ритм', text: 'Последовательные видео-уроки, можно проходить в своём темпе или вместе с группой внутри Системы.' },
    ],
    steps: [
      { title: '52 видео', text: 'Полный архив ивента: от базовых практик до углублённой работы с состояниями и телом.' },
      { title: '2 модуля', text: 'Первый модуль закладывает фундамент, второй углубляет практику и терапевтический контекст.' },
      { title: 'Внутри Системы', text: 'Все уроки доступны после входа, смотрите на платформе, отслеживайте прогресс и возвращайтесь к нужному месту.' },
    ],
  },
];

const AUTHOR_PAGE = {
  slug: 'author',
  tag: 'Автор',
  name: 'Руслан Молодцов',
  seoTitle: 'Руслан Молодцов — психолог, автор Системы Молодцова',
  titleHtml: 'Руслан<br /><span class="text-gradient">Молодцов</span>',
  description:
    'Руслан Молодцов — психолог и автор программ Системы Молодцова: гештальт-подход, психосоматика, гипноз, телесная терапия. Онлайн-курсы, медитации и практики для самопознания.',
  keywords:
    'руслан молодцов, молодцов психолог, психолог молодцов, гештальт молодцов, курсы молодцова, система молодцова, молодцов онлайн',
  photo: 'ruslan_promo.webp',
  role: 'Автор Системы · психолог',
  lead:
    'Психолог и автор всех программ Системы. Объединил гештальт-подход, телесную терапию, психосоматику и работу с состояниями в единое пространство — чтобы путь к себе был последовательным, а не хаотичным набором курсов.',
  paragraphs: [
    'Каждый материал записан так, чтобы его можно было применить в тот же день: без воды, с практиками и разборами реальных случаев.',
    'Система Молодцова — новая платформа, где все программы автора собраны в персональные маршруты: от первого шага до глубокой практики.',
  ],
  specializations: [
    { title: 'Гештальт-подход', text: 'Эмоции, потребности, контакт и границы — базовая программа Системы и фундамент самопознания.' },
    { title: 'Психосоматика', text: 'Связь эмоций, стресса и телесных симптомов. Разборы реальных случаев и практики работы с телом.' },
    { title: 'Телесная терапия', text: 'Внимание, дыхание, заземление — возвращение в тело как опору в сложные периоды.' },
    { title: 'Гипнотерапия', text: 'Работа с вниманием и состояниями, безопасные практики трансового опыта в образовательном формате.' },
  ],
  facts: ['Гештальт-подход', 'Телесная терапия', 'Психосоматика', 'Гипнотерапия', 'Йога и практики'],
};

const arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>';

function pageRoot(depth = 2) {
  return depth === 1 ? '..' : '../..';
}

function liquidGlassSvg(depth = 2) {
  const r = pageRoot(depth);
  return `  <!-- Liquid glass: SVG-фильтр преломления для backdrop-filter кнопок -->
  <svg class="lg-filter" aria-hidden="true" focusable="false">
    <filter id="liquid-glass" x="-50%" y="-50%" width="200%" height="200%" primitiveUnits="objectBoundingBox">
      <feImage x="-50%" y="-50%" width="200%" height="200%" href="${r}/assets/map.png" result="map" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur" />
      <feDisplacementMap id="disp" in="blur" in2="map" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>`;
}

function navHtml(depth = 2) {
  const r = pageRoot(depth);
  return `  <nav class="nav" aria-label="Главная навигация">
    <div class="nav-inner">
      <a href="${r}/" class="nav-brand">
        <img src="${r}/assets/logo2-Photoroom.webp" alt="Система" />
      </a>
      <div class="nav-links">
        <a href="${r}/#directions">Направления</a>
        <a href="${r}/#features">Возможности</a>
        <a href="${r}/#programs">Программы</a>
        <a href="${r}/author/">Автор</a>
      </div>
      <div class="nav-cta">
        <a class="btn btn-ghost btn-sm" href="${r}/#directions">Все направления</a>
        <a class="btn btn-primary btn-sm" href="${MAIN_SITE}" target="_blank" rel="noopener">Войти в систему</a>
        <button class="nav-burger" type="button" aria-label="Меню" aria-expanded="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
    <div class="nav-mobile">
      <a href="${r}/#directions">Направления</a>
      <a href="${r}/#features">Возможности</a>
      <a href="${r}/#programs">Программы</a>
      <a href="${MAIN_SITE}" target="_blank" rel="noopener">Войти в систему</a>
    </div>
  </nav>`;
}

function footerHtml(currentSlug, depth = 2) {
  const r = pageRoot(depth);
  return `  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-col-brand">
        <a href="${r}/" class="footer-brand">
          <img src="${r}/assets/logo2-Photoroom.webp" alt="Система" />
        </a>
        <p class="footer-brand-text">Пространство психологического развития и последовательной практики.</p>
        <p class="footer-copyright">© 2026 Система Молодцова.<br />Все права защищены.</p>
      </div>
      
      <div class="footer-col">
        <h4>Направления</h4>
${DIRECTIONS.map((d) => `        <a href="${r}/directions/${d.slug}/"${d.slug === currentSlug ? ' aria-current="page"' : ''}>${d.title}</a>`).join('\n')}
      </div>

      <div class="footer-col">
        <h4>Документы</h4>
        <a href="${r}/offer/">Публичная оферта</a>
        <a href="${r}/privacy/">Политика ПД</a>
        <a href="${r}/terms/">Соглашение</a>
        <a href="${r}/requisites/">Реквизиты</a>
      </div>

      <div class="footer-col">
        <h4>Платформа</h4>
        <a href="${MAIN_SITE}" class="footer-link-login" target="_blank" rel="noopener">
          Войти в систему
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>

      <div class="footer-disclaimer">
        Материалы платформы носят исключительно образовательный и информационный характер. Они не являются заменой очной консультации врача, медицинской помощи, психотерапии или иной специализированной медицинской помощи.
      </div>
    </div>
  </footer>`;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function canonicalUrl(path) {
  const clean = String(path || '').replace(/^\/+/, '').replace(/\/+$/, '');
  return clean ? `${LANDING_SITE}/${clean}/` : `${LANDING_SITE}/`;
}

function ogImageUrl(hero) {
  if (!hero) return DEFAULT_OG_IMAGE;
  if (hero.startsWith('http')) return hero;
  return `${LANDING_SITE}/assets/${hero.replace(/^\.\.\/\.\.\/assets\//, '')}`;
}

function jsonLdScript(items) {
  const list = Array.isArray(items) ? items : [items];
  return list.map((item) => `  <script type="application/ld+json">\n${JSON.stringify(item, null, 2)}\n  </script>`).join('\n');
}

function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: LANDING_SITE,
    logo: `${LANDING_SITE}/assets/logo2.png`,
    description: SITE_TAGLINE,
    founder: { '@type': 'Person', name: AUTHOR },
    sameAs: [MAIN_SITE.replace(/\/$/, '')],
  };
}

function breadcrumbJsonLd(path, lastLabel) {
  const parts = String(path).split('/').filter(Boolean);
  const segmentLabels = {
    directions: 'Направления',
    features: 'Возможности',
    events: 'Ивент',
    author: 'Автор',
  };
  const items = [{ '@type': 'ListItem', position: 1, name: 'Главная', item: `${LANDING_SITE}/` }];
  let acc = '';
  parts.forEach((part, index) => {
    acc += `${part}/`;
    const isLast = index === parts.length - 1;
    const name = (isLast && lastLabel) ? lastLabel : (segmentLabels[part] || part);
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name,
      item: canonicalUrl(acc),
    });
  });
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

function personJsonLd(description, path = 'author') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_PAGE.name,
    jobTitle: 'Психолог',
    description,
    image: ogImageUrl(AUTHOR_PAGE.photo),
    url: canonicalUrl(path),
    worksFor: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: LANDING_SITE,
    },
    sameAs: [MAIN_SITE.replace(/\/$/, ''), LANDING_SITE],
    knowsAbout: AUTHOR_PAGE.facts,
  };
}

function headHtml(opts) {
  const {
    title,
    pageTitle,
    description,
    hero,
    path,
    keywords = '',
    jsonLd = [],
    depth = 2,
  } = opts;
  const r = pageRoot(depth);
  const fullTitle = pageTitle || `${title} · ${SITE_NAME}`;
  const canonical = canonicalUrl(path);
  const ogImage = ogImageUrl(hero);
  const jsonLdBlock = jsonLd.length ? `\n${jsonLdScript(jsonLd)}` : '';

  return `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  ${keywords ? `<meta name="keywords" content="${escapeHtml(keywords)}" />` : ''}
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="author" content="${escapeHtml(AUTHOR)}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="theme-color" content="#05070d" />
  <meta name="color-scheme" content="dark" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
  <meta property="og:locale" content="ru_RU" />
  <meta property="og:title" content="${escapeHtml(fullTitle)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${ogImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(fullTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${ogImage}" />
  <link rel="icon" type="image/png" href="${r}/assets/logo2.png" />
  <link rel="apple-touch-icon" href="${r}/assets/logo2.png" />
  <link rel="preload" as="image" href="${r}/assets/${hero}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${r}/css/style.css?v=163" />${jsonLdBlock}
</head>`;
}

function previewVideoBlock(dir, r) {
  if (!dir.previewVideo) return '';
  const pv = dir.previewVideo;
  return `
  <section class="section landing-preview-video" id="preview-lesson">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Попробуйте сейчас</span>
        <h2 class="h2">Первый урок «${escapeHtml(pv.title)}»</h2>
        <p class="lead">${escapeHtml(pv.caption || '')}</p>
      </div>
      <div class="landing-video-card reveal" data-landing-preview data-video-slug="${escapeHtml(pv.slug)}">
        <video class="landing-preview-player" controls playsinline preload="metadata" poster="${r}/assets/${escapeHtml(pv.poster || 'mini-yoga.webp')}"></video>
        ${pv.duration ? `<p class="landing-preview-meta">${escapeHtml(pv.duration)} · бесплатный фрагмент</p>` : ''}
      </div>
    </div>
  </section>`;
}

function directionPage(dir) {
  const others = DIRECTIONS.filter((d) => d.slug !== dir.slug);
  const path = `directions/${dir.slug}`;
  const head = headHtml({
    title: dir.title,
    description: dir.description,
    hero: dir.hero,
    path,
    keywords: `${dir.title.toLowerCase()}, система молодцова, ${dir.tag.toLowerCase()}, психология онлайн`,
    jsonLd: [
      organizationJsonLd(),
      breadcrumbJsonLd(path, dir.title),
      {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: dir.title,
        description: dir.description,
        provider: organizationJsonLd(),
        url: canonicalUrl(path),
        inLanguage: 'ru-RU',
        offers: { '@type': 'Offer', url: MAIN_SITE, price: '999', priceCurrency: 'RUB' },
      },
    ],
  });
  return `<!DOCTYPE html>
<html lang="ru">
${head}
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
        <h2 class="h2">Этот маршрут для вас, если</h2>
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
        <h2 class="h2">Две программы, один путь</h2>
        <p class="lead">Система не разбрасывает внимание: основная программа задаёт глубину, дополнительная поддерживает. AI-помощник поможет выбрать, с чего начать.</p>
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

${previewVideoBlock(dir, '../../')}

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
          <p>Медитации, марафоны и терапевтические группы поддерживают ритм — путь легче, когда рядом живые люди.</p>
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
      <p class="lead reveal">Регистрация занимает минуту. Система соберёт первый шаг: останется только начать.</p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary" href="${MAIN_SITE}" target="_blank" rel="noopener">
          Войти в систему
          ${arrowSvg}
        </a>
      </div>
    </div>
  </section>

${footerHtml(dir.slug)}

${liquidGlassSvg()}

  <script src="../../js/main.js"></script>
${dir.previewVideo ? '  <script src="https://cdn.jsdelivr.net/npm/hls.js@1.4.12/dist/hls.min.js"></script>\n  <script src="../../js/preview-video.js"></script>' : ''}
</body>
</html>
`;
}

function featurePage(feature) {
  const others = FEATURES.filter((f) => f.slug !== feature.slug);
  const path = `features/${feature.slug}`;
  const head = headHtml({
    title: feature.title,
    description: feature.description,
    hero: feature.hero,
    path,
    keywords: `${feature.shortTitle.toLowerCase()}, система молодцова, ${feature.tag.toLowerCase()}`,
    jsonLd: [
      organizationJsonLd(),
      breadcrumbJsonLd(path, feature.title),
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: feature.title,
        description: feature.description,
        url: canonicalUrl(path),
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: LANDING_SITE },
      },
    ],
  });
  return `<!DOCTYPE html>
<html lang="ru">
${head}
${feature.hidden ? '  <script>location.replace("../../");</script>\n' : ''}<body>

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

${liquidGlassSvg()}

  <script src="../../js/main.js"></script>
</body>
</html>
`;
}

function authorPage() {
  const a = AUTHOR_PAGE;
  const path = a.slug;
  const head = headHtml({
    title: a.name,
    pageTitle: a.seoTitle,
    description: a.description,
    hero: a.photo,
    path,
    keywords: a.keywords,
    depth: 1,
    jsonLd: [
      organizationJsonLd(),
      personJsonLd(a.description, path),
      breadcrumbJsonLd(path, a.name),
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: a.seoTitle,
        url: canonicalUrl(path),
        mainEntity: personJsonLd(a.description, path),
      },
    ],
  });

  return `<!DOCTYPE html>
<html lang="ru">
${head}
<body>

${navHtml(1)}

  <section class="section author-page-hero">
    <div class="container">
      <div class="author-card author-card-page reveal">
        <div class="author-photo">
          <img src="../assets/${a.photo}" alt="${a.name} — психолог, автор ${SITE_NAME}" width="760" height="570" loading="eager" decoding="async" />
        </div>
        <div class="author-copy">
          <span class="author-role">${a.role}</span>
          <h1 class="display author-page-title">${a.name}</h1>
          <p class="lead author-page-lead">${a.lead}</p>
${a.paragraphs.map((p) => `          <p>${p}</p>`).join('\n')}
          <div class="author-facts">
${a.facts.map((f) => `            <span>${f}</span>`).join('\n')}
          </div>
          <div class="dir-hero-actions author-page-actions">
            <a class="btn btn-primary" href="${MAIN_SITE}" target="_blank" rel="noopener">
              Войти в Систему
              ${arrowSvg}
            </a>
            <a class="btn btn-ghost" href="../#directions">Выбрать направление</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Подходы</span>
        <h2 class="h2">Специализации и программы</h2>
        <p class="lead">Все направления доступны внутри Системы — в виде последовательных маршрутов и видео-программ.</p>
      </div>
      <div class="fit-grid" data-stagger>
${a.specializations.map((item) => `        <div class="fit-item reveal">
          <strong>${item.title}</strong>
          <p>${item.text}</p>
        </div>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Маршруты</span>
        <h2 class="h2">С чего начать в Системе</h2>
      </div>
      <div class="more-dirs" data-stagger>
${DIRECTIONS.slice(0, 4).map((dir) => `        <a class="more-dir reveal" href="../directions/${dir.slug}/">
          <img class="card-media" src="../assets/${dir.hero}" alt="" loading="lazy" />
          <strong>${dir.title}</strong>
        </a>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="final-cta">
    <div class="container">
      <span class="kicker reveal">${a.tag}</span>
      <h2 class="h2 reveal">Программы ${a.name.split(' ')[1]}<br />уже внутри Системы</h2>
      <p class="lead reveal">12+ программ, AI-помощник, медитации и сообщество — персональный маршрут в вашем темпе.</p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary" href="${MAIN_SITE}" target="_blank" rel="noopener">
          Войти в систему
          ${arrowSvg}
        </a>
        <a class="btn btn-ghost" href="../">На главную</a>
      </div>
    </div>
  </section>

${footerHtml(null, 1)}

${liquidGlassSvg(1)}

  <script src="../js/main.js"></script>
</body>
</html>
`;
}

function eventPage(event) {
  const path = `events/${event.slug}`;
  const head = headHtml({
    title: event.title,
    pageTitle: event.seoTitle || `${event.title} · ${SITE_NAME}`,
    description: event.description,
    hero: event.hero,
    path,
    keywords: event.keywords || `${event.title}, система молодцова, ивент`,
    jsonLd: [
      organizationJsonLd(),
      breadcrumbJsonLd(path, event.title),
      {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: `${event.title} — ивент ${SITE_NAME}`,
        description: event.description,
        startDate: event.eventStart || `${TODAY_ISO}T11:00:00+03:00`,
        endDate: event.eventEnd || `${TODAY_ISO}T23:59:59+03:00`,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        image: ogImageUrl(event.hero),
        url: canonicalUrl(path),
        location: {
          '@type': 'VirtualLocation',
          url: event.appUrl || MAIN_SITE,
        },
        organizer: organizationJsonLd(),
        offers: {
          '@type': 'Offer',
          url: event.appUrl || MAIN_SITE,
          price: '0',
          priceCurrency: 'RUB',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  });
  return `<!DOCTYPE html>
<html lang="ru">
${head}
<body>

${navHtml()}

  <header class="dir-hero">
    <img class="card-media" src="../../assets/${event.hero}" alt="" />
    <div class="container">
      <div class="breadcrumbs reveal">
        <a href="../../">Главная</a><i>/</i><a href="../../#event-yoga">Ивент</a><i>/</i><span>${event.title}</span>
      </div>
      <span class="kicker reveal">${event.tag}</span>
      <h1 class="display reveal">${event.titleHtml}</h1>
      <p class="lead reveal">${event.lead}</p>
      <p class="hero-note reveal">${event.note} · <time datetime="${event.eventStart || EVENT_START_ISO}">${event.eventDateLabel || EVENT_DATE_LABEL}</time></p>
      <div class="dir-hero-actions reveal">
        <a class="btn btn-primary" href="${event.appUrl}" target="_blank" rel="noopener">
          Смотреть в Системе
          ${arrowSvg}
        </a>
        <a class="btn btn-ghost" href="../../#event-yoga">На главную</a>
      </div>
    </div>
  </header>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Что внутри</span>
        <h2 class="h2">Два модуля, полный трек</h2>
      </div>
      <div class="fit-grid" data-stagger>
${event.fits.map((fit) => `        <div class="fit-item reveal">
          <strong>${fit.title}</strong>
          <p>${fit.text}</p>
        </div>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head reveal">
        <span class="kicker">Как устроен ивент</span>
        <h2 class="h2">Видео, практики, последовательность</h2>
      </div>
      <div class="steps" data-stagger>
${event.steps.map((step) => `        <div class="step reveal">
          <h3>${step.title}</h3>
          <p>${step.text}</p>
        </div>`).join('\n')}
      </div>
    </div>
  </section>

  <section class="final-cta">
    <div class="container">
      <span class="kicker reveal">${event.tag}</span>
      <h2 class="h2 reveal">${event.title} уже ждёт<br />внутри Системы</h2>
      <p class="lead reveal">Войдите на платформу, все ${event.note.split(' · ')[0]} ивента доступны сразу после регистрации.</p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary" href="${event.appUrl}" target="_blank" rel="noopener">
          Смотреть в Системе
          ${arrowSvg}
        </a>
        <a class="btn btn-ghost" href="${MAIN_SITE}" target="_blank" rel="noopener">Войти в систему</a>
      </div>
    </div>
  </section>

${footerHtml(null)}

${liquidGlassSvg()}

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
for (const event of EVENTS) {
  const folder = join(ROOT, 'events', event.slug);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, 'index.html'), eventPage(event), 'utf8');
  console.log(`✓ events/${event.slug}/index.html`);
}
mkdirSync(join(ROOT, 'author'), { recursive: true });
writeFileSync(join(ROOT, 'author', 'index.html'), authorPage(), 'utf8');
console.log('✓ author/index.html');
console.log('Готово.');

function writeSeoFiles() {
  const lastmod = TODAY_ISO;
  const urls = [
    { loc: `${LANDING_SITE}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${LANDING_SITE}/author/`, priority: '0.92', changefreq: 'weekly' },
    { loc: `${LANDING_SITE}/events/event-yoga/`, priority: '0.95', changefreq: 'daily' },
    ...DIRECTIONS.map((d) => ({ loc: `${LANDING_SITE}/directions/${d.slug}/`, priority: '0.8', changefreq: 'weekly' })),
    ...FEATURES.filter((f) => !f.hidden).map((f) => ({ loc: `${LANDING_SITE}/features/${f.slug}/`, priority: '0.8', changefreq: 'weekly' })),
    { loc: `${LANDING_SITE}/offer/`, priority: '0.3', changefreq: 'monthly' },
    { loc: `${LANDING_SITE}/privacy/`, priority: '0.3', changefreq: 'monthly' },
    { loc: `${LANDING_SITE}/terms/`, priority: '0.3', changefreq: 'monthly' },
    { loc: `${LANDING_SITE}/requisites/`, priority: '0.3', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
  writeFileSync(join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
  console.log('✓ sitemap.xml');

  const robots = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${LANDING_SITE}/sitemap.xml
`;
  writeFileSync(join(ROOT, 'robots.txt'), robots, 'utf8');
  console.log('✓ robots.txt');

  writeFileSync(join(ROOT, `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY, 'utf8');
  console.log(`✓ ${INDEXNOW_KEY}.txt`);

  const llms = `# ${SITE_NAME}

> ${SITE_TAGLINE}. Онлайн-платформа Руслана Молодцова: персональные маршруты психологического развития, 12+ программ, AI-помощник Лиза, медитации, марафоны, общий чат.

**Сегодня (${TODAY_ISO}):** ивент «Йога и терапия» — старт в 11:00 МСК. 52 видео-урока в двух модулях.

## Основные ссылки

- [Лендинг](${LANDING_SITE}/): презентация Системы, направления, ивент
- [Руслан Молодцов — автор](${LANDING_SITE}/author/): психолог, автор всех программ Системы
- [Платформа / приложение](${MAIN_SITE}): вход, подписка PRO (999 ₽ / 30 дней, триал 1 день)
- [Ивент «Йога и терапия»](${LANDING_SITE}/events/event-yoga/): описание ивента
- [Йога и терапия в приложении](${MAIN_SITE}event-yoga/): 52 видео внутри платформы

## Направления (маршруты)

${DIRECTIONS.map((d) => `- [${d.title}](${LANDING_SITE}/directions/${d.slug}/): ${d.description}`).join('\n')}

## Возможности платформы

${FEATURES.filter((f) => !f.hidden).map((f) => `- [${f.title}](${LANDING_SITE}/features/${f.slug}/): ${f.description}`).join('\n')}

## Автор

- [${AUTHOR_PAGE.name}](${LANDING_SITE}/author/): психолог, автор всех программ ${SITE_NAME}
- Специализация: ${AUTHOR_PAGE.facts.join(', ')}

## Программы (внутри платформы)

Гештальт-подход, Психосоматика, Мини-йога, Работа с травмами, Гипноз, Мастер Коммуникаций, Телесная терапия, Созависимость, Мужское и Женское и другие.

## Для поисковых систем

- Sitemap: ${LANDING_SITE}/sitemap.xml
- Canonical домен лендинга: ${LANDING_SITE}
- Canonical домен приложения: ${MAIN_SITE.replace(/\/$/, '')}

## Контакты и документы

- [Публичная оферта](${LANDING_SITE}/offer/)
- [Политика ПД](${LANDING_SITE}/privacy/)
- [Реквизиты](${LANDING_SITE}/requisites/)
`;
  writeFileSync(join(ROOT, 'llms.txt'), llms, 'utf8');
  console.log('✓ llms.txt');

  writeFileSync(join(ROOT, '.nojekyll'), '', 'utf8');
  console.log('✓ .nojekyll');
}

writeSeoFiles();
