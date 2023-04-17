async function loginTwitter() {
    const loginWindow = window.open("https://twitter.com/login", "_blank");
    loginWindow.focus();
}

function deleteTweets() {
    if (confirm("Are you sure you want to delete all tweets?")) {
        const deleteInstructions = "1. Go to your Twitter profile.\n2. Open the browser console (Ctrl+Shift+J or Cmd+Opt+J).\n3. Copy and paste the 'delTweets()' function into the console.\n4. Call the function by typing 'delTweets()' and pressing Enter.";
        alert(`To delete your tweets, please follow these steps:\n\n${deleteInstructions}`);
    }
}

document.getElementById("loginTwitter").addEventListener("click", loginTwitter);
document.getElementById("deleteTweets").addEventListener("click", deleteTweets);
