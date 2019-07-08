export const VELOCITY = 'slow';
export const MAX_CHARS_TO_BE_SEARCHED = 10;

export const CONFIRM_ACTION = {
  YES: 'y',
  NO: 'n'
}

export const QUES_ACTION = {
  REMOVE: 'r',
  ADD_2_EXAM: 'a2e'
}

export const LINKS = {
  chi_tiet_q: 'Chi tiết câu hỏi',
  xoa_dm: 'Xóa loại câu hỏi',
  cancel_exam: 'Hủy bài thi',
  create_exam: 'Tạo bài thi',
  preview_exam: 'Xem trước bài thi',
  select_all: 'Chọn tất cả',
  deselect_all: 'Bỏ chọn',
  them_dm: 'Thêm loại câu hỏi',
  them_moi: 'Thêm mới',
  them_q: 'Thêm câu hỏi',
  dm: 'Loại câu hỏi',
  luu: 'Lưu',
  add_q: 'Thêm câu hỏi',
  report: 'Report',
}
export const PLACE_HOLDER = {
  sec: 'loại câu hỏi',
  q: 'câu hỏi',
  ans: 'đáp án',
  ans_a: 'đáp án A',
  ans_b: 'đáp án B',
  ans_c: 'đáp án C',
  ans_d: 'đáp án D',
}
export const ERROR_MSG = {
  ERR_MANDATORY: 'Một số thông tin chưa được nhập<br/>Hoặc đáp án trong 1 loại câu hỏi trùng nhau',
  ERR_NEED_SOLVED_FIRST: 'Xử lý lỗi vừa rồi trước khi làm tiếp',
  ERR_EXISTED_S: 'Loại câu hỏi đã tồn tại trong danh sách này rồi',
  ERR_EXISTED_A: 'Câu trả lời trùng lặp trong câu hỏi này',
  ERR_A_NOT_IN_GIVEN: 'Câu trả lởi phải nàm trong danh sách đáp án đã cho',
  ERR_EXISTED_A2: 'Câu trả lời trùng lặp trong 1 câu hỏi nào đó',
  ERR_EXISTED_Q: 'Có nhiều hơn 1 câu hỏi giống nhau trong danh mục này',
  ERR_EXISTED_Q_VUA_NHAP: 'Câu hỏi vừa nhập đã tồn tại trong danh mục này',
  ERR_NO_SEC_CHOOSEN: 'Không có danh mục nào được chọn',
  ERR_OPTION_FROM_GIVEN: 'Có đáp án trùng nhau hoặc bỏ trống',
};
export const ABC_LIST = ['A: ', 'B: ', 'C: ', 'D: ', 'E: ', 'F: ', 'G: '];
export const OPTION_FROM_GIVEN = 'OPTION_FROM_GIVEN';
export const REORDER_SENTENCE = 'REORDER_SENTENCE';
export const TEXT = 'TEXT';
export const OPTION = 'OPTION';
export const QUESTION_TEXT_TYPES = [TEXT, REORDER_SENTENCE, OPTION_FROM_GIVEN];
export const QUESTION_TYPES = [TEXT, REORDER_SENTENCE, OPTION_FROM_GIVEN, OPTION];
export const QUESTION_OPTION_TYPES = [OPTION];
export const ACTION = {
  NEW: 'new',
  TEMP_SAVE: 'temp_save',
  REMOVE_QUES: 'remove_ques',
  CHECK_QUES: 'check_ques'
};
