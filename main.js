(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"b6ab756a-d068-4063-b5bd-15deff8a109f","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var n=document.querySelector("#card-template").content;function r(r,c){var a=n.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__title"),s=a.querySelector(".card__delete-button");i.src=r.link,i.alt="Изображение памятного места"+r.name,u.textContent=r.name;var l=r.owner._id,d=r._id;c===l?s.addEventListener("click",(function(){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))})(d).then((function(e){a.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))})):s.remove();var p=a.querySelector(".card__like-button");r.likes&&Array.isArray(r.likes)&&r.likes.some((function(e){return e._id===c}))&&p.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){p.classList.contains("card__like-button_is-active")?function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){if(!e.ok)throw new Error("Error: ".concat(e.status));return e.json()})).then((function(e){return e.likes.length}))}(d).then((function(e){_(e)})).catch((function(e){console.error(e)})):function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then((function(e){if(!e.ok)throw new Error("Error: ".concat(e.status));return e.json()})).then((function(e){return e.likes.length}))}(d).then((function(e){_(e,c)})).catch((function(e){console.error(e)}))}));var f=a.querySelector(".counter__likes");function _(e,t){var n=a.querySelector(".card__like-button");f.textContent=e,t&&e>0?n.classList.add("card__like-button_is-active"):n.classList.remove("card__like-button_is-active")}return f.textContent=r.likes&&Array.isArray(r.likes)?r.likes.length:0,i.addEventListener("click",(function(){!function(e){t=e.link,n=e.name,j.src=t,j.alt=n,O.textContent=n,o(U);var t,n}(r)})),a}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a),document.addEventListener("click",u),document.addEventListener("click",i)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a),document.removeEventListener("click",u),document.removeEventListener("click",i)}function a(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function i(e){var t=e.target;t.classList.contains("popup_is-opened")&&c(t)}function u(e){var t=e.target;t.classList.contains("popup__close")&&c(t.closest(".popup"))}var s={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},l=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},d=function(e,t,n){p(e)?(t.disabled=!0,t.classList.add(n.inactiveButtonClass)):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))},p=function(e){return e.some((function(e){return!e.validity.valid}))};function f(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t),n.setCustomValidity("")})),d(n,r,t)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m=document.querySelector(".profile__edit-button"),y=document.querySelector(".popup_type_edit"),v=document.querySelector(".profile__add-button"),h=document.querySelector(".popup_type_new-card");m.addEventListener("click",(function(){k.value=E.textContent,q.value=g.textContent,f(C,s),o(y)})),v.addEventListener("click",(function(){L.reset(),f(L,s),o(h)}));var b=document.querySelector(".profile__image"),S=document.querySelector(".popup__content-profile-edit");b.addEventListener("click",(function(){T.reset(),f(T,s),o(S)}));var k=document.querySelector(".popup__input_type_name"),q=document.querySelector(".popup__input_type_description"),C=document.forms["edit-profile"],E=document.querySelector(".profile__title"),g=document.querySelector(".profile__description");C.addEventListener("submit",(function(n){n.preventDefault();var r,o,a=q.value,i=k.value,u=n.submitter;u.textContent="Сохранение...",(r=i,o=a,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return t(e)}))).then((function(){E.textContent=i,g.textContent=a,c(y)})).catch((function(e){console.error("Ошибка при обновлении данных профиля:",e)})).finally((function(){u.textContent="Сохранить"}))}));var L=document.forms["new-place"],x=L.querySelector(".popup__input_type_card-name"),w=L.querySelector(".popup__input_type_url"),A=document.querySelector(".places__list");L.addEventListener("submit",(function(n){n.preventDefault();var o=n.target.querySelector('button[type="submit"]');o.textContent="Сохранение...";var a,i,u=x.value,s=w.value;s&&(a=u,i=s,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a,link:i})}).then((function(e){return t(e)}))).then((function(e){var t=r({name:u,link:s,owner:{_id:e.owner._id},_id:e._id},e.owner._id);A.prepend(t),n.target.reset(),c(h)})).catch((function(e){console.error("Ошибка при добавлении новой карточки:",e)})).finally((function(){o.textContent="Сохранить"}))}));var U=document.querySelector(".popup_type_image"),j=U.querySelector(".popup__image"),O=U.querySelector(".popup__caption");var T=document.forms["new-avatar"],B=T.querySelector(".popup__input_type_url_avatar"),P=document.querySelector(".profile__image");T.addEventListener("submit",(function(n){n.preventDefault();var r,o=B.value;o&&(n.target.querySelector('button[type="submit"]').textContent="Сохранение...",(r=o,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(){console.log("Аватар успешно обновлен"),P.style.backgroundImage="url('".concat(o,"')"),n.target.querySelector('button[type="submit"]').textContent="Сохранить",n.target.reset(),c(S)})).catch((function(e){console.error("Ошибка при обновлении аватара:",e),n.target.querySelector('button[type="submit"]').textContent="Сохранить"})))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),d(n,r,t)}))}))}(t,e)}))}(s),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1],i=c._id;P.style.backgroundImage="url(".concat(c.avatar,")"),E.textContent=c.name,g.textContent=c.about,a.forEach((function(e){var t=r(e,i);A.append(t)}))})).catch((function(e){console.error("Ошибка при загрузке данных:",e)}))})();
//# sourceMappingURL=main.js.map