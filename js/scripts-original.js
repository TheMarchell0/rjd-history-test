const mainBlock = document.querySelector('.test'),
    nextStepButtons = mainBlock.querySelectorAll('.js-next-button'),
    prevStepButtons = mainBlock.querySelectorAll('.js-prev-button'),
    removeInactionButtons = mainBlock.querySelectorAll('.js-remove-inaction-button'),
    restartButtons = mainBlock.querySelectorAll('.js-restart'),
    inactionModal = mainBlock.querySelector('.inaction');

let stepNumber = 1,
    answersType = null,
    inactionTimeout = null,
    restartTimeout = null,
    activeBlock;

window.addEventListener('DOMContentLoaded', function () {

    gsap.to(".main", {opacity: 1, duration: 1, zIndex: 10})

    createDecorAnims('main');

    function changeScreen(button) {
        if (button.classList.contains('js-main-button')) {
            return ['main', 'info_1'];
        }
        if (button.classList.contains('js-info-button')) {
            if (button.classList.contains('js-prev-button')) {
                stepNumber = --stepNumber;
                return [`info_${stepNumber + 1}`, `info_${stepNumber}`];
            } else {
                if (stepNumber === 10) {
                    stepNumber = 1;
                    gsap.from('.questions_main .questions__content-title', {duration: 1, opacity: 0, delay: 0.5});
                    gsap.from('.questions_main .questions__content-descr', {duration: 1, opacity: 0, delay: 0.9});
                    gsap.from('.questions_main .questions__content-main-button', {opacity: 0, duration: 1, delay: 1.2});
                    return ['info_10', `questions_main`];
                } else {
                    stepNumber = ++stepNumber;
                    return [`info_${stepNumber - 1}`, `info_${stepNumber}`];
                }
            }
        }
        if (button.classList.contains('js-questions-main-button')) {
            gsap.from('.questions_1 .questions__content-title', {duration: 1, opacity: 0, delay: 0.5});
            gsap.from('.questions_1 .questions__content-descr', {duration: 1, opacity: 0, delay: 0.9});
            gsap.from('.questions_1 .questions__answer-button', {opacity: 0, duration: 1, delay: 1.2, stagger: 0.3});
            return ['questions_main', 'questions_1'];
        }

        if (button.classList.contains('js-questions-button')) {
            stepNumber = ++stepNumber;
            answersType = button.getAttribute('data-answer');
            gsap.from(`.answers_${answersType} .js-answers-button`, {duration: 0.5, opacity: 0, delay: 2.5});
            return [`questions_${stepNumber - 1}`, `answers_${answersType}`];
        }

        if (button.classList.contains('js-answers-button')) {
            if (stepNumber === 7) {
                stepNumber = 1;
                return [`answers_${answersType}`, `finish`];
            } else {
                gsap.from(`.questions_${stepNumber} .questions__content-title`, {duration: 1, opacity: 0, delay: 0.5});
                gsap.from(`.questions_${stepNumber} .questions__content-descr`, {duration: 1, opacity: 0, delay: 0.9});
                gsap.from(`.questions_${stepNumber} .questions__answer-button`, {
                    opacity: 0,
                    duration: 1,
                    delay: 1.2,
                    stagger: 0.3
                });
                return [`answers_${answersType}`, `questions_${stepNumber}`];
            }
        }

        if (button.classList.contains('js-finish-button')) {
            return ['finish', `main`];
        }
    }

    function createDecorAnims(animsBlock) {
        const parent = mainBlock.querySelector(`.${animsBlock}`);
        anims[animsBlock]();
    }

    function inActionTimeDelay(action) {
        if (action === 'enable') {
            inactionTimeout = setTimeout(() => {
                inactionModal.classList.add('active')
                restartTimeout = setTimeout(() => {
                    restart();
                }, 15000);
            }, 40000)
        } else if (action === 'disable') {
            clearTimeout(inactionTimeout);
            clearTimeout(restartTimeout);
        }
    };

    function restart() {
        stepNumber = 1;
        createDecorAnims('main');
        inActionTimeDelay('disable');
        gsap.to(`.${activeBlock}`, {left: '-50%', opacity: 0, duration: 1, zIndex: 0});
        gsap.fromTo('.main', {left: '150%', opacity: 0}, {
            left: '50%',
            opacity: 1,
            duration: 1,
            zIndex: 10
        });
        if (inactionModal.classList.contains('active')) {
            inactionModal.classList.remove('active')
        }
    }

    for (let nextStepButton of nextStepButtons) {
        nextStepButton.addEventListener('click', () => {
            const [currentBlock, nextBlock] = changeScreen(nextStepButton);
            gsap.to(`.${currentBlock}`, {left: '-50%', opacity: 0, duration: 1, zIndex: 0});
            gsap.fromTo(`.${nextBlock}`, {left: '150%', opacity: 0}, {
                left: '50%',
                opacity: 1,
                duration: 1,
                zIndex: 10,
            });

            if (nextBlock.includes('info') || nextBlock.includes('main')) {
                createDecorAnims(nextBlock);
            }
            mainBlock.classList.add('disabled');
            setTimeout(() => mainBlock.classList.remove('disabled'), 1000)
            activeBlock = nextBlock;
        })
    }

    for (let prevStepButton of prevStepButtons) {
        prevStepButton.addEventListener('click', () => {
            const [currentBlock, prevBlock] = changeScreen(prevStepButton);
            gsap.to(`.${currentBlock}`, {left: '150%', opacity: 0, duration: 1, zIndex: 0});
            gsap.to(`.${prevBlock}`, {
                left: '50%',
                opacity: 1,
                duration: 1,
                zIndex: 10,
            });
            if (prevBlock.includes('info') || prevBlock.includes('main')) {
                createDecorAnims(prevBlock);
            }
            mainBlock.classList.add('disabled');
            setTimeout(() => mainBlock.classList.remove('disabled'), 1000)
            activeBlock = prevBlock;
        })
    }

    for (let removeInactionButton of removeInactionButtons) {
        removeInactionButton.addEventListener('click', () => {
            if (inactionModal.classList.contains('active')) {
                inactionModal.classList.remove('active')
            }
            inActionTimeDelay('disable');
            if (!removeInactionButton.classList.contains('js-finish-button')) {
                setTimeout(() => inActionTimeDelay('enable'), 100)
            }
        })
    }

    for (let restartButton of restartButtons) {
        restartButton.addEventListener('click', () => {
            restart();
        })
    }
})
;

const anims = {
    'main': function () {
        gsap.from('.main__decor_1', {y: 60, scale: 2, duration: 1});
        gsap.from('.main__decor_2', {x: 120, y: -120, duration: 1, rotate: 60});
        gsap.from('.main__decor_3', {x: 120, y: 120, duration: 1, rotate: 60});
        gsap.from('.main__decor_4', {x: -20, y: 120, duration: 1, rotate: -60});
        gsap.from('.main__decor_5', {x: -120, y: -120, duration: 1, rotate: -60});
        gsap.from('.main__decor_6', {x: -120, y: -120, duration: 1, rotate: -60});
    },
    'info_1': function () {
        gsap.from('.info-1__decor_1', {y: 60, duration: 1, opacity: 0, delay: 0.5});
        gsap.from('.info-1__decor_2', {x: 120, y: -120, duration: 1, opacity: 0, delay: 0.5});
        gsap.from('.info-1__decor_3', {x: 120, y: 120, duration: 1, opacity: 0, delay: 0.5});
        gsap.from('.info-1__decor_4', {x: -20, y: 120, duration: 1, opacity: 0, delay: 0.5});
    },
    'info_2': function () {
        gsap.from('.info-2__decor_1', {x: 60, y: -120, duration: 1, opacity: 0, delay: 0.5, rotate: 20});
        gsap.from('.info-2__decor_2', {x: -60, y: -60, duration: 1, opacity: 0, delay: 0.5, rotate: -20});
        gsap.from('.info-2__decor_3', {x: 120, y: 120, duration: 1, opacity: 0, delay: 0.5, rotate: 20});
        gsap.from('.info-2__decor_4', {x: -120, y: 120, duration: 1, opacity: 0, delay: 0.5, rotate: -20});
    },
    'info_3': function () {
        gsap.from('.info-3__decor_1', {y: -120, duration: 1, opacity: 0, delay: 0.5});
        gsap.from('.info-3__decor_2', {x: 120, duration: 1, opacity: 0, delay: 0.7, rotate: 120});
        gsap.from('.info-3__decor_3', {x: -120, duration: 1, opacity: 0, delay: 0.9, rotate: -120});
    },
    'info_4': function () {
        gsap.from('.info-4__decor_1', {y: 120, duration: 1, opacity: 0, delay: 0.5});
        gsap.from('.info-4__decor_2', {x: -120, duration: 1, opacity: 0, delay: 0.7, rotate: -20});
        gsap.from('.info-4__decor_3', {y: -120, duration: 1, opacity: 0, delay: 0.9, rotate: 40});
    },
    'info_5': function () {
        gsap.from('.info-5__decor_1', {duration: 1, y: 200, opacity: 0, delay: 0.5});
        gsap.from('.info-5__decor_2', {x: -120, duration: 1, opacity: 0, delay: 0.7, rotate: -40});
        gsap.from('.info-5__decor_3', {x: 120, duration: 1, opacity: 0, delay: 0.8, rotate: 45});
    },
    'info_6': function () {
        gsap.from('.info-6__decor_1', {duration: 1, y: 200, opacity: 0, delay: 0.5});
        gsap.from('.info-6__decor_2', {y: -120, duration: 1, opacity: 0, delay: 0.7});
        gsap.from('.info-6__decor_3', {x: 200, duration: 1, opacity: 0, delay: 0.8});
    },
    'info_7': function () {
        gsap.from('.info-7__decor_1', {duration: 1, y: 200, opacity: 0, delay: 0.5});
        gsap.from('.info-7__decor_2', {x: 120, duration: 1, opacity: 0, delay: 0.6});
        gsap.from('.info-7__decor_3', {x: -150, duration: 1, opacity: 0, delay: 0.5});
        gsap.from('.info-7__decor_4', {x: -220, y: 150, duration: 1, opacity: 0, delay: 0.9});
        gsap.from('.info-7__decor_5', {x: 300, duration: 1, opacity: 0, delay: 0.7});
    },
    'info_8': function () {
        gsap.from('.info-8__decor_1', {duration: 1, x: 200, opacity: 0, delay: 0.5});
        gsap.from('.info-8__decor_2', {y: -120, duration: 1, opacity: 0, delay: 0.6, rotate: -70});
        gsap.from('.info-8__decor_3', {y: -150, duration: 1, opacity: 0, delay: 0.7, rotate: 30});
        gsap.from('.info-8__decor_4', {y: 90, duration: 1, opacity: 0, delay: 1});
    },
    'info_9': function () {
        gsap.from('.info-9__decor_1', {duration: 1, y: -200, opacity: 0, delay: 0.5});
        gsap.from('.info-9__decor_2', {x: 120, duration: 1, opacity: 0, delay: 0.8, rotate: -70});
        gsap.from('.info-9__decor_3', {y: 150, duration: 1, opacity: 0, delay: 0.9, rotate: 30});
    },
    'info_10': function () {
        gsap.from('.info-10__decor_1', {duration: 1, y: 200, opacity: 0, delay: 0.5});
        gsap.from('.info-10__decor_2', {y: -120, duration: 1, opacity: 0, delay: 0.7});
        gsap.from('.info-10__decor_3', {x: 150, duration: 1, opacity: 0, delay: 0.9, rotate: 30});
    },
};