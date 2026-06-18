// SIGNUP

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const username =
            document.getElementById("signupUsername").value;

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const user = {
            username,
            password
        };

        localStorage.setItem(
            "cloudUser",
            JSON.stringify(user)
        );

        alert("Account Created Successfully!");

        window.location.href = "index.html";

    });

}


// LOGIN

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const username =
            document.getElementById("loginUsername").value;

        const password =
            document.getElementById("loginPassword").value;

        const savedUser =
            JSON.parse(
                localStorage.getItem("cloudUser")
            );

        if (
            savedUser &&
            savedUser.username === username &&
            savedUser.password === password
        ) {

            localStorage.setItem(
                "loggedIn",
                "true"
            );

            window.location.href =
                "dashboard.html";

        } else {

            alert(
                "Invalid Username or Password"
            );

        }

    });

}