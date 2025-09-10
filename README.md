# Mini Task Tracker

Простое приложение для управления задачами с бэкендом на Express и фронтендом на Angular.

## Бэкенд (Express)

### Установка и запуск

```bash
# Установить зависимости
npm install

# Запустить сервер
npm start

# Или в режиме разработки с автоперезагрузкой
npm run dev
```

Сервер запустится на http://localhost:3000

### API Endpoints

- `GET /api/tasks` - получить все задачи
- `POST /api/tasks` - создать новую задачу
  - Body: `{ "title": string, "completed": boolean }`
- `PATCH /api/tasks/:id` - обновить задачу
  - Body: `{ "completed": boolean }` или `{ "title": string }`
- `DELETE /api/tasks/:id` - удалить задачу

## Фронтенд (Angular)

### Установка и запуск

```bash
# Перейти в папку фронтенда
cd frontend

# Установить зависимости
npm install

# Запустить в режиме разработки
ng serve
```

Приложение будет доступно на http://localhost:4200

### Функциональность

- Таблица задач с полями: ID Задачи, Название, Статус
- Чекбоксы для отметки задач как выполненных/невыполненных
- Кнопки удаления задач
- Модальное окно для добавления новых задач
- Уведомления об операциях
- Современный UI с PrimeNG

## Быстрый запуск

1. Запустить бэкенд:

```bash
npm install
npm start
```

2. В новом терминале запустить фронтенд:

```bash
cd frontend
npm install
ng serve
```

3. Открыть http://localhost:4200 в браузере

## Технологии

**Бэкенд:**

- Node.js + Express
- UUID для генерации ID
- CORS для кросс-доменных запросов
- In-memory хранение данных

**Фронтенд:**

- Angular 19+ (zoneless)
- PrimeNG UI компоненты
- TypeScript
- RxJS для HTTP запросов
