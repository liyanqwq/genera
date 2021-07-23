$(document).ready(function () {
  console.log(
    "Genera - General Text Generator\nProject: https://github.com/liyanqwq/genera"
  );
  init();
  reset(1);
  console.log("[Info] Successfully Initialized.");
});
function init() {
  $.getJSON("config/site.json", function (result) {
    if (result["bg-image"] !== undefined)
      $("body").css("background-image", result["bg-image"]);
    if (result["site-name"] !== undefined) {
      $("title").html(result["site-name"]);
      $("#site-title").html(result["site-name"]);
    }
    if (result["site-slogan"] !== undefined)
      $("#site-subtitle").html(result["site-slogan"]);
    if (result["site-logo"] !== undefined) {
      $('link[rel="shortcut icon"]').attr("href", result["site-logo"]);
      $("#site-logo").attr("src", result["site-logo"]);
    }
  });
}
function reset(init) {
  $.getJSON("config/char.json", function (initdata) {
    $("#form-labels").html("");
    $.each(initdata, function (i, data) {
      $("#form-labels").append(
        '<div class="mdui-textfield"><label class="mdui-textfield-label">' +
          data.name +
          '</label><input class="mdui-textfield-input" id="' +
          data.slug +
          '" name="' +
          data.slug +
          '" /></div>'
      );
      if (data.default !== undefined) $("#" + data.slug).val(data.default);
    });
  });
  if (init === 1) {
    $("#app-result-card").hide();
  } else {
    $("#app-result-card").fadeOut();
    console.log("[Info] Successfully Reseted.");
  }
}
$("#reset").click(function () {
  reset(0);
  return false;
});
$("#generate-form").submit(function () {
  d = $(this).serializeArray();
  var data = new Array();
  $.each(d, function (i, field) {
    data[field.name] = field.value;
  });
  $.getJSON("config/data.json", function (text) {
    var ind = Math.floor(Math.random() * text.length);
    var result = juicer(text[ind], data);
    $("#app-result").html(result);
    if ($("#app-result-card").is(":hidden")) $("#app-result-card").fadeIn();
    console.log("[Info] Successfully Generated.");
  });

  return false;
});
