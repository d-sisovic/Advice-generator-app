(() => {
    let timeout;

    document.addEventListener('DOMContentLoaded', () => {
        const diceButton = document.querySelector('#dice');
        const textElement = document.querySelector('#text');
        const adviceText = document.querySelector('#advice');

        diceButton.addEventListener('click', () => {
            clearTimeout(timeout);
            addRotateAnimation();

            timeout = setTimeout(async () => {
                try {
                    const response = await fetch('https://api.adviceslip.com/advice');
                    const { slip } = await response.json();
                    const { id, advice } = slip;
    
                    setTextContent(`ADVICE #${id}`, advice);
                    removeRotateAnimation();
                } catch {
                    setTextContent('ERROR #xxx', 'There was an error while fetching the advice. Please try again.');
                    removeRotateAnimation();
                }
            }, 1_000);
        });

        const setTextContent = (adviceId, advice) => {
            adviceText.textContent = adviceId;
            textElement.textContent = advice;
        };

        const addRotateAnimation = () => diceButton.classList.add('dice--rotate');

        const removeRotateAnimation = () => diceButton.classList.remove('dice--rotate');
    });
})();   