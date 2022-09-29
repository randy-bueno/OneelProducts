(function () {
  const { setState, getState, onChangeState, getStoreLength } = useState(
    PRODUCT_CAR,
    []
  );

  function getProduct(id) {
    const store = getState();
    const i = testListProducts.findIndex((item) => item.id == id); // Sera el Array de Productos a fin de evitar peticiones innecesarias
    const product = { ...testListProducts[i] };
    const match = store.filter((item) => item.id == product.id);
    return { data: product, exist: match.length > 0 };
  }

  function addProduct(id) {
    const { data, exist } = { ...getProduct(id) };
    if (!exist)
      setState((prevData) => [...prevData, { id, quantity: 1, data }]);
  }

  function onChangeQuantity(quantity, id) {
    try {
      const store = getState();
      const productId = store.findIndex((item) => item.id == id);
      const newStore = [...store];
      const product = newStore[productId];
      newStore[productId] = { ...product, quantity }
      setState([...newStore]);
    } catch (error) {
      console.log(error);
    }
  }

  function onDeleteItem (id) {
    try {
      const store = getState();
      const newStore = store.filter((item) => item.id != id);
      setState(newStore);
    } catch (err) {
      console.error(err)
    }
  }

  // DOM
  const carContent = document.getElementById("content-shopping_car");
  const cardShop = document.getElementById("template-card-shop").content;
  const fragment = document.createDocumentFragment();
  function createCarShopTemplate(items) {
    items.forEach(function ({ quantity, data }) {
      cardShop.querySelector("h5").textContent = data.name;
      cardShop.querySelector(".input-canti").value = quantity;
      cardShop.querySelector(".input-canti").setAttribute("data-id", data.id);
      cardShop
        .querySelector("[name='delete-shop-item']")
        .setAttribute("data-id", data.id);
      const cloneElement = cardShop.cloneNode(true);
      fragment.appendChild(cloneElement);
    });
    carContent.appendChild(fragment);
    if (!items.length) {
      carContent.innerHTML =
        "<p style='font-size: 12px; margin-top: 50%;'>Aún no Agrega Productos al Carrito</p>";
    }
    carContent.querySelectorAll(".input-canti").forEach(function (item) {
      item.addEventListener("change", function ({ target }) {
        if (target.valueAsNumber < 1) target.value = 1;
        onChangeQuantity(target.valueAsNumber, target.getAttribute("data-id"));
      })
    });
    carContent.querySelectorAll("[name='delete-shop-item']").forEach(function (item) {
      item.addEventListener("click", function ({ currentTarget }) {
        onDeleteItem(parseInt(currentTarget.getAttribute("data-id")));
      });
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    createCarShopTemplate(getState());
    onChangeState(function ({ data }) {
      carContent.innerHTML = "";
      createCarShopTemplate(data);
    });
  });

  document.getElementsByName("btn-add-car").forEach(function (btn) {
    const _id = btn.getAttribute("data-id");
    btn.addEventListener("click", () => addProduct(_id));
  });
  document.getElementsByName("indicator-car").forEach(function (indicator) {
    indicator.innerText = getStoreLength();
    onChangeState(({ data }) => (indicator.innerText = data.length));
  });
})();
