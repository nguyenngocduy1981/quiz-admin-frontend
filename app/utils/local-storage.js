export function saveLogin(data) {
  localStorage.setItem('login', JSON.stringify(data));
}

export function getLogin() {
  const data = localStorage.getItem('login');
  if(!data) return null;

  return JSON.parse(data);
}
export function getLoginRole() {
  const data = localStorage.getItem('login');
  if(!data) return '';

  return JSON.parse(data).role;
}

export function countQuesInExam() {
  let exam = localStorage.getItem('exam');
  if (exam) {
    exam = JSON.parse(exam);
    return Object.keys(exam).map(k => exam[k].length).reduce((a, b) => a + b);
  }
  return 0;
}

export function clearExam() {
  localStorage.removeItem('exam');
}

export function getExam() {
  const exam = localStorage.getItem('exam');
  if (exam) {
    return JSON.parse(exam);
  }
  return {};
}

export function addExamBulk(payload) {
  const {sectionId, quesList} = payload;
  let exam = localStorage.getItem('exam');
  if (exam) {
    exam = JSON.parse(exam);
  } else {
    exam = {};
  }

  exam[sectionId] = quesList;
  localStorage.setItem('exam', JSON.stringify(exam));

  return exam;
}

export function addExam(payload) {
  const {sectionId, quesId} = payload;
  let exam = localStorage.getItem('exam');
  let quesList = [];
  if (exam) {
    exam = JSON.parse(exam);
    quesList = exam[sectionId];
    if (quesList) {
      if (quesList.includes(quesId)) {
        quesList = quesList.filter(q => q !== quesId);
      } else {
        quesList.push(quesId);
      }
    } else {
      quesList = [];
      quesList.push(quesId);
    }
  } else {
    exam = {};
    quesList.push(quesId);
  }

  exam[sectionId] = quesList;
  localStorage.setItem('exam', JSON.stringify(exam));

  return exam;
}

export function saveCurrentExamName(name) {
  localStorage.setItem('current_exam', name);
}

export function getCurrentExamName() {
  return localStorage.getItem('current_exam');
}

export function getExamResult() {
  return JSON.parse(localStorage.getItem('exam_result'));
}

export function resetExam() {
  const examRs = localStorage.getItem('exam');
  localStorage.setItem('exam_result', examRs);
  localStorage.removeItem('current_exam');
  localStorage.removeItem('exam');

}

export function saveExam(questions) {
  localStorage.setItem('exam', JSON.stringify(questions));
}
