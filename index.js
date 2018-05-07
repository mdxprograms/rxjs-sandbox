(function(document) {
  "use strict";
  const bgColors = ["#ddd", "#333"];

  let state = {
    title: "",
    count: 0,
    bgColor: bgColors[0]
  };

  const dispatch = {
    titleChange: function(e) {
      return (state.title = e.target.value);
    },
    bgChange: function() {
      return (state.bgColor =
        state.bgColor === bgColors[0] ? bgColors[1] : bgColors[0]);
    },
    counterInc: function() {
      return (state.count = state.count + 1);
    },
    counterDec: function() {
      return (state.count = state.count - 1);
    }
  };

  const dom = {
    titleInput: function(val) {
      document.title = val;
    },
    bgColor: function(val) {
      document.body.style.backgroundColor = val;
    },
    counter: function(val) {
      document.querySelector(".counter").innerHTML = val;
    }
  };

  // selectors
  const onTitleChange = rxjs.fromEvent(
    document.querySelector(".change-title"),
    "input"
  );
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
  onTitleChange
    .pipe(rxjs.operators.map(dispatch.titleChange))
    .subscribe(dom.titleInput);

  bgBtnClick.pipe(rxjs.operators.map(dispatch.bgChange)).subscribe(dom.bgColor);

  addBtnClick
    .pipe(rxjs.operators.map(dispatch.counterInc))
    .subscribe(dom.counter);

  minusBtnClick
    .pipe(rxjs.operators.map(dispatch.counterDec))
    .subscribe(dom.counter);
})(document);
