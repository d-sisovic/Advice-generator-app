(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const diceButton = document.querySelector('#dice');
        const textElement = document.querySelector('#text');
        const adviceText = document.querySelector('#advice');

        diceButton.addEventListener('click', () => {
            diceButton.classList.add('dice--rotate');

            setTimeout(async () => {
                try {
                    const response = await fetch('https://api.adviceslip.com/advice');
                    const { slip } = await response.json();
                    const { id, advice } = slip;
    
                    adviceText.textContent = `ADVICE #${id}`;
                    textElement.textContent = advice;
                    removeRotateAnimation();
                } catch {
                    textElement.textContent = 'ERROR #xxx';
                    adviceText.textContent = 'There was an error while fetching the advice. Please try again.';
                    removeRotateAnimation();
                }
            }, 2000);
        });

        const removeRotateAnimation = () => diceButton.classList.remove('dice--rotate');
    });
})();   