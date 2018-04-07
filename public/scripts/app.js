$(function() {

  function ajaxPost(poll){
    $.ajax({
      url: '/polls',
      method: 'POST',
      data: poll,
      dataType: 'json',
      success: function(data) {
        if (typeof data.redirect == 'string'){
          window.location = data.redirect;
        }
      }
    });
  }

  function buildOptionArray(){
    var optionArray = [];
    $('.optionItem').each(function(index) {
      optionArray.push({title: $(this).find('.optionTitle').text(),
       description: $(this).find('.description').text()
     });
    });
    return optionArray;
  }

  function buildPhoneNumberArray(){
    var phoneArray = [];
    $('.phoneItem').each(function(){
      phoneArray.push($(this).find('.phoneNumber').text());
    });
    return phoneArray;
  }

  //Renders Poll Title Page
  $('#start').click(function(event){
    event.preventDefault();

    if ($('.email').val() === '') {
      $.flash('Please enter an email.');
    } else {

      $('.home').addClass('d-none');
      $('.poll-title-page').removeClass('d-none');
    }
  });

  //Renders Poll Options Page
  $('#nextStep').click(function(event){
    event.preventDefault();
    if ($('.poll-title').val() === '') {
      $.flash('Please enter a poll title.');
    } else {
      $('.poll-title-page').addClass('d-none');
      $('.poll-options-page').removeClass('d-none');
    }
  });


  //Renders the phone number page
  $('#createPoll').click(function(event){
    event.preventDefault();
    $('.poll-options-page').hide();
    $('.poll-options-page').addClass('d-none');
    $('.phone-number').removeClass('d-none');
  });

  //Hanldes sevents in the poll option page via bubbling up of events since they are dynamically generated
  $('.poll-options-page')
  .on('click', '.delete', (function(event){
    event.preventDefault();
    $(this).closest('li').remove();
  }))
  // .on('mouseenter', '.optionItem', (function() {
  //   $(this).find('.description').removeClass('d-none');
  // }))
  // .on('mouseleave', '.optionItem', function() {
  //   $(this).find('.description').addClass('d-none');
  // });

  //Handles adding options
  $('#enterOption').click(function(event) {
    event.preventDefault();
    var optionTitle = $('.option').val();
    if (optionTitle === '') {
      $.flash('Please enter an option title.');
    }else {
    $('.poll-options').append('<li class="optionItem option-box"><p class="opTitle">' + $('.option').val() + '&nbsp&nbsp&nbsp&nbsp&nbsp-&nbsp&nbsp&nbsp&nbsp&nbsp' + $('.description').val() + '</p><button class="myButton delete">Delete</button></li>');
    }
  });


  //Handles adding phone numbers
  $('#enterPhoneNumber').click(function(event) {
    event.preventDefault();
    var phoneNumber = $('.textarea-phone-number').val();
    if (phoneNumber === '') {
      $.flash('Please enter a phone number.');
    }else {
      $('.poll-phone-list').append('<li class="phoneItem"><p class="phoneNumber">' + phoneNumber + '</p><button class="myButton delete">Delete</button></li>');
    }
  });

  //Handles deleting phone numbers
  $('.poll-phone-page')
  .on('click', '.delete', (function(event){
    event.preventDefault();
    $(this).closest('li').remove();
  }));

  //Handles submitting poll
  $('#submitPoll').click(function(event) {
    event.preventDefault();

    var poll = {};
    poll.email = $('.email').val();
    poll.ptitle = $('.poll-title').val();
    poll.options = buildOptionArray();
    poll.phoneNumbers = buildPhoneNumberArray();

    console.log(poll);
    ajaxPost(poll);
  });
});


