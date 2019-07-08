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

export function getExamPreview() {
  const exam = localStorage.getItem('exam-preview');
  if (exam) {
    return JSON.parse(exam);
  }
  return {};
}

export function saveExamPreview(exams) {
  localStorage.setItem('exam-preview', JSON.stringify(exams));
}
