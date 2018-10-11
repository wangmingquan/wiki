(function () {
  var tokenEl = $('#token');
  var submitEl = $('#submit');
  submitEl.on('click', function () {
    var token = $.trim(tokenEl.val());
    if (!token) {
      alert('请输入密令');
      return;
    }
    $.ajax({
      url: '/___login',
      data: {
        token: token
      },
      type: 'post',
      success: function (rel) {
        if (rel.status === 0) {
          location.replace('/');
        } else {
          alert(rel.message);
        }
      }
    })
  });
})()