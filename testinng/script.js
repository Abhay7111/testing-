const usernameInput = document.getElementById('usernameInput');
const profileContainer = document.getElementById('profileContainer');
function getRandomColor() {
    const colors = [ "#F2F597", "#DBE7C9", "#ffffff", "#789461", "#E9F6FF", "#3652AD", "#FF6868" ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function setRandomBackgroundColor() {
    const randomColor = getRandomColor();
    document.body.style.backgroundColor = randomColor;
    profileContainer.style.backgroundColor = randomColor;
    usernameInput.style.backgroundColor = randomColor;
}
window.onload = setRandomBackgroundColor;

// Get references to HTML elements

// Function to fetch and display GitHub profile
async function fetchProfile() {
    const username = usernameInput.value.trim();

    // Check if the input is not empty
    if (username !== '') {
        try {
            // Fetch user data from GitHub API
            const response = await fetch(`https://api.github.com/users/${username}`);
            const userData = await response.json();

            // Display user profile
            displayProfile(userData);
        } catch (error) {
            console.error('Error fetching GitHub profile:', error);
            displayError('User not found. Please enter a valid GitHub username.');
        }
    }
}

// Function to display user profile
function displayProfile(userData) {
    const profileHTML = `
        <div>
            <img src="${userData.avatar_url}" alt="Profile Picture">
            <h2>${userData.name}</h2>
            <ul>
            <li><p>${userData.bio}</p></li>
            <li><p>${userData.id}</p></li>
            <li><p>${userData.location}</p></li>
            <li><p><strong>Followers:</strong> ${userData.followers}</p></li>
            <li><p><strong>Following:</strong> ${userData.following}</p></li>
            <li><p><strong>Public Repositories:</strong> ${userData.public_repos}</p></li>
            <li><a href="${userData.repos_url} class="userapi">user API</a></li>
            <li><a href="${userData.html_url}" target="_blank">View on GitHub</a></li>
        </ul>
        </div>
    `;

    // Render profile HTML
    profileContainer.innerHTML = profileHTML;
}

// Function to display error message
function displayError(message) {
    profileContainer.innerHTML = `<p style="color: red;">${message}</p>`;
}
