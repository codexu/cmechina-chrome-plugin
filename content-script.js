function injectJs(jsPath) {
  jsPath = jsPath || 'inject-script.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  // chrome-extension://mapfodeofmlldcgdgahpjiefememgeei/injectScript.bundle.js
  temp.src = chrome.runtime.getURL(jsPath);
  temp.onload = function () {
    // 放在页面不好看，执行完后移除掉
    this.parentNode?.removeChild(this);
  };
  document.head.appendChild(temp);
}

injectJs();

// 判单列表是否学习
const hasPass = document.querySelectorAll('.kstg').length > 0;
if (hasPass) {
  document.querySelector('.wxx').parentNode.click();
}

// 判断如果答错，记录错误答案
const errAnswer = document.querySelector('.show_exam_text')
if (errAnswer) {
  const ansultResult = []
  console.log(document.querySelectorAll(".answer_list"));
  document.querySelectorAll(".answer_list").forEach(item => {
    const result = item.querySelector('h3').className;
    ansultResult.push(result);
  });
  localStorage.setItem('ansultResult', JSON.stringify(ansultResult));
  window.history.back();
}

// 判断返回继续答题
const exam_list = document.querySelector('.exam_list');
if (exam_list) {
  const result = JSON.parse(localStorage.getItem('ansultResult'));
  localStorage.removeItem('ansultResult');
  console.log(result);
  if (result === null) {
    exam_list.querySelectorAll('li').forEach(itemLi => {
      itemLi.querySelector('p input').click();
    });
  } else {
    exam_list.querySelectorAll("li").forEach((itemLi, index) => {
      // 判断input是否选中
      const allInput = itemLi.querySelectorAll("p input");
      if (result[index] === "cuo") {
        let nextAnswerIndex = 0;
        allInput.forEach((itemInput, inputIndex) => {
          if (itemInput.checked) {
            nextAnswerIndex = inputIndex + 1;
          }
        });
        allInput[nextAnswerIndex].click();
      }
    });
  }
  document.querySelector("#tjkj").click();
}

// 判断是否考试通过
const exam_pass = document.querySelector('.show_exam_btns');
if (exam_pass) {
  exam_pass.querySelector('a').click();
}