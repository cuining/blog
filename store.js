import { action, observable } from 'mobx'
import 'isomorphic-fetch'

let store = null

class Store {
  @observable issues = []

  @action getIssues = async () => {
    const res = await fetch('https://api.github.com/repos/cuining/blog/issues')
    const issues = await res.json()

    return issues
  }
}

export function initStore (isServer) {
  if (isServer) {
    return new Store()
  } else {
    if (store === null) {
      store = new Store()
    }
    return store
  }
}
