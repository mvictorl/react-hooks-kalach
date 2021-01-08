# Создание проекта React приложения

 Приложение создано с помощью [Create React App](https://github.com/facebook/create-react-app).

### Запуск проекта

Запуск приложения в режиме разработки:
`yarn start`

Запущенное в режиме разработки приложение открывается по адресу: \
[http://localhost:3000](http://localhost:3000) в браузере.

При сохранении изменений приложение в браузере перегружается автоматически.

# Создаем стартовый шаблон приложения 
Стартовый шаблон приложения создается на основе GitHub-репозитория: \
[VladKalachev/react-hooks](https://github.com/VladKalachev/react-hooks/tree/starter) (branch `starter`)

___

##§1 Хук состояния `useState`

```js
const [state, setState] = useState(initialState)
```

Возвращает значение с состоянием (`state`) и функцию для его обновления (`setState`).

Во время первоначального рендеринга возвращаемое состояние (`state`) совпадает со значением, \
переданным в качестве первого аргумента (`initialState`).

Функция `setState` используется для обновления состояния. \
Она принимает новое значение состояния и ставит в очередь повторный рендер компонента.

1. Изменяем классовый компонент `App.js` на функциональный.
2. Добавляем импорт `useState` из библиотеки `react`:

   ```javascript
   import { useState } from "react"
   ```

3. Заменяем объект `state` класса `App` на три (по количеству переменных состояния) \
   вызова функции `useState`:
   
   ```javascript
   const [ posts, setPosts ] = useState(initPost)
   const [ theme, setTheme ] = useState('light')
   const [ check, setCheck ] = useState(false)
   ```
   
4. Изменяем метод `change` класса `App` на аналогичную функцию:
   
    ```javascript
    const change = () => {
      setTheme(theme === 'light' ? 'dark' : 'light')
      setCheck(!check)
    }
    ```
4. Заменяем `this.state.posts`, `this.state.theme` и `this.state.check` на соответствующие \
   `posts`, `theme` и `check`:
   
   ```javascript
   return (
      <div className={ `app ${ theme }` }>
         <Header check={ check } changeTheme={ change }/>
         <PostList posts={ posts }/>
         <Footer/>
      </div>
   )
   ```
___

##§2 Хук эффекта `useEffect`

```javascript
useEffect(
  () => {
    const subscription = props.source.subscribe()
    
    return () => {
      // Очистить подписку
      subscription.unsubscribe()
    } 
  },
        
  [props.source]
)
```

Хук `useEffect` предназначен для работы с **сайд-эффектами**, такими как запросы к серверу, подписки, таймеры, логирование, непосредственная работа с DOM и другие побочные эффекты, которые не допускаются внутри тела функционального компонента _(т.е. на этапе рендеринга)_.

По умолчанию эффект запускается после каждого завершённого рендеринга, но возможно определить его запуск только при изменении определённых значений _(см. ниже)_.

> Первый параметр - _callback_-функция, которая запускается после того, как рендер компонента будет зафиксирован на экране.
> 
>> Данная функция может возвращать _callback_-функцию, которая будет запускаться перед удалением компонента _(например, для очистки данных или отписки)_. 

> Второй параметр _(не обязательный)_ - массив значений, от изменения которых зависит эффект.
>> Если параметр отсутствует, то каждое изменение состояния компонента приводит к вызову _callback_-функции.
>
>> Если передать пустой массив, то `useEffect` выполнится один раз.

1. Добавляем импорт `useEffect` из библиотеки `react`:

   ```javascript
   import { useEffect } from "react"
   ```

Для демонстрации сайд-эффекта используем получение списка постов с сайта [{JSON} Placeholder](https://jsonplaceholder.typicode.com)

2. Задаем начальное состояние постов, как пустой массив:

   ```javascript
   const [ posts, setPosts ] = useState([])
   ```

3. Используем `useEffect` для получения списка постов с помощью асинхронной функции `fetch` _(возвращающей Promise)_ с сайта (единожды, после рендеринга компонента `App`):

   ```javascript
   useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
         .then(response => response.json())
         .then(json => setPosts(json))
   }, [])
   ```
Для демонстрации зависимости `useEffect` от параметра создадим две кнопки, по нажатии на которые массив постов будет заполнен с сервера данными о постах или пользователях соответственно.

4. Создаем строковую переменную, определяющую тип данных массива, с помощью `useState` \
   (переменная содержит строку, путь адреса сайта: `'post'` или `'users'`):

   ```javascript
   const [ typeRequest, setTypeRequest ] = useState('posts')
   ```
5. Изменяем функцию `useEffect` на использование адреса сайта с учетом переменной `typeRequest` (в том числе в виде второго параметра). \
   Также для демонстрации использования возвращаемой `useEffect` функции меняем с задержкой название страницы:

   ```javascript
   useEffect(() => {
    setTimeout(() => {
      document.title = `${ typeRequest } Page`
    }, 500)
   
    fetch(`https://jsonplaceholder.typicode.com/${ typeRequest }`)
      .then(response => response.json())
      .then(json => setPosts(json))
    return () => {
      document.title = 'Page'
    }
   }, [ typeRequest ])
   ```

6. Вносим необходимые изменения в компонент `Post` для отображения списков в зависимости от выбора.  
___
