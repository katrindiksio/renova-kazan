# Дизайн-система лендинга «Ремонт Казань»

**Hero — источник истины.** Все токены ниже извлечены из готового Hero (`components/site/hero.tsx`, `advantages.tsx`, `navbar.tsx`) без изменения его внешнего вида. Токены живут в `app/globals.css`, компоненты — в `components/site/` и `components/ui/button.tsx`. Если значение уже есть в токене или компоненте, используйте его, а не новое число.

Значения, которых в Hero нет и которые выведены по его логике (H2, H3, карточки, отступ секции), помечены «(выведено)».

## 1. Typography

Шрифты (`next/font/google`, `app/layout.tsx`): **Urbanist** (латиница и цифры) + **Manrope** (кириллица, тот же вес). Кнопки всегда в Manrope (`font-button`). Другие шрифты не используем.

| Роль | Класс | Размер | Вес | Line-height | Letter-spacing | Регистр |
|---|---|---|---|---|---|---|
| H1 (Hero) | `type-display` | mobile `clamp(26px, 8.4vw, 36px)`; от 768 px `clamp(36px, 16px + 3.6vw, 72px)` | 700 | 1.08 | +0.01em | обычный |
| H2 (выведено) | `type-h2` | `clamp(28px, 14.4px + 2.4vw, 48px)` | 700 | 1.1 | +0.01em | обычный |
| H3 (выведено) | `type-h3` | `clamp(20px, 16px + 0.9vw, 28px)` | 700 | 1.2 | +0.01em | обычный |
| Lead / описание | `type-lead` | 16 px, от 768 px 18 px | 400 | 1.625 | 0 | обычный |
| Текст-утверждение (выведено) | `type-statement` | `clamp(18px, 12px + 1.1vw, 28px)` | 400 (заголовок утверждения 600) | 1.4 | 0 | обычный |
| Цена в карточке (выведено) | `type-price` | `clamp(24px, 14.4px + 1.6vw, 40px)` | 700 | 1.1 | −0.02em | обычный, без переноса |
| Текст чипов выбора (выведено) | `type-button` | 15 px, Manrope | 500 | 20 px | 0 | обычный |
| Основной текст | `type-body` | 16 px | 400 | 1.5 | 0 | обычный |
| Eyebrow | `type-eyebrow` | 12 px, от 640 px 13 px | 400 | 16 px / 17.33 px | +0.14em | UPPERCASE |
| Ссылки навигации | `type-nav` | 15 px | 400 | 1.5 | 0 | обычный |
| Число-акцент | `type-stat` | `clamp(24px, 9.6px + 2.6vw, 52px)` | 700 | 1 | −0.025em | обычный, без переноса |
| Подпись | `type-caption` | 12 px, от 768 px 14 px | 400 | 1.375 | 0 | обычный |
| Текст кнопок | `font-button` в `buttonVariants` | 15 px (`xl`), 14 px (`nav`) | 500 | 20 px | 0 | обычный |
| Бренд | `Brand` | 17 px | 700 | — | `tracking-tight` | обычный |

Правила:
- Заголовки только Bold 700, остальной текст Regular 400, кнопки Medium 500. SemiBold 600 допустим только для выделенной части текста-утверждения (`Contractor`).
- Ширина текста: заголовок Hero `max-w-heading` (60 rem), lead `max-w-lead` (30 rem). Обычные абзацы в новых секциях не шире `max-w-lead`; строки `type-statement` не ограничиваются по ширине (контейнер), каждое предложение на своей строке.
- Переносы заголовков задаются вручную `<br>` с `md:hidden` / `hidden md:block`, без `text-balance`. H1: mobile «Ремонт квартир / в Казани под ключ», от 768 px «Ремонт квартир в Казани / под ключ». Для H2 и H3 допустим `text-balance`.
- Заголовки и абзацы собирайте из `Heading`, `Lead`, `Eyebrow` (`components/site/typography.tsx`), без своих `text-[..px]`.

## 2. Colors

Все цвета — переменные в `:root` (`app/globals.css`), в классах: `bg-background`, `text-foreground` и т.д.

| Токен | Значение | Назначение |
|---|---|---|
| `background` | `#F7F8FA` | фон страницы и панели преимуществ |
| `foreground` | `#111827` | основной текст |
| `muted-foreground` | `#667085` | вторичный текст, подписи |
| `primary` / `primary-hover` | `#2563EB` / `#1D4ED8` | акцент, основная кнопка, hover ссылок |
| `primary-foreground` | `#FFFFFF` | текст на primary |
| `card` | `#FFFFFF` | карточки на фоне страницы |
| `secondary`, `muted`, `accent` | `#EEF0F4` | нейтральные плашки и hover |
| `border` | `rgb(17 24 39 / 8%)` | тонкая граница на светлом фоне |
| `destructive` | `#DC2626` | только для ошибок форм |

На фото (Hero): заголовок `text-white`, lead и eyebrow `text-white/90`, затемнение `rgb(12 16 22 / 0.36)` равномерно по всему фото, вторая кнопка `bg-white text-foreground hover:bg-white/85`. Ссылки навигации: `text-foreground/75`, hover `text-primary`. Новые цвета не добавляем.

## 3. Buttons

Один компонент: `buttonVariants` (`components/ui/button.tsx`) + обёртки `CtaLink` и `CtaGroup` (`components/site/cta.tsx`).

| Параметр | Значение |
|---|---|
| Размер `xl` (CTA в секциях) | высота 48 px, `px-6`, `rounded-full`, gap 8 px, текст 15/20 Manrope 500, по центру |
| Размер `nav` (шапка) | высота 44 px, `px-5`, `rounded-full`, текст 14/20 |
| `default` | `bg-primary` `#2563EB`, текст белый, hover `bg-primary-hover` |
| `onPhoto` | `bg-white`, текст `foreground`, hover `bg-white/85` |
| Граница | нет (`border-transparent`) |
| Active | `translate-y: 1px` |
| Focus | `ring-3 ring-ring/50` |
| Transition | `transition-all` |
| Иконки | в Hero нет; если нужны, `[&_svg]:size-4`, gap 8 px, по умолчанию текст без иконок |

Пара CTA: `CtaGroup` (колонка на mobile, ряд от 640 px, gap 12 px); кнопки одной ширины (`width="fixed"` = 100% на mobile, 240 px от 640 px), у каждой свой контейнер, без общей рамки. Основная CTA на новых секциях: `<CtaLink href=...>` (`default` на светлом фоне, `onPhoto` на фото). Вторичная на светлом: `variant="secondary"`.

## 4. Container / Grid

- **Контейнер**: `<Container>`, `max-w-site` = 1760 px, центрирован, боковое поле `px-inset`: 12 px (до 768), 16 px (768–1023), 24 px (от 1024).
- Шапка: тот же `Container`, высота `h-nav` 64 px / 76 px (от 768), внутренний `px` 8 / 20 / 32 px, на `lg` сетка `1fr auto 1fr` (бренд, меню по центру, CTA справа).
- Hero: блок на всю ширину контейнера, внутри боковое поле `--hero-pad` = `clamp(20px, 5vw, 88px)`, высота `min-h-hero` = `clamp(660px, 100svh − nav − inset, 940px)` (от 768 px минимум 620 px).
- Колонки: текстовая колонка слева (до 60 rem), панель преимуществ справа внизу (52% ширины блока от 768 px, 46% от 1024 px, 100% экрана на mobile), внутри 3 равные колонки: gap 12 px на mobile, 24 px от 768 px.
- Сетка для новых секций: 1 колонка на mobile, 2 от 768 px, 3 или 12 колонок от 1024 px; gap 12 px (до 768) и 24 px (от 768); выравнивание текста по левому краю, контент в `Container`.

## 5. Spacing

Шкала (px): 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 120. Произвольные значения вне шкалы не используем.

| Токен | Mobile | От 768 px | Где |
|---|---|---|---|
| `--inset` (`px-inset`) | 12 | 16 (24 от 1024) | поле страницы |
| `--hero-pad` | `clamp(20px, 5vw, 88px)` | то же | боковой padding блока |
| `--hero-pad-y` (`pt-hero-y`) | `clamp(24px, 3.5vw, 56px)` | то же | верх/низ блока |
| `--hero-gap` | 36 | 48 | текст ↔ панель преимуществ |
| `--stack-eyebrow` (`mt-stack-eyebrow`) | 26 | 20 | eyebrow → заголовок |
| `--stack-title` (`mt-stack-title`) | 28 | 24 | заголовок → lead |
| `--stack-cta` (`mt-stack-cta`) | 58 | 40 | lead → кнопки |
| Gap кнопок | 12 | 12 | `CtaGroup` |
| `--section-y` (`py-section`), выведено | `clamp(64px, 8vw, 120px)` | то же | вертикальный отступ секции |

Внутри блока: eyebrow-точка ↔ текст 10 px, число ↔ подпись 6 px, padding панели преимуществ 24/22 px (mobile), 32/34 px (768+), 40/42 px (1024+). Заголовок секции → её контент: 32 px mobile, 48 px от 768 (выведено). Для текстового стека в новых секциях используйте те же `stack-*`.

## 6. Radius

| Токен | Значение | Где |
|---|---|---|
| `rounded-hero` (`--hero-radius`) | 24 / 28 / 32 px (mobile / 768+ / 1024+) | Hero-блок, крупные изображения, панели, секции-блоки |
| `rounded-card` (`--card-radius`), выведено | 16 / 20 / 24 px | карточки и вложенные блоки |
| `rounded-full` | пилюля | все кнопки, точка eyebrow, бейджи |

Форма: мягкие большие скругления, никаких острых углов у блоков; кнопки всегда пилюля. Панель преимуществ вырезает угол блока вогнутыми скруглениями радиуса `--hero-radius`.

## 7. Components

- **Container / Section** — `container.tsx`, `section.tsx` (`py-section`, внутри `Container`).
- **Heading / Lead / Eyebrow** — `typography.tsx`, проп `tone`: `default` (светлый фон) или `onPhoto` (белый текст на фото).
- **CtaLink / CtaGroup** — `cta.tsx`.
- **Navbar, Brand, MobileMenu** — шапка (`navbar.tsx`, `brand.tsx`, `mobile-menu.tsx`).
- **Advantages** — составная панель с тремя показателями (`type-stat` + `type-caption`), фон `background`, на mobile прямоугольник на всю ширину экрана под фото.
- **Карточка (выведено)**: `bg-card rounded-card p-5 md:p-6`, граница `border` по необходимости, без тени; заголовок `type-h3`, текст `type-body`, вторичный текст `text-muted-foreground`. Плашка-бейдж: `rounded-full bg-secondary px-3 py-1 type-caption`.
- **Contractor** (`contractor.tsx`) — текстовая секция без карточек, всё по центру: строка-заголовок `Heading level="statement"` (`foreground`, SemiBold 600) и три предложения `type-statement` в `muted-foreground`, каждое на своей строке, без отступов между строками на десктопе (8 px на mobile). Шаблон для лёгких текстовых блоков.
- **Pricing / PlanCard** (`pricing.tsx`, `plan-card.tsx`) — три карточки тарифов: `bg-card rounded-card overflow-hidden`, фото 4:3 сверху (на 768–1023 px карточка горизонтальная: фото слева 40%), тело `p-5 md:p-6`, название `type-h3`, цена `type-price text-primary`, разделитель `border-border`, строки `type-caption`/`type-h3`/`type-body`, кнопка `CtaLink` на всю ширину внизу (`mt-auto`). Сетка: 1 колонка до 1024 px, 3 колонки от 1024 px, gap 12 / 24 px. Заголовок секции слева (`Heading h2` + `Lead`).
- **Calculator** (`calculator-section.tsx`, клиентский `calculator.tsx`) — форма в `bg-card rounded-card p-5 md:p-8` и карточка результата; сетка 12 колонок на lg (7 + 5, результат sticky), на меньших экранах колонкой, gap 12 / 24 px. Поле площади: `h-12 rounded-full`, рядом ползунок `accent-primary`. Выбор через radio-чипы (`rounded-full h-11`, выбранный `bg-primary text-primary-foreground`, текст `type-button`), результат `type-h2 text-primary`. Формула: площадь × ставка вида ремонта (`site.pricing.plans[].rate`) × коэффициент состояния (`site.calculator.conditions[].coef`: 1 / 1,1 / 1,2); ставки и коэффициенты хранятся в `lib/site.ts`.
- **Included** (`included.tsx`) — шесть карточек и фото. От 1280 px: сетка `1fr / 1.7fr / 1fr` (фото шире колонок), карточки 1–3 слева, 4–6 справа, фото `rounded-hero` по центру на три ряда. 768–1279 px: фото широким баннером сверху, ниже карточки в две колонки. Mobile: фото, затем карточки колонкой по порядку. Карточки `rounded-card p-5 md:p-8`, первая акцентная (`bg-primary text-primary-foreground`), остальные `bg-card`; заголовок `type-h3`, описание `type-body` (`muted-foreground`). Фото в `public/included/`.
- **Payments** (`payments.tsx`, id `payments`) — «4 платежа, 0 рисков». Заголовок `h2` + `Lead`, как в Pricing. Четыре карточки `rounded-card bg-card p-5 md:p-8 xl:p-6`: сверху полоса `h-1 rounded-full bg-primary` (акцентный синий вместо жёлтого референса), метка «Платёж N» (`type-eyebrow`), процент `type-price text-primary`, описание `type-body`. Сетка: 1 колонка на mobile, 2 от `sm`, 4 от `xl`. Ниже три заметки с галочкой (круг `bg-primary/10`, иконка `Check`), каждая в одну строку: от 1400 px в ряд на всю ширину (`justify-between`, `whitespace-nowrap`), ниже колонкой, текст переносится только на узких mobile. Под ними по центру `CtaLink` `width="fixed"` (на mobile на всю ширину).
- **Warranty** (`warranty.tsx`, id `warranty`) — «3 года гарантии». Шапка как у Pricing/Payments. От `lg` сетка из 3 колонок: акцентная карточка `bg-primary` на два ряда слева (метка `type-eyebrow` вверху, значение `type-stat` и текст внизу), справа две белые карточки (метка `type-eyebrow`, значение `type-price text-primary`, текст `type-body muted`) и под ними широкая карточка `col-span-2` с галочкой (круг `bg-primary/10`, `Check`) и строкой про талон. Ниже `lg` — одна колонка в том же порядке. Карточки `rounded-card p-5 md:p-8`.
- **Report** (`report.tsx`, id `report`) — «Фотоотчёт каждый день». Шапка как у остальных секций. Шесть карточек `rounded-card bg-card p-5 md:p-8`: круг `size-12 bg-primary/10` с иконкой lucide (`size-5`, `strokeWidth 1.75`, `text-primary`), заголовок `type-h3`, текст `type-body muted-foreground`. Сетка: 1 колонка на mobile, 2 от `sm`, 3 от `lg`. Иконки подбираются по ключу из `lib/site.ts`.
- **Projects** (`projects.tsx`, id `projects`) — «Наши объекты». Только `h2`, без eyebrow. Шесть одинаковых карточек `rounded-card bg-card overflow-hidden`: сверху `CompareSlider` (4:3), ниже бейдж вида ремонта (`bg-primary/10 text-primary`, `type-caption`), название `type-h3`, `dl` «Бюджет / Срок» с верхней границей. Сетка: 1 колонка на mobile, 2 от `md`, 3 от `lg` (3 × 2). Под сеткой по центру `CtaLink` `width="fixed"`. Фото в `public/projects/N-before|after.jpg`; «до» совпадает с «после» по планировке и ракурсу, чтобы ручка сравнивала одно и то же помещение.
- **CompareSlider** (`compare-slider.tsx`, client) — сравнение «до / после». Слой «до» обрезан `clip-path` по позиции ручки, метки «До» / «После» — пилюли `bg-black/55`. Ручка: круг `size-11 bg-primary` с `ChevronsLeftRight`, кольцо `ring-4 ring-white`, линия 2 px белая. Управление: перетаскивание мышью и пальцем (pointer events, `touch-action: pan-y`, чтобы страница скроллилась по вертикали), клик по фото переносит ручку, с клавиатуры стрелки (Shift — крупный шаг), Home/End; `role="slider"` с `aria-valuenow`.
- **Situations** (`situations.tsx`, id `situations`) — «4 ситуации, в которых к нам приходят». Только `h2`, без подзаголовка. Четыре карточки `rounded-card bg-card p-5 md:p-8 xl:p-6`: заголовок `type-h3` и текст `type-body muted-foreground`, без иконок и кнопок. Сетка: 1 колонка на mobile, 2 от `sm`, 4 от `xl`.
- **Faq** (`faq.tsx`, id `faq`) — «Отвечаем на частые вопросы». Заголовок `h2` сверху, под ним на всю ширину контейнера аккордеон. Аккордеон — shadcn `Accordion` (`components/ui/accordion.tsx`, base-ui), стилизован под систему: каждый вопрос — карточка `rounded-card bg-card` с отступами `p-5 md:p-6`, вопрос `type-lead font-medium`, справа круг `size-8 bg-primary/10` с `Plus`/`Minus`, ответ `type-lead text-muted-foreground`, высота панели анимируется 200 мс (отключается при `prefers-reduced-motion`). Одновременно открыт один пункт, по умолчанию все свёрнуты. Вопросы и ответы — в `lib/site.ts`.
- **Lead** (`lead-section.tsx`, `lead-form.tsx`, id `contacts` — сюда ведут все CTA) — «Смета за 24 часа». От `lg` две колонки: слева `h2` и `Lead` (5/12, `sticky`), справа форма-карточка `rounded-card bg-card p-5 md:p-8` (7/12); ниже `lg` друг под другом. Поля — пилюли `h-12 rounded-full border-border bg-background` с подписью `type-caption` сверху: Имя и Телефон в ряд от `sm`, Метраж на всю ширину, ошибка под полем `type-caption text-destructive`. «Тип жилья» и «Вид ремонта» — те же `ChoiceGroup` (`choice-group.tsx`), что и в калькуляторе. Кнопка `Button` `xl` на всю ширину, под ней согласие на обработку данных `type-caption muted`. Состояния: ошибка валидации (фокус на первое неверное поле), отправка (кнопка отключена, «Отправляем…»), успех (карточка с галочкой и ссылкой «Отправить ещё одну заявку»), сбой сети (`role="alert"`). Телефон маскируется до `+7 (900) 123-45-67`. Заявка уходит на `POST /api/lead` (`app/api/lead/route.ts`): проверяет данные и пишет заявку в лог сервера — для боевой отправки замените блок «доставка» в этом файле.
- **Навигация** (`site.nav` в `lib/site.ts`, используется в `navbar.tsx` и `mobile-menu.tsx`): Цены → `#prices`, Как работаем → `#included`, Гарантии → `#warranty`, Объекты → `#projects`, FAQ → `#faq`. CTA «Рассчитать стоимость» → `#calculator`, остальные кнопки-заявки → `#contacts`. Скролл плавный (`scroll-behavior: smooth`, отключается при `prefers-reduced-motion`).
- **Анимация прокрутки** (`scroll-reveal.tsx`, стили в `globals.css`) — как на remont-tat.ru: блоки с атрибутом `data-reveal` плавно проявляются и выезжают снизу на 34 px (`data-reveal="scale"` — вырастают с 0.94), 0.9 с, кривая `cubic-bezier(.22, .61, .36, 1)`, запуск через `IntersectionObserver` (порог 12 %, отступ снизу 6 %). Блоки, попавшие в экран одновременно, идут каскадом с шагом 80 мс (не более 6 шагов). Hero и всё, что уже на экране при загрузке, не анимируется; при `prefers-reduced-motion` и без JS всё показывается сразу. Чтобы анимировать новый блок, добавьте ему `data-reveal`. Размечены заголовки, карточки, формы и кнопки всех секций после Hero.
- Тексты и данные хранятся в `lib/site.ts`.

## 8. Изображения и декор

- Фото карточек (`public/pricing/`): светлые интерьеры без людей, `object-cover`, верх карточки скругляется её `overflow-hidden`.
- Фото: `next/image` `fill`, `object-cover`, `objectPosition` из конфига, радиус `rounded-hero`, по всей площади блока (без подложки и рамок).
- Светлые современные интерьеры, без людей, текста и логотипов; на фото с текстом равномерное затемнение 0.36.
- Теней нет, градиентов и декоративных элементов нет. Единственный «декор» — точка перед eyebrow и вырез панели преимуществ. Контраст достигается цветом фона, а не тенями.

## 9. Responsive

| | Mobile (< 768) | Tablet (768–1023) | Desktop (≥ 1024) |
|---|---|---|---|
| Поле `inset` | 12 | 16 | 24 |
| Радиус блоков | 24 | 28 | 32 |
| H1 | 26–36 px, 2 строки (вторая «в Казани под ключ») | 44–53 px, «Ремонт квартир в Казани / под ключ» | до 72 px |
| Lead | 16 px | 18 px | 18 px |
| Eyebrow | 12 px (13 px от 640) | 13 px | 13 px |
| Шапка | 64 px, бренд + бургер | 76 px, бренд + CTA + бургер | 76 px, бренд + меню + CTA |
| CTA | колонка, на всю ширину (до 640), в ряд от 640, 240 px | в ряд | в ряд |
| Преимущества | прямоугольный блок на всю ширину экрана под фото, 3 колонки по центру | вырез в правом нижнем углу, 52% | вырез, 46% |
| Порядок элементов | eyebrow → H1 → lead → CTA → преимущества | то же | то же |

Принципы: иерархия и характер те же на всех экранах; mobile не «уменьшенный desktop», а свой ритм (`stack-*`, отдельные переносы заголовка, блок преимуществ на всю ширину). Горизонтальной прокрутки быть не должно, проверять на 360, 390, 820, 1024, 1440, 1920.

## Чек-лист для каждой новой секции

1. Обёрнута в `Section`/`Container`, отступ `py-section`.
2. Заголовок через `Heading` (`h2`/`h3`), текст через `Lead` и `type-body`, без своих размеров.
3. CTA только через `CtaLink`/`CtaGroup`, без своих кнопок.
4. Цвета, радиусы и отступы только из токенов, без `#hex`, `rounded-[..]`, `mt-[..px]`, если токен существует.
5. Нет теней и декоративных эффектов, которых нет в Hero.
6. Проверка на 360 / 390 / 820 / 1440 / 1920: без горизонтальной прокрутки и наложений.
7. Hero не менять без прямой просьбы; после правок общих токенов сверять скриншоты Hero.
