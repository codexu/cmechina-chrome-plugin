if (window.playEnd) {
  window.playEnd();
  setTimeout(() => {
    window.gotoExam();
  }, 1000);
}