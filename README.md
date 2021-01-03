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
2. Заменяем объект `state` класса `App` на три (по количеству переменных состояния) \
   вызова функции `useState`:
   
   ```javascript
   const [ posts, setPosts ] = useState(initPost)
   const [ theme, setTheme ] = useState('light')
   const [ check, setCheck ] = useState(false)
   ```
   
3. Изменяем метод `change` класса `App` на аналогичную функцию:
   
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
