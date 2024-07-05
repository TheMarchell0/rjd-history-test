const mainBlock=document.querySelector(".test"),sections=mainBlock.querySelectorAll(".test__section"),nextStepButtons=mainBlock.querySelectorAll(".js-next-button"),prevStepButtons=mainBlock.querySelectorAll(".js-prev-button"),removeInactionButtons=mainBlock.querySelectorAll(".js-remove-inaction-button"),restartButtons=mainBlock.querySelectorAll(".js-restart"),inactionModal=mainBlock.querySelector(".inaction");let stepNumber=1,answersType=null,inactionTimeout=null,restartTimeout=null,activeBlock;window.addEventListener("DOMContentLoaded",function(){function o(o){return o.classList.contains("js-main-button")?["main","info_1"]:o.classList.contains("js-info-button")?o.classList.contains("js-prev-button")?[`info_${(stepNumber=--stepNumber)+1}`,`info_${stepNumber}`]:10===stepNumber?(stepNumber=1,gsap.from(".questions_main .questions__content-title",{duration:1,opacity:0,delay:.5}),gsap.from(".questions_main .questions__content-descr",{duration:1,opacity:0,delay:.9}),gsap.from(".questions_main .questions__content-main-button",{opacity:0,duration:1,delay:1.2}),["info_10","questions_main"]):[`info_${(stepNumber=++stepNumber)-1}`,`info_${stepNumber}`]:o.classList.contains("js-questions-main-button")?(gsap.from(".questions_1 .questions__content-title",{duration:1,opacity:0,delay:.5}),gsap.from(".questions_1 .questions__content-descr",{duration:1,opacity:0,delay:.9}),gsap.from(".questions_1 .questions__answer-button",{opacity:0,duration:1,delay:1.2,stagger:.3}),["questions_main","questions_1"]):o.classList.contains("js-questions-button")?(stepNumber=++stepNumber,answersType=o.getAttribute("data-answer"),o.classList.contains("correct")?(o.classList.add("correct_active"),setTimeout(()=>o.classList.remove("correct_active"),3e3)):(o.classList.add("wrong"),setTimeout(()=>o.classList.remove("wrong"),3e3)),gsap.from(`.answers_${answersType} .js-answers-button`,{duration:.5,opacity:0,delay:2.5}),[`questions_${stepNumber-1}`,`answers_${answersType}`]):o.classList.contains("js-answers-button")?7===stepNumber?(stepNumber=1,[`answers_${answersType}`,"finish"]):(gsap.from(`.questions_${stepNumber} .questions__content-title`,{duration:1,opacity:0,delay:.5}),gsap.from(`.questions_${stepNumber} .questions__content-descr`,{duration:1,opacity:0,delay:.9}),gsap.from(`.questions_${stepNumber} .questions__answer-button`,{opacity:0,duration:1,delay:1.2,stagger:.3}),[`answers_${answersType}`,`questions_${stepNumber}`]):o.classList.contains("js-finish-button")?(c(),["finish","main"]):void 0}function t(o){mainBlock.querySelector(`.${o}`),anims[o]()}function i(o){"enable"===o?inactionTimeout=setTimeout(()=>{inactionModal.classList.add("active"),restartTimeout=setTimeout(()=>{n()},15e3)},4e4):"disable"===o&&(clearTimeout(inactionTimeout),clearTimeout(restartTimeout))}function n(){stepNumber=1,t("main"),i("disable"),gsap.to(`.${activeBlock}`,{left:"-50%",opacity:0,duration:1,zIndex:0}),gsap.fromTo(".main",{left:"150%",opacity:0},{left:"50%",opacity:1,duration:1,zIndex:10}),c(),inactionModal.classList.contains("active")&&inactionModal.classList.remove("active")}for(let e of(gsap.to(".questions_main",{opacity:1,duration:1,zIndex:10}),t("main"),nextStepButtons))e.addEventListener("click",()=>{let[i,n]=o(e);i.includes("questions")&&!i.includes("questions_main")?setTimeout(()=>{gsap.to(`.${i}`,{opacity:0,duration:1,zIndex:0}),gsap.fromTo(`.${n}`,{top:"-50%",opacity:0},{top:"50%",opacity:1,duration:1,zIndex:10})},700):(gsap.to(`.${i}`,{left:"-50%",opacity:0,duration:1,zIndex:0}),gsap.fromTo(`.${n}`,{left:"150%",opacity:0},{left:"50%",opacity:1,duration:1,zIndex:10})),(n.includes("info")||n.includes("main"))&&t(n),mainBlock.classList.add("disabled"),setTimeout(()=>mainBlock.classList.remove("disabled"),1e3),activeBlock=n});for(let a of prevStepButtons)a.addEventListener("click",()=>{let[i,n]=o(a);gsap.to(`.${i}`,{left:"150%",opacity:0,duration:1,zIndex:0}),gsap.to(`.${n}`,{left:"50%",opacity:1,duration:1,zIndex:10}),(n.includes("info")||n.includes("main"))&&t(n),mainBlock.classList.add("disabled"),setTimeout(()=>mainBlock.classList.remove("disabled"),1e3),activeBlock=n});for(let r of removeInactionButtons)r.addEventListener("click",()=>{inactionModal.classList.contains("active")&&inactionModal.classList.remove("active"),i("disable"),r.classList.contains("js-finish-button")||setTimeout(()=>i("enable"),100)});for(let s of restartButtons)s.addEventListener("click",()=>{n()});function c(){for(let o of sections)(o.classList.contains("answers")||o.classList.contains("questions"))&&(o.style="")}});const anims={main:function(){gsap.from(".main__decor_1",{y:60,scale:2,duration:1}),gsap.from(".main__decor_2",{x:120,y:-120,duration:1,rotate:60}),gsap.from(".main__decor_3",{x:120,y:120,duration:1,rotate:60}),gsap.from(".main__decor_4",{x:-20,y:120,duration:1,rotate:-60}),gsap.from(".main__decor_5",{x:-120,y:-120,duration:1,rotate:-60}),gsap.from(".main__decor_6",{x:-120,y:-120,duration:1,rotate:-60})},info_1:function(){gsap.from(".info-1__decor_1",{y:60,duration:1,opacity:0,delay:.5}),gsap.from(".info-1__decor_2",{x:120,y:-120,duration:1,opacity:0,delay:.5}),gsap.from(".info-1__decor_3",{x:120,y:120,duration:1,opacity:0,delay:.5}),gsap.from(".info-1__decor_4",{x:-20,y:120,duration:1,opacity:0,delay:.5})},info_2:function(){gsap.from(".info-2__decor_1",{x:60,y:-120,duration:1,opacity:0,delay:.5,rotate:20}),gsap.from(".info-2__decor_2",{x:-60,y:-60,duration:1,opacity:0,delay:.5,rotate:-20}),gsap.from(".info-2__decor_3",{x:120,y:120,duration:1,opacity:0,delay:.5,rotate:20}),gsap.from(".info-2__decor_4",{x:-120,y:120,duration:1,opacity:0,delay:.5,rotate:-20})},info_3:function(){gsap.from(".info-3__decor_1",{y:-120,duration:1,opacity:0,delay:.5}),gsap.from(".info-3__decor_2",{x:120,duration:1,opacity:0,delay:.7,rotate:120}),gsap.from(".info-3__decor_3",{x:-120,duration:1,opacity:0,delay:.9,rotate:-120})},info_4:function(){gsap.from(".info-4__decor_1",{y:120,duration:1,opacity:0,delay:.5}),gsap.from(".info-4__decor_2",{x:-120,duration:1,opacity:0,delay:.7,rotate:-20}),gsap.from(".info-4__decor_3",{y:-120,duration:1,opacity:0,delay:.9,rotate:40})},info_5:function(){gsap.from(".info-5__decor_1",{duration:1,y:200,opacity:0,delay:.5}),gsap.from(".info-5__decor_2",{x:-120,duration:1,opacity:0,delay:.7,rotate:-40}),gsap.from(".info-5__decor_3",{x:120,duration:1,opacity:0,delay:.8,rotate:45})},info_6:function(){gsap.from(".info-6__decor_1",{duration:1,y:200,opacity:0,delay:.5}),gsap.from(".info-6__decor_2",{y:-120,duration:1,opacity:0,delay:.7}),gsap.from(".info-6__decor_3",{x:200,duration:1,opacity:0,delay:.8})},info_7:function(){gsap.from(".info-7__decor_1",{duration:1,y:200,opacity:0,delay:.5}),gsap.from(".info-7__decor_2",{x:120,duration:1,opacity:0,delay:.6}),gsap.from(".info-7__decor_3",{x:-150,duration:1,opacity:0,delay:.5}),gsap.from(".info-7__decor_4",{x:-220,y:150,duration:1,opacity:0,delay:.9}),gsap.from(".info-7__decor_5",{x:300,duration:1,opacity:0,delay:.7})},info_8:function(){gsap.from(".info-8__decor_1",{duration:1,x:200,opacity:0,delay:.5}),gsap.from(".info-8__decor_2",{y:-120,duration:1,opacity:0,delay:.6,rotate:-70}),gsap.from(".info-8__decor_3",{y:-150,duration:1,opacity:0,delay:.7,rotate:30}),gsap.from(".info-8__decor_4",{y:90,duration:1,opacity:0,delay:1})},info_9:function(){gsap.from(".info-9__decor_1",{duration:1,y:-200,opacity:0,delay:.5}),gsap.from(".info-9__decor_2",{x:120,duration:1,opacity:0,delay:.8,rotate:-70}),gsap.from(".info-9__decor_3",{y:150,duration:1,opacity:0,delay:.9,rotate:30})},info_10:function(){gsap.from(".info-10__decor_1",{duration:1,y:200,opacity:0,delay:.5}),gsap.from(".info-10__decor_2",{y:-120,duration:1,opacity:0,delay:.7}),gsap.from(".info-10__decor_3",{x:150,duration:1,opacity:0,delay:.9,rotate:30})}};