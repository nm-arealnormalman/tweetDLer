async function checkTwitterLogin() {
    try {
        const response = await fetch("https://twitter.com/settings/account");
        if (response.ok) {
            return true;
        }
    } catch (error) {
        console.error("Error:", error);
    }
    return false;
}

async function deleteTweets() {
    if (!(await checkTwitterLogin())) {
        alert("Please log in to your Twitter account.");
        const loginWindow = window.open("https://twitter.com/login", "_blank");
        loginWindow.focus();
    } else {
        if (confirm("Are you sure you want to delete all tweets?")) {
            const deleteInstructions = "1. Go to your Twitter profile.\n2. Open the browser console (Ctrl+Shift+J or Cmd+Opt+J).\n3. Copy and paste the 'delTweets()' function into the console.\n4. Call the function by typing 'delTweets()' and pressing Enter.";
            alert(`To delete your tweets, please follow these steps:\n\n${deleteInstructions}`);
        }
    }
}

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

document.getElementById("deleteTweets").addEventListener("click", deleteTweets);
