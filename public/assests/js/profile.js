// // Fetch user details (example from localStorage, but can be from an API)
// const userDetails = JSON.parse(localStorage.getItem("userDetails"));

// // If user details exist, update the profile card
// if (userDetails) {
//     document.getElementById("usernameDisplay").innerText = userDetails.username;
//     document.getElementById("emailDisplay").innerText = userDetails.email;

//     // If profile picture exists, you can set it like this:
//     // document.getElementById("profilePic").src = userDetails.profilePic;
// }

// // Logout functionality
// document.getElementById("logoutButton").addEventListener("click", function () {
//     localStorage.removeItem("userDetails");
//     alert("You have logged out.");
//     window.location.href = "login.html"; // Redirect to homepage or login
// });


// // Example API call to get user details from the backend
// fetch('/api/user/profile', {
//     method: 'GET',
//     headers: {
//         'Authorization': 'Bearer ' + localStorage.getItem('token'), // Example token-based auth
//         'Content-Type': 'application/json'
//     }
// })
// .then(response => response.json())
// .then(data => {
//     // Set the user details in the profile
//     document.getElementById("usernameDisplay").innerText = data.username;
//     document.getElementById("emailDisplay").innerText = data.email;
//     document.getElementById("profilePic").src = data.profilePic;
// })
// .catch(error => {
//     console.error('Error fetching profile data:', error);
// });



// const userDetails = JSON.parse(localStorage.getItem("userDetails"));

//         if (userDetails) {
//             document.getElementById("usernameDisplay").innerText = userDetails.username;
//             document.getElementById("emailDisplay").innerText = userDetails.email;
//         }

//         // Show the edit form when "Edit Profile" button is clicked
//         document.getElementById("editProfileButton").addEventListener("click", function () {
//             const editForm = document.getElementById("editProfileForm");
//             editForm.style.display = (editForm.style.display === "none" || !editForm.style.display) ? "block" : "none";
//         });

//         // Handle form submission to update the profile
//         document.getElementById("editProfileForm").addEventListener("submit", function (event) {
//             event.preventDefault(); // Prevent form from submitting the traditional way

//             const newUsername = document.getElementById("newUsername").value;
//             const newEmail = document.getElementById("newEmail").value;
//             const newProfilePic = document.getElementById("newProfilePic").files[0]; // Assuming you handle file upload

//             // Update user details in localStorage (or send to backend via API)
//             if (newUsername) {
//                 userDetails.username = newUsername;
//             }
//             if (newEmail) {
//                 userDetails.email = newEmail;
//             }

//             // Assuming file upload logic for new profile picture would go here
//             if (newProfilePic) {
//                 const reader = new FileReader();
//                 reader.onload = function(e) {
//                     document.getElementById("profilePic").src = e.target.result; // Show the new profile picture immediately
//                 };
//                 reader.readAsDataURL(newProfilePic); // Read the uploaded file and convert it to a base64 string
//             }

//             // Save the updated details in localStorage (or send to backend)
//             localStorage.setItem("userDetails", JSON.stringify(userDetails));

//             // Update the profile display with new details
//             document.getElementById("usernameDisplay").innerText = userDetails.username;
//             document.getElementById("emailDisplay").innerText = userDetails.email;

//             // Hide the edit form after submission
//             document.getElementById("editProfileForm").style.display = "none";
//         });

//         // Logout functionality
//         document.getElementById("logoutButton").addEventListener("click", function () {
//             localStorage.removeItem("userDetails"); // Clear user details
//             alert("You have been logged out.");
//             window.location.href = "login.html"; // Redirect to homepage or login page
//         });




        // Fetch user details from localStorage (or API)
        const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {
            username: "John Doe",
            email: "john@example.com",
            profilePic: "path-to-default-profile-picture.jpg" // Default profile picture
        };

        // Display user details
        document.getElementById("usernameDisplay").innerText = userDetails.username;
        document.getElementById("emailDisplay").innerText = userDetails.email;
        document.getElementById("profilePic").src = userDetails.profilePic;

        // Show the edit form when "Edit Profile" button is clicked
        document.getElementById("editProfileButton").addEventListener("click", function () {
            const editForm = document.getElementById("editProfileForm");
            editForm.style.display = (editForm.style.display === "none" || !editForm.style.display) ? "block" : "none";
        });

        // Handle form submission to update the profile
        document.getElementById("editProfileForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            const newUsername = document.getElementById("newUsername").value.trim();
            const newEmail = document.getElementById("newEmail").value.trim();
            const newProfilePic = document.getElementById("newProfilePic").files[0]; // Get uploaded file

            // Update user details in localStorage
            if (newUsername) {
                userDetails.username = newUsername;
                document.getElementById("usernameDisplay").innerText = userDetails.username; // Update display
            }
            if (newEmail) {
                userDetails.email = newEmail;
                document.getElementById("emailDisplay").innerText = userDetails.email; // Update display
            }

            // If a new profile picture is uploaded, display it
            if (newProfilePic) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById("profilePic").src = e.target.result; // Display new profile picture
                    userDetails.profilePic = e.target.result; // Update user details
                };
                reader.readAsDataURL(newProfilePic); // Convert file to base64 string
            }

            // Save updated user details to localStorage
            localStorage.setItem("userDetails", JSON.stringify(userDetails));

            // Hide the edit form after submission
            document.getElementById("editProfileForm").style.display = "none";
        });

        // Logout functionality
        document.getElementById("logoutButton").addEventListener("click", function () {
            localStorage.removeItem("userDetails"); // Clear user details
            alert("You have been logged out.");
            window.location.href = "login.html"; // Redirect to homepage or login page
        });