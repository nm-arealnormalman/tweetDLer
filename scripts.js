async function loginTwitter() {
    const loginWindow = window.open("https://twitter.com/login", "_blank");
    loginWindow.focus();
}

async function autoDeleteTweets() {
    if (confirm("Are you sure you want to delete all tweets?")) {
        const deleteScript = `
            var delTweets = function () {
                var tweetsRemaining = document.querySelectorAll('[role="heading"]+div')[1].textContent;
                console.log('Remaining: ', tweetsRemaining);
                window.scrollBy(0, 10000);
                document.querySelectorAll('[aria-label="More"]').forEach(function (v, i, a) {
                    v.click();
                    document.querySelectorAll('span').forEach(function (v2, i2, a2) {
                        if (v2.textContent === 'Delete') {
                            v2.click();
                            document.querySelectorAll('[data-testid="confirmationSheetConfirm"]').forEach(function (v3, i3, a3) {
                                v3.click();
                            });
                        } else {
                            document.body.click();
                        }
                    });
                });
                setTimeout(delTweets, 4000);
            }
            delTweets();`;

        const deleteScriptURL = `data:text/javascript;charset=utf-8,${encodeURIComponent(deleteScript)}`;
        const deleteScriptWindow = window.open(deleteScriptURL, "_blank");
        deleteScriptWindow.focus();
    }
}

document.getElementById("loginTwitter").addEventListener("click", loginTwitter);
document.getElementById("deleteTweets").addEventListener("click", autoDeleteTweets);
