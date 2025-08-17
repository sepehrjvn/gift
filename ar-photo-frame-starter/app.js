(function(){
  const scene = document.querySelector('a-scene');
  const video = document.getElementById('giftVideo');
  const startBtn = document.getElementById('startBtn');

  function tryPlay(){
    if (!video.src || video.src.endsWith('/assets/gift.mp4')) {
      console.warn('یادآوری: فایل gift.mp4 را در پوشه assets جایگزین کن.');
    }
    video.play().catch((e)=>{
      console.log('Play blocked until user gesture', e);
    });
  }

  startBtn.addEventListener('click', ()=>{
    tryPlay();
    startBtn.textContent = 'در حال پخش…';
    setTimeout(()=>{ startBtn.textContent = 'شروع'; }, 2000);
  });

  // MindAR events
  scene.addEventListener('arReady', ()=>{
    console.log('AR ready');
  });
  scene.addEventListener('targetFound', ()=>{
    tryPlay();
  });
  scene.addEventListener('targetLost', ()=>{
    if (!video.paused) video.pause();
  });

  // On iOS often requires a touch first; we nudge the user
  document.addEventListener('touchend', function once(){
    tryPlay();
    document.removeEventListener('touchend', once, false);
  }, false);
})();