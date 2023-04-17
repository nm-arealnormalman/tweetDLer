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

async function loginTwitter() {
    const loginWindow = window.open("https://twitter.com/login", "_blank");
    loginWindow.focus();
}

async function deleteTweets() {
    if (!(await checkTwitterLogin())) {
        document.getElementById("statusMessage").textContent = "Twitterにログインしていません";
    } else {
        if (confirm("Are you sure you want to delete all tweets?")) {
            const deleteInstructions = "1. Go to your Twitter profile.\n2. Open the browser console (Ctrl+Shift+J or Cmd+Opt+J).\n3. Copy and paste the 'delTweets()' function into the console.\n4. Call the function by typing 'delTweets()' and pressing Enter.";
            alert(`To delete your tweets, please follow these steps:\n\n${deleteInstructions}`);
        }
    }
}

document.getElementById("loginTwitter").addEventListener("click", loginTwitter);
document.getElementById("deleteTweets").addEventListener("click", deleteTweets);
