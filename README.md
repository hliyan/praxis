# Praxis

*Praxis* is a [Flux](https://github.com/facebook/flux) mini-framework for building single page applications with [React.js](https://github.com/facebook/react).

## Features
- A simplified dispatch mechanism without action creators and action constants (a deviation from Facebook's Flux recommendations)
- A router based on [react-router](https://github.com/rackt/react-router)
- An extensible [base store](https://github.com/hliyan/praxis/blob/master/src/storage/ArrayStore.js)
- A [RESTful API wrapper](https://github.com/hliyan/praxis/blob/master/src/net/RESTApi.js) that can be embedded inside a store
- A localStorage based [session](https://github.com/hliyan/praxis/blob/master/src/app/Session.js) (WIP)
- [UI components](https://github.com/hliyan/praxis/tree/master/src/ui) (WIP)

## How to install

`npm install praxis`

## How to use the dispatcher

```javascript
import { Dispatcher } from 'praxis';

// register a store to receive dispatched actions
Dispatcher.register('notes', new TodoStore());

// register a callback to receive events from stores
Dispatcher.subscribe('todos', 'change', function() {
    console.log('todos changed');
});

// dispatch an event
Dispatcher.dispatch({ action: 'createTodo', text: 'Hello'});
```

- Here the `TodoStore` is extended from the ArrayStore
- Action names (e.g. `createTodo`) are the same as their handler function names in the store (this avoids action constants and switch statements)

## How to create a store

- The `ArrayStore` can be used as-is for in-memory storage

#### A simple REST store example

```javascript
import { ArrayStore, RESTApi } from 'praxis';

/**
 * A simple store with a downloadTodos action that fetches data from server
 */
export default class TodoStore extends ArrayStore {
    constructor() {
        super();
        this.api = new RESTApi('http://foobar.com');
    }

    downloadTodos(action) {
        this.api.get('/todos').then((res) => {
            if (res.status == '200') {
                res.body.data.forEach((todo) => {
                    this._insert(todo);
                });
                this.emit('change');
            } else {
                this.emit('change_fail');
            }
        }).catch((err) => {
            this.emit('change_fail');
        });
        this.emit('pending_change');       
    }
}
```

## How to run the samples

```
git clone git@github.com:hliyan/praxis-samples.git
cd praxis-samples/02-notes # run second sample
npm install
npm test
http://localhost:8080/webpack-dev-server/
```

## How to start a simple project from a boilerplate

```
git clone git@github.com:hliyan/praxis-samples.git
cd praxis-samples/00-boilerplate
```

- This directory gives you a standard package.json, a webpack config file and an empty application with a menu

## Things to be done
- UI components are incomplete
- webpack build takes too long because of node_modules (which are included because Praxis re-exports React and react-router)
- Complete work on Session, RESTApi etc.
