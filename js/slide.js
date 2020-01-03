const arr = [
  { id: 1, name: "Title 1", color: "#00AFAA" },
  { id: 2, name: "Title 2", color: "#FFC90E" },
  { id: 3, name: "Title 3", color: "#2C4251" },
  { id: 4, name: "Title 4", color: "#CAA8F5" },
  { id: 5, name: "Title 5", color: "#9984D4" },
  { id: 6, name: "Title 6", color: "#592E83" },
  { id: 7, name: "Title 7", color: "#BB7B92" },
  { id: 8, name: "Title 8", color: "#230C33" },
  { id: 9, name: "Title 9", color: "#5EEB5B" },
  { id: 10, name: "Title 10", color: "#26413C" },
  { id: 11, name: "Title 11", color: "#00AFAA" },
  { id: 12, name: "Title 12", color: "#FFC90E" },
  { id: 13, name: "Title 13", color: "#2C4251" },
  { id: 14, name: "Title 14", color: "#CAA8F5" },
  { id: 15, name: "Title 15", color: "#9984D4" },
  { id: 16, name: "Title 16", color: "#592E83" },
  { id: 17, name: "Title 17", color: "#BB7B92" },
  { id: 18, name: "Title 18", color: "#230C33" },
  { id: 19, name: "Title 19", color: "#5EEB5B" },
  { id: 20, name: "Title 20", color: "#26413C" },
  { id: 21, name: "Title 21", color: "#00AFAA" },
  { id: 22, name: "Title 22", color: "#FFC90E" },
  { id: 23, name: "Title 23", color: "#2C4251" },
  { id: 24, name: "Title 24", color: "#CAA8F5" },
  { id: 25, name: "Title 25", color: "#9984D4" },
  { id: 26, name: "Title 26", color: "#592E83" },
  { id: 27, name: "Title 27", color: "#00AFAA" },
  { id: 28, name: "Title 28", color: "#FFC90E" },
  { id: 29, name: "Title 29", color: "#2C4251" },
  { id: 30, name: "Title 30", color: "#CAA8F5" },
  { id: 31, name: "Title 31", color: "#9984D4" },
  { id: 32, name: "Title 32", color: "#592E83" }
];

const mt = 40;
let initial = 20;
let total = arr.length;
let selectId = initial;

const createPast = (dynamicStart, defaultValue) => {
  arr.slice(dynamicStart, defaultValue).map(item => {
    var div = document.createElement("div");
    $(div).addClass(`tab tab-${item.id} notShow`);
    if (initial === item.id) {
      $(div).addClass(`box-active`);
    }
    $(div).css({
      "background-color": item.color,
      color: "#fff"
    });
    $(div).click(action);
    $(div).data("id", item.id);
    $(div).append(`
      <div class="container-content">
        <div class="container-title">
          <div class="title-num">No. ${item.id} </div>
          <div class="title">${item.name}</div>
        </div>
        <div class="center-button">
          <div class="button btn-buy">buy issue</div>
          <div class="button btn-download">Download</div>
          <div class="button-colorful btn-more" style="color:${
            item.color
          }">Learn More</div>
        </div>
        <div class="center">
          <div class="title-list">Essays</div>
          <ul>
            <li>
              <div>After Climate Despair</div>
              <div>Matt Frost argues for energy abundance in a warming world</div>
            </li>
            <li>
              <div>After Climate Despair</div>
              <div>Matt Frost argues for energy abundance in a warming world</div>
            </li>
            <li>
              <div>After Climate Despair</div>
              <div>Matt Frost argues for energy abundance in a warming world</div>
            </li>
          </ul>
        </div>
      </div>
    `);
    $(`.tab-${item.id}`).css("width", "0px");
    $(".events-container-past").append(div);
    $(`.tab-${item.id} > .container-content`).click(e => {
      $(`.tab-${item.id}`).click(action);
    });

    $(`.tab-${item.id}`).on("touchstart", handleTouchStart);
    $(`.tab-${item.id}`).on("touchmove", handleTouchMove);

    $(".wrapper").css("height", $(".box-active").height());
  });
};

const componentsHidden = (init, end) => {
  arr.slice(init, end).map(item => {
    $(`.tab-${item.id}`).addClass("notShow");
    $(`.tab-${item.id}`).css({
      color: "#fff",
      overflow: "hidden",
      width: "0"
    });
  });
};

const componentsShow = (init, end) => {
  arr.slice(init, end).map(item => {
    $(`.tab-${item.id}`).addClass("show");
    $(`.tab-${item.id}`).removeClass("notShow");
    $(`.tab-${item.id}`).css({
      color: "#fff",
      overflow: "auto",
      width: ""
    });
  });
};

function setTop(start) {
  if (start !== 0) {
    var count = start;
    var i = count;
    var mtCount = 0;
    while (i > 0) {
      $(`.tab-${i}`).css("margin-top", mt * mtCount);
      mtCount++;
      i--;
    }

    var count2 = start;
    var x = count2;
    var newMtCount = 0;
    while (x < arr.length + 1) {
      $(`.tab-${x}`).css("margin-top", mt * newMtCount);
      newMtCount++;
      x++;
    }
  }
}

const goLeft = id => {
  let diff = initial - id;
  let init = initial - 6 - diff;
  selectId = id;
  $(".select-drop").val(selectId);
  $(".wrapper").css("height", $(".box-active").height());

  componentsHidden(0, init < 0 ? 0 : init);
  componentsHidden(initial + 5 - diff, total);
  componentsShow(init < 0 ? 0 : init, initial + 5 - diff);
};

const goRight = id => {
  if (id > initial) {
    let diff = Math.abs(initial - id);
    let end = initial + 6 + diff;
    let init = initial - 6 + diff;
    selectId = id;
    $(".select-drop").val(selectId);
    $(".wrapper").css("height", $(".box-active").height());

    componentsHidden(0, init < 0 ? 0 : init);
    componentsShow(
      init > arr.length ? arr.length : init,
      end > arr.length ? arr.length : end - 1
    );
  }
};

arr.map(item => {
  if (item.id === selectId) {
    $(".select-drop").append(
      `<option selected value="${item.id}">${item.name}</option>`
    );
    $(".select-drop-mobile").append(
      `<option selected value="${item.id}">${item.name}</option>`
    );
  } else {
    $(".select-drop").append(
      `<option value="${item.id}">${item.name}</option>`
    );
    $(".select-drop-mobile").append(
      `<option value="${item.id}">${item.name}</option>`
    );
  }
});

function arrowL() {
  if (selectId > 1) {
    let top = $(".container-action").height();
    $("html, body").animate({ scrollTop: top }, "50");
    $(".wrapper").css("height", $(".box-active").height());

    let id = selectId - 1;
    $(`.tab`).removeClass("box-active");
    setTop(id);
    $(".select-drop").val(selectId);
    $(`.tab-${id}`).addClass("box-active");
    goLeft(id);
  }
}

function arrowR() {
  if (selectId < arr.length) {
    let top = $(".container-action").height();
    $("html, body").animate({ scrollTop: top }, "50");
    $(".wrapper").css("height", $(".box-active").height());

    let id = selectId + 1;
    $(`.tab-${selectId}`).removeClass("box-active");
    setTop(id);
    $(".select-drop").val(selectId);
    $(`.tab-${id}`).addClass("box-active");

    selectId = id;

    let end = selectId + 6;
    let init = selectId - 6;

    componentsHidden(0, init < 0 ? 0 : init);
    componentsShow(
      init > arr.length ? arr.length : init,
      end > arr.length ? arr.length : end - 1
    );
  }
}

$(".arrow-left").click(() => {
  arrowL();
});

$(".arrow-right").click(() => {
  arrowR();
});

function handleDrop(id) {
  let top = $(".container-action").height();
  $("html, body").animate({ scrollTop: top }, "50");
  $(".wrapper").css("height", $(".box-active").height());

  selectId = id;
  let element = $(`.tab-${id}`);
  goLeft(id);
  goRight(id);
  const box = $(".tab");
  box.removeClass("box-active");
  setTop(id);
  element.addClass("box-active");
}

$(".select-drop").change(function(e) {
  selectId = parseInt(e.target.value);
  handleDrop(parseInt(e.target.value));
});

createPast(0, total); //create array
componentsHidden(0, initial - 6); //items not show
componentsShow(initial - 6, total - initial > 5 ? initial + 5 : total); //items show
setTop(initial);

function action(event) {
  const element = $(event.currentTarget);
  if (element.hasClass("tab") && element.data("id") !== selectId) {
    let top = $(".container-action").height();
    $("html, body").animate({ scrollTop: top }, "50");
    $(".wrapper").css("height", $(".box-active").height());
    goLeft(element.data("id"));
    goRight(element.data("id"));
    $(".select-drop").val(selectId);
    const box = $(".box-active");
    box.addClass("tab");
    box.removeClass("box-active");
    setTop(element.data("id"));
    element.addClass("box-active");
  }
}

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return (
    evt.touches || evt.originalEvent.touches // browser API
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
  console.log(xDown, yDown);
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  // console.log(evt.touches[0])

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  console.log(xUp, yUp);

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  // console.log(xDiff, yDiff)

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* left swipe */
      arrowR();

      // alert("left");
    } else {
      /* right swipe */
      arrowL();

      // alert("right");
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}
