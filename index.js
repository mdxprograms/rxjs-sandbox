(function(document) {
  "use strict";
  const bgColors = ["#f0f0f0", "#333"];

  let state = {
    count: 0,
    bgColor: bgColors[0]
  };

  // selectors
  const counter = document.querySelector(".counter");
  const bgBtnClick = rxjs.fromEvent(
    document.querySelector(".change-background"),
    "click"
  );
  const addBtnClick = rxjs.fromEvent(document.querySelector(".add"), "click");
  const minusBtnClick = rxjs.fromEvent(
    document.querySelector(".minus"),
    "click"
  );

  // events
  bgBtnClick
    .pipe(
      rxjs.operators.map(
        () =>
          (state.bgColor =
            state.bgColor === bgColors[0] ? bgColors[1] : bgColors[0])
      )
    )
    .subscribe(() => (document.body.style.backgroundColor = state.bgColor));

  addBtnClick
    .pipe(rxjs.operators.map(() => (state.count = state.count + 1)))
    .subscribe(() => (counter.innerHTML = state.count));

  minusBtnClick
    .pipe(rxjs.operators.map(() => (state.count = state.count - 1)))
    .subscribe(() => (counter.innerHTML = state.count));
})(document);
