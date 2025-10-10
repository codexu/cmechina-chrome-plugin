export default defineUnlistedScript(async () => {
  const win = window as any;
  
  while (!win.cc_js_Player) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  win.cc_js_Player.jumpToTime(300);
  await new Promise(resolve => setTimeout(resolve, 1000));

  win.updatePlayStatus(1);
  await new Promise(resolve => setTimeout(resolve, 1000));
  win.playEnd();
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (win.gotoExam) win.gotoExam();
});