export const ENTER_KEY = 13;
export const VELOCITY = 'slow';
export const MAX_CHARS_TO_BE_SEARCHED = 10;

export const ABC_ANS = ['A', 'B', 'C', 'D'];

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
  category: 'Danh mục',
  them_sec: 'Thêm loại câu hỏi',
  them_moi: 'Thêm mới',
  them_q: 'Thêm câu hỏi',
  section: 'Loại câu hỏi',
  luu: 'Lưu',
  luu_ketqua: 'Chấp nhận kết quả',
  add_q: 'Thêm câu hỏi',
  report: 'Report',
  exam_result: 'Kết quả',
  upload_result: 'Upload kết quả',
  login: 'Đăng nhập',
}
export const PLACE_HOLDER = {
  sec: 'loại câu hỏi',
  passage: 'đoạn văn',
  no_of_ques: 'số lượng câu hỏi',
  q: 'câu hỏi',
  ans2: 'Câu trả lời: ',
  ans: 'đáp án',
  result: 'kết quả',
  ans_a: 'đáp án A',
  ans_b: 'đáp án B',
  ans_c: 'đáp án C',
  ans_d: 'đáp án D',
  need_take: 'Làm bài thi thôi',
  token: 'Bài thi đã được làm rồi',
  approve: 'Bài thi đã được duyệt, vào xem điểm thi',
}
export const ERROR_MSG = {
  ERR_MANDATORY: '<ul class="error-list"><li>Thông tin chưa nhập đủ</li><li>Đáp án trùng nhau</li><li>Câu hỏi lựa chọn chưa có đáp án</li></ul>',
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
export const PASSAGE_TEXT = 'PASSAGE_TEXT';
export const PASSAGE_OPTION = 'PASSAGE_OPTION';
export const PASSAGE_OPTION_FROM_GIVEN = 'PASSAGE_OPTION_FROM_GIVEN';

export const PASSAGE_TEXT_TYPES = [PASSAGE_TEXT, PASSAGE_OPTION_FROM_GIVEN];/*answer = text*/
export const PASSAGE_TYPES = [PASSAGE_TEXT, PASSAGE_OPTION, PASSAGE_OPTION_FROM_GIVEN];

export const QUESTION_TEXT_TYPES = [TEXT, REORDER_SENTENCE, OPTION_FROM_GIVEN, PASSAGE_TEXT, PASSAGE_OPTION_FROM_GIVEN];
export const QUESTION_TYPES = [TEXT, OPTION, REORDER_SENTENCE, OPTION_FROM_GIVEN, PASSAGE_TEXT, PASSAGE_OPTION, PASSAGE_OPTION_FROM_GIVEN];
export const OPTION_FROM_GIVEN_TYPE = [OPTION_FROM_GIVEN, PASSAGE_OPTION_FROM_GIVEN];
export const QUESTION_OPTION_TYPES = [OPTION, PASSAGE_OPTION];
export const ACTION = {
  NEW: 'new',
  TEMP_SAVE: 'temp_save',
  REMOVE_QUES: 'remove_ques',
  CHECK_QUES: 'check_ques'
};
