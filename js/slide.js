  let initial = 5;
  const mt = 40;
  
  const arr = [
    {id:1, name : "Title 1", color:"#00AFAA"},
    {id:2, name : "Title 2", color:"#FFC90E"},
    {id:3, name : "Title 3", color:"#2C4251"},
    {id:4, name : "Title 4", color:"#CAA8F5"},
    {id:5, name : "Title 5", color:"#9984D4"},
    {id:6, name : "Title 6", color:"#592E83"},
    {id:7, name : "Title 7", color:"#BB7B92"},
    {id:8, name : "Title 8", color:"#230C33"},
    {id:9, name : "Title 9", color:"#5EEB5B"},
    {id:10, name : "Title 10", color:"#26413C"},
  ]

  arr.slice(0,initial -1).map((item,idx) => {
    var div = document.createElement("div");
    $(div).addClass(`tab tab-${item.id}`)
    $(div).click(action)
    $(div).data("id",item.id)
    $(div).css({"background-color":item.color, "color": "#fff"})
    var textnode = document.createTextNode(item.name);
    $(div).append(textnode)
    $(".events-container-past").append(div); 
  })

  arr.slice(initial - 1,arr.length + 1).map((item,idx) => {
    var div = document.createElement("div");
    $(div).addClass(`tab tab-${item.id}`)
    $(div).click(action)
    $(div).data("id",item.id)
    $(div).css({"background-color":item.color, "color": "#fff"})
    var textnode = document.createTextNode(item.name);
    $(div).append(textnode)
    $(".events-container").append(div); 
  })
 

  function setTop (start){
    if(start !== 0){
      var count = start;
      var i = count
      var mtCount = 1;
      while (i > 0) {
        $(`.tab-${i}`).css("margin-top", mt * mtCount)
        i--
        mtCount++;
      }
  
      var count2 = arr.length - start;
      var x = count2
      mtCount = 1;
      while (x < arr.length +1) {
        $(`.tab-${x}`).css("margin-top", mt * mtCount)
        mtCount++;
        x++
      }
    }
  }

  setTop(initial)

  function action(event){
    const element = $(event.target)  
    setTop(element.data("id"))
      if(element.hasClass("tab")){
        const box = $(".box-active")
        box.addClass("tab")
        box.addClass("transition-unactive")
        box.removeClass("box-active")
        element.addClass("transition-active");
        setTimeout(() => {
          element.addClass("box-active")
          element.removeClass("transition-active")
          box.removeClass("transition-unactive")
          element.removeClass("tab")
        }
        ,1500)
      }
    }


