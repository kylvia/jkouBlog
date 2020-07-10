import { Quill } from 'react-quill';

const Icons = function() {
  const icons = Quill.import('ui/icons');
  icons.underline = '<span title="下划线" class="icon-underline"></span>';
  icons.bold = '<span title="加粗" class="icon-bold"></span>';
  icons.code = '<span title="代码块" class="icon-code"></span>';
  icons['code-block'] =
    "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><g fill='none' fill-rule='evenodd' transform='translate(-974 -140)'><rect width='1920' height='1080'/><g fill='#4A4A51' fill-rule='nonzero' transform='translate(973.92 140)'><path d='M5.97632051 15L4.7093943 15C4.63762293 15 4.57135424 14.9615428 4.53574567 14.8992278L1.79288853 10.0992278C1.75775337 10.0377413 1.75775337 9.96225875 1.79288853 9.90077221L4.53574567 5.10077221C4.57135424 5.03845721 4.63762293 5 4.7093943 5L5.97632051 5C6.08677746 5 6.17632052 5.08954305 6.17632052 5.2 6.17632052 5.23480539 6.16723745 5.26900825 6.14996914 5.29922779L3.4638136 10 6.14996914 14.7007722C6.20477114 14.7966757 6.17145179 14.9188466 6.0755483 14.9736486 6.04532876 14.9909169 6.0111259 15 5.97632051 15zM15.4906061 15L14.2236799 15C14.1132229 15 14.0236799 14.9104569 14.0236799 14.8 14.0236799 14.7651946 14.0327629 14.7309917 14.0500312 14.7007722L16.7361868 10 14.0500312 5.29922779C13.9952293 5.2033243 14.0285486 5.08115337 14.1244521 5.02635137 14.1546716 5.00908306 14.1888745 5 14.2236799 5L15.4906061 5C15.5623775 5 15.6286461 5.03845721 15.6642547 5.10077221L18.4071119 9.90077221C18.442247 9.96225875 18.442247 10.0377413 18.4071119 10.0992278L15.6642547 14.8992278C15.6286461 14.9615428 15.5623775 15 15.4906061 15zM8.9797509 15L7.8202491 15C7.70979215 15 7.6202491 14.9104569 7.6202491 14.8 7.6202491 14.7785036 7.62371467 14.7571477 7.63051244 14.7367544L10.8305124 5.13675445C10.8577352 5.05508602 10.934163 5 11.0202491 5L12.1797509 5C12.2902079 5 12.3797509 5.08954305 12.3797509 5.2 12.3797509 5.22149642 12.3762853 5.24285226 12.3694876 5.26324556L9.16948756 14.8632456C9.14226475 14.944914 9.06583699 15 8.9797509 15z'/></g></g></svg>\n";
  // icons.image = '<span class="icon-image"></span>';
  icons.video = '<span title="视频" class="icon-video"></span>';
  icons.italic = '<span title="斜体" class="icon-italic"></span>';
  icons.strike = '<span title="中划线" class="icon-strike"></span>';
  icons.blockquote =
    "<span title='引用'><svg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M15.892 9.779c.138.157.17.386.063.57l-3.077 5.33a.49.49 0 0 1-.683.171.5.5 0 0 1-.193-.677l1.834-3.178c-.264.078-.545.12-.834.12h-.07a2.956 2.956 0 0 1-2.955-2.95V8.95C9.977 7.32 11.304 6 12.93 6h.07a2.956 2.956 0 0 1 2.955 2.95v.215c0 .21-.022.416-.064.614zm-7.158.537a.499.499 0 0 1-.045.399l-2.841 4.921a.497.497 0 0 1-.69.182.503.503 0 0 1-.187-.688l1.8-3.118A2.991 2.991 0 0 1 3 9.129v-.143a2.99 2.99 0 0 1 5.98 0v.143c0 .422-.088.823-.246 1.187z' fill='#4A4A51' fill-rule='evenodd'/></svg></span>";
  icons.color = '<span title="颜色" class="icon-color"></span>';
  icons.background = '<span title="背景色" class="icon-background"></span>';
  icons.clean = '<span title="清除格式" class="icon-clean"></span>';
  icons.align = {
    '': '<span title="左对齐" class="icon-left"></span>',
    center: '<span title="中对齐" class="icon-center"></span>',
    right: '<span title="右对齐" class="icon-right"></span>',
    justify: '<span title="两端对齐" class="icon-justify"></span>',
  };
  icons.list = {
    ordered: '<span title="有序列表" class="icon-ordered"></span>',
    bullet: '<span title="无序列表" class="icon-bullet"></span>',
  };
  icons.indent = {
    '+1': '<span title="右缩进" class="icon-indent"></span>',
    '-1': '<span title="左缩进" class="icon-outdent"></span>',
  };
  icons.link = '<span title="超链接" class="icon-link"></span>';
  icons.image = '<span title="图片" class="icon-image"></span>';
};
export default Icons;
