function FormatTitle () {
  this.init();
}
FormatTitle.prototype = {
  init() {
    let h2s = $('h2');
    if (!h2s.length) {
      return;
    }
    let html = `<div class="h2titles">
    <p class="title">导航</p>
    <ul>`;
    let lis = [];
    for (var i = 0, l = h2s.length; i < l; i++) {
      let val = $(h2s[i]).html();
      let id = $(h2s[i]).attr('id');
      lis.push(`<li><a href="#${id}">${val}</a></li>`)
    }
    html += lis.join('');
    html += `</ul></div>`;
    $('body').append($(html));
  }
};