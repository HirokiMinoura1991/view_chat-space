$(function(){ 
  var buildMessageHTML = function(message) {
    var image = (message.content && message.image.url)?`<img src="` + message.image.url + `" class="lower-message__image" >`  : ""
      var html = `<div class="message" data-id= message.id>
        <div class="upper-message">
          <div class="upper-message__user-name">
            message.user_name 
          </div> 
          <div class="upper-message__date"> 
            message.created_at 
          </div>
        </div> 
        <div class="lower-message">
          <p class="lower-message__content">
            message.content 
          </p> 
        </div>
          image 
      </div>`
    return html;
  };

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
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
          $('.form__submit').prop('disabled', false);
    })
  })
 };
    setInterval(reloadMessages, 5000);
});
