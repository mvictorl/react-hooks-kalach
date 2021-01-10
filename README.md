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

## §1 Хук состояния `useState`

```js
const [ state, setState ] = useState(initialState)
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

## §2 Хук эффекта `useEffect`

```javascript
useEffect(
  () => {
    const subscription = props.source.subscribe()

    return () => {
      // Очистить подписку
      subscription.unsubscribe()
    }
  },

  [ props.source ]
)
```

Хук `useEffect` предназначен для работы с **сайд-эффектами**, такими как запросы к серверу, подписки, таймеры,
логирование, непосредственная работа с DOM и другие побочные эффекты, которые не допускаются внутри тела функционального
компонента _(т.е. на этапе рендеринга)_.

По умолчанию эффект запускается после каждого завершённого рендеринга, но возможно определить его запуск только при
изменении определённых значений _(см. ниже)_.

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

Для демонстрации сайд-эффекта используем получение списка постов с
сайта [{JSON} Placeholder](https://jsonplaceholder.typicode.com)

2. Задаем начальное состояние постов, как пустой массив:

   ```javascript
   const [ posts, setPosts ] = useState([])
   ```

3. Используем `useEffect` для получения списка постов с помощью асинхронной функции `fetch` _(возвращающей Promise)_ с
   сайта (единожды, после рендеринга компонента `App`):

   ```javascript
   useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
         .then(response => response.json())
         .then(json => setPosts(json))
   }, [])
   ```

Для демонстрации зависимости `useEffect` от параметра создадим две кнопки, по нажатии на которые массив постов будет
заполнен с сервера данными о постах или пользователях соответственно.

4. Создаем строковую переменную, определяющую тип данных массива, с помощью `useState` \
   (переменная содержит строку, путь адреса сайта: `'post'` или `'users'`):

   ```javascript
   const [ typeRequest, setTypeRequest ] = useState('posts')
   ```
5. Изменяем функцию `useEffect` на использование адреса сайта с учетом переменной `typeRequest` (в том числе в виде
   второго параметра). \
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

## §3 Хук мемоизации `useMemo`

```js
const memoizedValue = useMemo(() =>
  computeExpensiveValue(a, b), [ a, b ])
```

> Первый параметр — мемоизируемая _callback_-функция.

> Второй параметр — массив зависимостей.

Хук `useMemo` вычисляет повторно _callback_-функцию только тогда, когда изменились значения зависимостей, указанные во
втором параметре.

**Используйте `useMemo` как оптимизацию производительности, а не как семантическую гарантию.**

0. _[дополнительно, не относится непосредственно к хуку `useMemo`]_ \
   Если добавить в компонент `Post` лог, то можно заметить, что рендер компонента происходит лишнее количество раз.\
   Для оптимизации можно _мемоизировать_ данный компонент. \
   А именно, обернуть экспортируемую переменную `Post` функцией `memo` из пакета `react`:

   ```javascript
   export default React.memo(Post)
   ```
   Данная функция отслеживает изменения входящих в компонент `props`, и если они не менялись, то использует кэшированное
   значение компонента.

1. Для демонстрации использования `useMemo` добавим в компонент `Post` два состояния с использованием `useState`:

   ```javascript
   const [ counter, setCounter ] = useState(0)
   const [ isGreen, setIsGreen ] = useState(false)
   ```

2. Также добавим функцию, зависящую от `counter`, кнопку, увеличивающую `counter`, обработку клика по параграфу,
   изменяющему `isGreen`.

3. Проблема состоит в том, что при изменении состояния `isGreen` происходит рендеринг компонента с вызовом функции,
   хотя `counter` не изменялся. \
   Для устранения этой проблемы можно _мемоизировать_ данную функцию с помощью `useMemo` с указанием зависимости
   от `counter`:

   ```javascript
   const sum = useMemo(() => testSum(counter), [ counter ])
   ```

___

## §4 Хук прямого взаимодействия с DOM `useRef`

```js
const refContainer = useRef(initialValue)
```

`useRef` возвращает изменяемый ref-объект, свойство `.current` которого инициализируется переданным
аргументом `initialValue`. \
Возвращённый объект будет сохраняться в течение всего времени жизни компонента.

Мутирование свойства `.current` не вызывает повторный рендер. \
Если необходимо запустить некоторый код, когда React присоединяет или отсоединяет _ref_ к узлу DOM, можно
использовать [_callback_-реф](https://ru.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node) вместо этого.

1. Добавляем импорт `useRef` из библиотеки `react`:

   ```javascript
   import { useRef } from "react"
   ```

2. Создаем переменную `myRef` с помощью функции `useRef`, инициализируя её начальным значением `null`:

   ```javascript
   const myRef = useRef(null)
   ```

   > В данном случае, при инициализации
   >```javascript
   >myRef == { current: null }
   >```

3. Для демонстрации использования `useRef` добавляем элементы `<input>` с атрибутом `ref` равным `myRef` и `<button>` с
   обработчиком `onClick` равным пользовательской функции `handlerFocus`:

   ```javascript
   const handlerFocus = () => {
      console.log(myRef.current)
   }
   ```

   > Теперь _ref_ равен
   >```javascript
   >myRef == { current: input }
   >```
   >а его значение _current_
   >```javascript
   >myRef.current == <input type="text">
   >```

4. Теперь возможны манипуляции с данным DOM-элементом. \
   Например, передача ему фокуса и/или изменение цвета текста:

   ```javascript
   const handlerFocus = () => {
      myRef.current.focus()
      myRef.current.style.color = 'red'
   }
   ```

___

## §5 Хук контекста `useContext`

```js
const value = useContext(MyContext)
```

[Контекст](https://ru.reactjs.org/docs/context.html) позволяет передавать данные конкретным компонентам через дерево
компонентов без необходимости передавать пропсы на промежуточных уровнях.

Принимает объект контекста _(значение, возвращённое из `React.createContext`)_ и возвращает текущее значение контекста
для этого контекста. Текущее значение контекста определяется пропом `value` ближайшего `<MyContext.Provider>` над
вызывающим компонентом в дереве.

Когда ближайший `<MyContext.Provider>` над компонентом обновляется, этот хук вызовет повторный рендер с последним
значением контекста, переданным этому провайдеру `MyContext`. Даже если родительский компонент использует `React.memo`
или реализует `shouldComponentUpdate`, то повторный рендер будет выполняться, начиная c компонента,
использующего `useContext`.

Запомните, аргумент для useContext должен быть непосредственно сам объект контекста.

Компонент, вызывающий `useContext`, всегда будет перерендериваться при изменении значения контекста. Если повторный
рендер компонента затратен, вы можете оптимизировать его с помощью мемоизации.

Для демонстрации используем контекст для изменения темы приложения:

1. Создаем в корне приложения _(папка `src`)_ файл `context.js`, в котором создадим с помощью функции `createContext`
   библиотеки `react` переменную `ThemeContext`, содержащую значение темы в контексте:

   ```javascript
   import React from 'react'
   const ThemeContext = React.createContext()
   export default ThemeContext
   ```

2. Импортируем данный контекст в `index.js` файл:

   ```javascript
   import ThemeContext from "./context"
   ```

3. Вынесем компонент `App` из функции `ReactDOM.render` в отдельный функциональный компонент (для возможности переноса в
   него состояния темы), оборачиваем его в компонент `ThemeContext.Provider` с начальными значениями,
   возвращаемыми `useState`. \
   Теперь дочерние компоненты имеют возможность доступа к переменной `theme` и функции `setTheme`:

   ```javascript
   function Main() {
    const [ theme, setTheme ] = useState('light')
   
    return (
      <React.StrictMode>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <App/>
        </ThemeContext.Provider>
      </React.StrictMode>
    )
   }
   
   ReactDOM.render(<Main/>, document.getElementById('root'))
   ```

4. В компоненте `App` добавляем импорт `useContext` из библиотеки `react` и сам контекст:
   ```javascript
   import React, { useContext } from 'react'
   
   import ThemeContext from "../context"
   ```

5. Получаем доступ к контексту с помощью хука `useContext`. \
   Теперь компонент, в котором произошла подписка на контекст _(в данном случае `App`)_, будет перерендериваться при
   каждом изменении контекста:

   ```javascript
   const { theme, setTheme } = useContext(ThemeContext)
   ```

6. Если даже запретить перередеринг компонента `App`, например таким образом:

   ```javascript
   export default React.memo(App, () => true)
   ```

   при изменении контекста будет происходить его перерендеринг.

___

## §6 Хук `useReducer`

Альтернатива хуку `useState`, функционирующий аналогично библиотеке `Redux`.

```js
const [ state, dispatch ] = useReducer(reducer, initialArg, init)
```

где
> **reducer** - функция-**редюсер** типа `(state, action) => newState`, принимающая текущее состояние и экшен, а возвращающая новое состояние.

> **initialArg** - начальное состояние _(в виде объекта)_.

> **init** - функция, устанавливающая начальное состояние _лениво (lazy)_.

> **dispatch** - возвращаемый `useRuducer` (совместно с состоянием) метод, позволяющий изменять состояние в зависимости от переданного экшена, согласно логике редюсера.

1. Добавляем импорт `useReducer` из библиотеки `react`:

   ```javascript
   import { useReducer } from "react"
   ```

2. Создаем функцию-редюсер:

   ```javascript
   function reducer(state, action) {
      switch (action.type) {
         case 'fetch':
            return { ...state, posts: action.payload }
         case 'posts':
            return { ...state, typeRequest: action.type }
         case 'users':
            return { ...state, typeRequest: action.type }
         case 'check':
            return { ...state, check: !state.check }
         case 'reset':
            return init(action.payload)
         default:
            return state
      }
   }
   ```
   
3. Создаём заглушку функции `init`, которая возвращает состояние без изменений:

   ```javascript
   function init(state) {
      return state
   }
   ```
   
4. Используем хук `useReducer` для инициализации состояний и получения функции `dispatch`:

   ```javascript
   const [ data, dispatch ] = useReducer(
    reducer,
    {
      posts: [],
      check: false,
      typeRequest: 'posts'
    },
    init
   )
   ```
   
   Теперь переменные состояния хранятся в объекте `data`: \
   `data.posts`, \
   `data.check` и \
   `data.typeRequest`.
   
___
