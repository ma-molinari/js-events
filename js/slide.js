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
    $(div).append(`<div>${item.name}</div>`);
    $(`.tab-${item.id}`).css("width", "0px");
    $(".events-container-past").append(div);
  });
};

const componentsHidden = (init, end) => {
  arr.slice(init, end).map(item => {
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

$(".arrow-left").click(() => {
  $(`.tab`).removeClass("box-active");
  setTop(selectId - 1);
  $(`.tab-${selectId - 1}`).addClass("box-active");
  goLeft(selectId - 1);
});

$(".arrow-right").click(() => {
  $(`.tab`).removeClass("box-active");
  setTop(selectId + 1);
  $(`.tab-${selectId + 1}`).addClass("box-active");
  goLeft(selectId + 1);
});

const goLeft = id => {
  let diff = initial - id;
  let init = initial - 6 - diff;
  selectId = id;

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

    componentsHidden(0, init < 0 ? 0 : init);
    componentsShow(
      init > arr.length ? arr.length : init,
      end > arr.length ? arr.length : end - 1
    );
  }
};

createPast(0, total); //create array
componentsHidden(0, initial - 6); //items not show
componentsShow(initial - 6, total - initial > 5 ? initial + 5 : total); //items show
setTop(initial);

function action(event) {
  const element = $(event.target);
  if (element.hasClass("tab") && element.data("id") !== selectId) {
    goLeft(element.data("id"));
    goRight(element.data("id"));
    const box = $(".box-active");
    box.addClass("tab");
    box.addClass("transition-unactive");
    box.removeClass("box-active");
    element.addClass("transition-active");
    setTop(element.data("id"));
    element.addClass("box-active");
    setTimeout(() => {
      element.removeClass("transition-active");
      box.removeClass("transition-unactive");
    }, 1500);
  }
}
