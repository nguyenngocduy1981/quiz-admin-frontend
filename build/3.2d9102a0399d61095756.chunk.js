(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"./app/components/InputModal/style.scss":function(e,t,n){var o=n("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./app/components/InputModal/style.scss");"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n("./node_modules/style-loader/lib/addStyles.js")(o,r);o.locals&&(e.exports=o.locals)},"./app/containers/ExamPreviewViewPage/index.js":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/react/index.js"),r=n.n(o),a=n("./node_modules/react-redux/lib/index.js"),s=n("./node_modules/redux/lib/redux.js"),i=n("./node_modules/reselect/es/index.js"),c=n("./app/utils/injectSaga.js"),l=n("./app/components/LoadingIndicator/index.js"),u=n("./app/containers/ExamPreviewViewPage/reducer.js"),d=function(e){return e.examPreview||u.b},p=n("./app/containers/ExamPreviewViewPage/actions.js"),m=n("./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.cjs.js"),f=n("./node_modules/react-router-redux/lib/index.js"),v=n("./app/constants/service-model.js"),b=n("./app/utils/request.js"),y=n("./app/constants/routers.js"),g=n("./app/utils/request-method.js"),h=n("./app/utils/local-storage.js"),j=n("./node_modules/file-saver/dist/FileSaver.min.js"),x=n.n(j),w=n("./app/utils/notify.js"),O=regeneratorRuntime.mark(P),_=regeneratorRuntime.mark(E),S=regeneratorRuntime.mark(q),k=regeneratorRuntime.mark(I),N=regeneratorRuntime.mark(D);n("./node_modules/lodash/lodash.js");function P(e){var t,n;return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(t=e.payload,n=t.catId,!t.exam){o.next=6;break}return o.next=4,Object(m.put)(Object(f.push)(y.c));case 4:o.next=13;break;case 6:if(!n){o.next=11;break}return o.next=9,Object(m.put)(Object(f.push)("".concat(y.h,"/").concat(n)));case 9:o.next=13;break;case 11:return o.next=13,Object(m.put)(Object(f.push)(y.h));case 13:case"end":return o.stop()}},O)}function E(){var e,t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(m.call)(b.a,v.g,Object(g.b)(Object(h.e)()));case 3:return e=n.sent,t=e.data,n.next=7,Object(m.put)(Object(p.k)(t));case 7:n.next=13;break;case 9:return n.prev=9,n.t0=n.catch(0),n.next=13,Object(m.put)(Object(p.l)());case 13:case"end":return n.stop()}},_,null,[[0,9]])}function q(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(m.put)(Object(f.push)(y.h));case 2:case"end":return e.stop()}},S)}function I(e){var t,n,o,r,a;return regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,t={title:e.title,payload:Object(h.e)()},s.next=4,Object(m.call)(b.a,v.f,Object(g.b)(t));case 4:n=s.sent,(o=n.error)?Object(w.a)(o.message):(r=t.title,a=new Blob([JSON.stringify(n.data)],{encoding:"UTF-8",type:"application/json"}),x.a.saveAs(a,r)),s.next=13;break;case 9:return s.prev=9,s.t0=s.catch(0),s.next=13,Object(m.put)(Object(p.l)());case 13:case"end":return s.stop()}},k,null,[[0,9]])}function D(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(m.takeLatest)(p.e,E);case 2:return e.next=4,Object(m.takeLatest)(p.b,I);case 4:return e.next=6,Object(m.takeLatest)(p.a,q);case 6:return e.next=8,Object(m.takeLatest)(p.d,P);case 8:case"end":return e.stop()}},N)}n("./app/containers/ExamPreviewViewPage/style.scss");var C,M=n("./node_modules/react-helmet/lib/Helmet.js"),R=n("./app/components/Error/index.js"),F=n("./app/constants/questions.js"),H=n("./app/components/NoData/index.js"),L=n("./app/components/TextAnswerViewOnly/index.js"),V=n("./app/components/PossibleAnswerViewOnly/index.js");n("./app/components/InputModal/style.scss");function A(e){return(A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function T(e,t,n,o){C||(C="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),t&&r)for(var s in r)void 0===t[s]&&(t[s]=r[s]);else t||(t=r||{});if(1===a)t.children=o;else if(a>1){for(var i=new Array(a),c=0;c<a;c++)i[c]=arguments[c+3];t.children=i}return{$$typeof:C,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function U(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function B(e){return(B=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function $(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function J(e,t){return(J=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function K(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Y,Q=T("div",{className:"modal-header"},void 0,T("h5",{className:"modal-title"},void 0,"Nhập thông tin")),W=function(e){function t(e){var n,o,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,r=B(t).call(this,e),n=!r||"object"!==A(r)&&"function"!=typeof r?$(o):r,K($(n),"escFunction",function(e){if(27===e.keyCode&&n.props.shown){var t=F.d.NO;n.props.onSubmit({action:t,val:n.state.value}),e.stopImmediatePropagation()}}),K($(n),"onKeyUp",function(e){if(13===e.keyCode){var t=F.d.YES;n.props.onSubmit({action:t,val:e.target.value})}}),K($(n),"onBlur",function(e){var t=e.target.value;n.setState({value:t})}),K($(n),"submit",function(e){n.props.onSubmit({action:e,val:n.state.value})}),n.state={value:""},n}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&J(e,t)}(t,r.a.Component),n=t,(o=[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.escFunction,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.escFunction,!1)}},{key:"render",value:function(){var e=this,t=this.props,n=t.id,o=t.placeholder;return T("div",{className:"q-modal"},void 0,T("div",{className:"modal",tabIndex:"-1",role:"dialog",id:n},void 0,T("div",{className:"modal-dialog",role:"document"},void 0,T("div",{className:"modal-content"},void 0,Q,T("div",{className:"modal-body"},void 0,T("input",{type:"text",className:"form-control",id:"id_".concat(n),placeholder:o,onKeyUp:this.onKeyUp,onBlur:this.onBlur})),T("div",{className:"modal-footer"},void 0,T("div",{className:"summary"},void 0,T("span",{className:"btn",onClick:function(t){return e.submit(F.d.YES)}},void 0,"Nhập"),T("span",{className:"btn",onClick:function(t){return e.submit(F.d.NO)}},void 0,"Hủy")))))))}}])&&U(n.prototype,o),a&&U(n,a),t}();function z(e){return(z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function G(e,t,n,o){Y||(Y="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),t&&r)for(var s in r)void 0===t[s]&&(t[s]=r[s]);else t||(t=r||{});if(1===a)t.children=o;else if(a>1){for(var i=new Array(a),c=0;c<a;c++)i[c]=arguments[c+3];t.children=i}return{$$typeof:Y,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function X(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function Z(e){return(Z=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function ee(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function te(e,t){return(te=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n("./node_modules/lodash/lodash.js");var oe=n("./node_modules/jquery/dist/jquery.js"),re="title_input",ae=G(l.a,{}),se=G(R.a,{}),ie=G("div",{className:"col-md-5 summary"},void 0,G(H.a,{})),ce=G(M.Helmet,{},void 0,G("title",{},void 0,"ExamPreviewViewPage")),le=function(e){function t(e){var n,o,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),o=this,r=Z(t).call(this,e),n=!r||"object"!==z(r)&&"function"!=typeof r?ee(o):r,ne(ee(n),"escFunction",function(e){27===e.keyCode&&(n.state.modalShown?n.hideModal():n.goHome())}),ne(ee(n),"renderQuestion",function(e,t){return F.p.includes(e.type)?G(L.a,{idx:t+1,ques:e,preview:!0},t):G(V.a,{idx:t+1,ques:e,preview:!0},t)}),ne(ee(n),"cancelExam",function(){n.props.cancelExam()}),ne(ee(n),"createExam",function(){n.setState({modalShown:!0},function(){oe("#".concat(re)).fadeIn(F.t),oe("#id_".concat(re)).val("").focus()})}),ne(ee(n),"goHome",function(){var e=n.props.match.params,t=e.catId,o=e.exam;n.props.goHome({catId:t,exam:o})}),ne(ee(n),"toggleShow",function(e){return function(t){var o=n.state.flag;o[e]=!o[e],n.setState({flag:o})}}),ne(ee(n),"renderPassageOption",function(e){return G("div",{className:"row q-row"},void 0,G("div",{className:"col-md-12 op"},void 0,e.map(function(e,t){return G("span",{},t,e)})))}),ne(ee(n),"renderPassage",function(e,t){return F.m.includes(t)?G("div",{className:"q-container"},void 0,t===F.k&&n.renderPassageOption(e.options),G("div",{className:"row q-row"},void 0,G("div",{className:"col-md-12",dangerouslySetInnerHTML:{__html:e.text}}))):""}),ne(ee(n),"renderSection",function(e,t){var o=e.section,r=e.passage,a=e.questions,s=o.questionType,i=a.length,c=n.state.flag;return G("div",{className:"q-container"},t,G("div",{className:"row q-row"},void 0,G("div",{className:"col-md-12 selected-q sec-header-toggle",onClick:n.toggleShow(t)},void 0,G("span",{dangerouslySetInnerHTML:{__html:o.text}}),G("span",{className:"m-l-10 m-r-10 badge badge-secondary"},void 0,i," - ",s))),!c[t]&&n.renderPassage(r,s),!c[t]&&a.map(n.renderQuestion))}),ne(ee(n),"renderSummary",function(){var e=n.props.exam,t=0===e.length?0:e.map(function(e){return e.questions.length}).reduce(function(e,t){return e+t});return G("div",{className:"row q-container"},void 0,G("div",{className:"col-sm-12 col-md-12 col-lg-12 summary"},void 0,G("h5",{className:"p-t-5"},void 0,G("span",{className:"btn m-r-10",onClick:n.goHome},void 0,"<<"),G("span",{className:"btn",onClick:n.cancelExam},void 0,F.g.cancel_exam),G("span",{className:"btn",onClick:n.createExam},void 0,F.g.create_exam,G("span",{className:"m-l-10 m-r-10 badge badge-secondary"},void 0,t)))))}),ne(ee(n),"hideModal",function(){n.setState({modalShown:!1},function(){oe("#".concat(re)).fadeOut(F.t)})}),ne(ee(n),"onInputModalSubmit",function(e){n.hideModal();var t=e.action,o=e.val;if(0!==o.length)switch(t){case F.d.YES:n.props.createExam(o)}}),n.state={modalShown:!1,sectionId:0,flag:{}},n}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&te(e,t)}(t,r.a.Component),n=t,(o=[{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.escFunction,!1),this.props.loadExamPreview()}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.escFunction,!1)}},{key:"render",value:function(){var e=this.props,t=e.loading,n=e.error,o=e.exam;return t?ae:n?se:o?G("article",{},void 0,ce,G("div",{className:"exam-view-page"},void 0,this.renderSummary(),o.map(this.renderSection),G(W,{id:re,placeholder:"dd-mm-yyyy_name",onSubmit:this.onInputModalSubmit,shown:this.state.modalShown}))):G("div",{className:"row q-container"},void 0,G("div",{className:"col-md-1 summary"},void 0,G("span",{className:"btn",onClick:this.goHome},void 0,"<<")),ie)}}])&&X(n.prototype,o),a&&X(n,a),t}(),ue=Object(i.b)({exam:Object(i.a)(d,function(e){return e.exam}),loading:Object(i.a)(d,function(e){return e.loading}),error:Object(i.a)(d,function(e){return e.error})}),de=Object(a.connect)(ue,function(e){return{loadExamPreview:function(){return e(Object(p.j)())},cancelExam:function(){return e(Object(p.g)())},createExam:function(t){return e(Object(p.h)(t))},goHome:function(t){return e(Object(p.i)(t))}}}),pe=Object(c.a)({key:"exam-view-page",saga:D});t.default=Object(s.compose)(pe,de)(le)},"./app/containers/ExamPreviewViewPage/style.scss":function(e,t,n){var o=n("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./app/containers/ExamPreviewViewPage/style.scss");"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n("./node_modules/style-loader/lib/addStyles.js")(o,r);o.locals&&(e.exports=o.locals)},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./app/components/InputModal/style.scss":function(e,t,n){(e.exports=n("./node_modules/css-loader/dist/runtime/api.js")(!1)).push([e.i,".q-modal{color:#41ADDD}.q-modal p{color:orange}\n",""])},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./app/containers/ExamPreviewViewPage/style.scss":function(e,t,n){(e.exports=n("./node_modules/css-loader/dist/runtime/api.js")(!1)).push([e.i,".exam-view-page .sec-header-toggle{cursor:pointer}.exam-view-page .sec-header-toggle:active{background:#FFF;color:#41ADDD}.exam-view-page .correct{color:#41ADDD}.exam-view-page .op{margin-top:10px;margin-bottom:10px}.exam-view-page .op span{padding-left:10px;padding-right:10px;margin-left:15px;border:1px solid #41ADDD}\n",""])}}]);