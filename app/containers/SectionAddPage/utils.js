import {OPTION_FROM_GIVEN} from "../../constants/questions";

const _ = require('lodash');

function notEmpty(o) {
  return o.length > 0;
}

function secHasError(sec) {
  if (sec.text === '') return true;

  const isGiven = sec.questionType === OPTION_FROM_GIVEN;
  if (!isGiven) return false;

  const len = sec.options.length;
  const isDuplicate = _.uniq(sec.options.filter(notEmpty)).length < len;

  return isGiven && (len === 0 || isDuplicate);
}

export function checkBeforeSave(sections) {
  const len = sections.length;
  return sections.filter(s => !secHasError(s)).length === len;
}

export function checkSectionRequired(sections) {
  const len = sections.length;
  return sections.filter(s => !s.error).length === len;
}

export function setSectionError(sections) {
  return sections.map(sec => {
    if ((sec.error = sec.text === '') === false) {
      sec.error = secHasError(sec);
    }
    return sec;
  });
}

export function checkExistedInLocal(sections, sec) {
  return sections.filter(s => s.text === sec.text && s.questionType === sec.questionType)
    .length > 1
}
