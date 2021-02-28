$(() => {
  // Состояние компонента
  const state = {
    style: "color",
    color: {
      red: 0,
      green: 0,
      blue: 0,
    },
    backgroundColor: {
      red: 255,
      green: 255,
      blue: 255,
    },
  };

  // Обновление выбранной палитры по изменению положения слайдера и отрисовка результата
  const updatePalette = ({ target: { id } }) => {
    const { style } = state;
    const currentPalette = state[style];

    currentPalette[id] = $(`#${id}`).slider("value");
    render(style, currentPalette);
  };

  // Функция отрисовки (обновление соответствующего css-свойства)
  const render = (style, palette) => {
    const { red, green, blue } = palette;

    $("#screen").css(`${style}`, `rgb(${red}, ${green}, ${blue})`);
  };

  // Переключение стиля (обработка переключения radio-кнопок) с позиционированием слайдера
  const changeStyle = ({ target: { id } }) => {
    state.style = id;
    updateSlidersValues(id);
  };

  // Функция позиционирования элементов слайдера в соответствии с палитрой выбранного стиля
  const updateSlidersValues = (style) => {
    const currentPalette = state[style];

    for (let component in currentPalette) {
      $(`#${component}`).slider("value", currentPalette[component]);
    }
  };

  // Инициализация с использованием начальных значений из state
  const init = () => {
    const { style, ...palettes } = state;

    // Установка активной radio-кнопки
    $(`#${style}`).attr("checked", true);

    // Настройка виджетов из библиотеки jQuery-UI
    $("#color, #backgroundColor")
      .checkboxradio({
        icon: false,
      })
      .change(changeStyle);

    $(".colorizer__slider").slider({
      orientation: "horizontal",
      range: "min",
      max: 255,
      value: 0,
      slide: updatePalette,
      change: updatePalette,
    });

    // Применение всех начальных стилей
    for (let key in palettes) {
      render(key, palettes[key]);
    }

    // Позиционирование элементов слайдера
    updateSlidersValues(style);
  };

  init();
});
