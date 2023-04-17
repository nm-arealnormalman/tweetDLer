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
        location.href = "https://twitter.com/login";
    } else {
        if (confirm("Are you sure you want to delete all tweets?")) {
            location.href = "https://twitter.com/settings/account";
            delTweets();
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
