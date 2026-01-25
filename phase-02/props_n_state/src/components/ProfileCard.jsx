import './ProfileCard.css';

// Function to highlight matching text
function highlightText(text, query) {
    if (!query || !query.trim()) {
        return text;
    }

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
        regex.test(part) ? (
            <mark key={index} className="highlight">{part}</mark>
        ) : (
            part
        )
    );
}

function ProfileCard({ name, bio, avatar, isFollowed, onFollowToggle, searchQuery }) {
    return (
        <div className="profile-card">
            <div className="profile-card__avatar-container">
                <img
                    src={avatar}
                    alt={`${name}'s avatar`}
                    className="profile-card__avatar"
                />
                <div className="profile-card__status-dot"></div>
            </div>

            <div className="profile-card__info">
                <h3 className="profile-card__name">{highlightText(name, searchQuery)}</h3>
                <p className="profile-card__bio">{bio}</p>
            </div>

            <button
                className={`profile-card__btn ${isFollowed ? 'profile-card__btn--following' : ''}`}
                onClick={onFollowToggle}
            >
                {isFollowed ? (
                    <>
                        <span className="btn-icon">✓</span>
                        Following
                    </>
                ) : (
                    <>
                        <span className="btn-icon">+</span>
                        Follow
                    </>
                )}
            </button>
        </div>
    );
}

export default ProfileCard;
