$(function() {
  const $openModalButtons = $('.request-loader');
  const $overlay = $('#modal-overlay');
  const $closeModal = $('.my-close');
  const $videoFrame = $('#my-video-frame');

  $openModalButtons.on('click', function() {
      const videoUrl = $(this).attr('data-video');
      $videoFrame.attr('src', videoUrl + "?autoplay=1");
      $overlay.css('display', 'flex');
  });

  $closeModal.on('click', function() {
      $overlay.hide();
      $videoFrame.attr('src', "");
  });

  $overlay.on('click', function(e) {
      if (e.target === this) {
          $overlay.hide();
          $videoFrame.attr('src', "");
      }
  });
});