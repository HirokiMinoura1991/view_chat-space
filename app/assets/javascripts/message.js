$(function(){ 
      $('.form').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
       .done(function(data){
         var html =buildMessageHTML(data);
         $('.messages').append(html);
         $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');         
         $('form')[0].reset();
       })
       .fail(function(){
         alert('error');
       })
       .always(function(){
         $('.form__submit').prop('disabled', false);
  
       });
     });
  var buildMessageHTML = function(message) {
    var image = (message.content && message.image.url)?`<img src= ${message.image.url} class="lower-message__image" >`  : ""
      var html = `<div class="message" data-id= ${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name} 
          </div> 
          <div class="upper-message__date"> 
            ${message.created_at} 
          </div>
        </div> 
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content} 
          </p> 
        </div>
          ${image}
      </div>`
    return html;
  }

  var reloadMessages = function() {
    var last_message_id = $('.message').last().data('id');
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
      insertHTML= buildMessageHTML(message)
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      })
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  }
  setInterval(reloadMessages, 5000);
});
