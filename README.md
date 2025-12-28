# MC-Case Battle

Платформа для открытия кейсов Minecraft с автоматической доставкой предметов в игру.

## Технологии

- **React 18** - UI библиотека
- **TypeScript** - типизация
- **Vite** - сборщик и dev-сервер
- **React Router** - роутинг
- **Tailwind CSS** - стилизация
- **Lucide React** - иконки

## Установка

```bash
# Установить зависимости
npm install

# Или
yarn install

# Или
bun install
```

## Запуск

```bash
# Запустить dev-сервер
npm run dev

# Собрать для production
npm run build

# Предпросмотр production сборки
npm run preview
```

## Структура проекта

```
├── src/
│   ├── pages/          # Страницы приложения
│   │   ├── HomePage.tsx
│   │   ├── CasePage.tsx
│   │   ├── InventoryPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── UpgradePage.tsx
│   ├── App.tsx         # Главный компонент с роутингом
│   └── main.tsx        # Точка входа
├── components/         # React компоненты
├── hooks/             # Кастомные хуки
├── services/          # Сервисы
├── types/            # TypeScript типы
├── utils/            # Утилиты
└── app/              # Глобальные стили (globals.css)
```

## Роутинг

- `/` - Главная страница
- `/case/:slug` - Страница кейса
- `/inventory` - Инвентарь
- `/profile` - Профиль пользователя
- `/upgrade` - Страница апгрейдов

## Миграция с Next.js

Проект был успешно перенесён с Next.js на React:

- ✅ Все страницы перенесены в `src/pages/`
- ✅ Роутинг заменён на React Router
- ✅ Все импорты обновлены
- ✅ Компоненты работают без изменений
- ✅ Стили и анимации сохранены
