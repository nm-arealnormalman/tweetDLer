async function loginTwitter() {
    const loginWindow = window.open("https://twitter.com/login", "_blank");
    loginWindow.focus();
}

async function autoDeleteTweets() {
    const twitterProfileURL = "https://twitter.com/arealnormalman";
    const deleteInstructions = "1. Open the browser console (Ctrl+Shift+J or Cmd+Opt+J).\n2. Copy and paste the 'delTweets()' function into the console.\n3. Call the function by typing 'delTweets()' and pressing Enter.";

    if (confirm("Are you sure you want to delete all tweets?")) {
        const profileWindow = window.open(twitterProfileURL, "_blank");
        profileWindow.focus();

        const checkLoginInterval = setInterval(async function() {
            try {
                const response = await fetch(twitterProfileURL);
                if (response.ok) {
                    clearInterval(checkLoginInterval);
                    alert(`You are now logged in as ${response.url}.\n\n${deleteInstructions}`);
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
            } catch (error) {
                console.error("Error:", error);
            }
        }, 1000);
    }
}

document.getElementById("loginTwitter").addEventListener("click", loginTwitter);
document.getElementById("deleteTweets").addEventListener("click", autoDeleteTweets);
