function useState(identifier, initialState = undefined) {
  if (!localStorage.getItem(identifier))
    localStorage.setItem(identifier, JSON.stringify(initialState));

  function onChangeState(callback = function () {}) {
    for (let method of ["setItem", "removeItem"]) {
      const original = localStorage[method].bind(localStorage);
      const newMethod = function (...args) {
        if (args[0] !== identifier) return;
        const [key, data] = args;
        callback({ method, key, data: JSON.parse(data) });
        return original.apply(null, args);
      };
      localStorage[method] = newMethod.bind(localStorage);
    }
  }

  function getState() {
    return [...JSON.parse(localStorage.getItem(identifier))];
  }

  function setState(currentData) {
    const prevData = getState(identifier);
    const newData =
      typeof currentData == "function"
        ? currentData(prevData)
        : [...currentData];
    localStorage.setItem(identifier, JSON.stringify(newData));
    return newData;
  }

  function getStoreLength () {
    const store = getState();
    return store.length;
  }

  return { setState, getState, onChangeState, getStoreLength };
}
