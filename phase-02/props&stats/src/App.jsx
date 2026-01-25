import { useState, useEffect } from 'react';
import ProfileCard from './components/ProfileCard';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import initialProfiles from './data/profiles';
import './App.css';

function App() {
  // State for managing profiles with follow status
  const [profiles, setProfiles] = useState(initialProfiles);

  // State for dark/light theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect to log follow changes to console (Bonus feature)
  useEffect(() => {
    const followedUsers = profiles.filter(p => p.isFollowed).map(p => p.name);
    console.log('📊 Follow Status Updated:');
    console.log(`   Following ${followedUsers.length} users:`, followedUsers);
  }, [profiles]);

  // Handle follow/unfollow toggle
  const handleFollowToggle = (id) => {
    setProfiles(prevProfiles =>
      prevProfiles.map(profile =>
        profile.id === id
          ? { ...profile, isFollowed: !profile.isFollowed }
          : profile
      )
    );
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    setIsDarkMode(prev => !prev);
  };

  // Filter profiles based on search query
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const followingCount = profiles.filter(p => p.isFollowed).length;

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="app__container">
        {/* Header */}
        <header className="app__header">
          <div className="app__header-content">
            <div className="app__title-section">
              <h1 className="app__title">
                <span className="app__title-icon">👥</span>
                Profile Cards
              </h1>
              <p className="app__subtitle">
                Discover and follow amazing people
              </p>
            </div>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={handleThemeToggle} />
          </div>

          {/* Stats Bar */}
          <div className="app__stats">
            <div className="app__stat">
              <span className="app__stat-value">{profiles.length}</span>
              <span className="app__stat-label">Total Users</span>
            </div>
            <div className="app__stat">
              <span className="app__stat-value">{followingCount}</span>
              <span className="app__stat-label">Following</span>
            </div>
            <div className="app__stat">
              <span className="app__stat-value">{filteredProfiles.length}</span>
              <span className="app__stat-label">Showing</span>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <section className="app__search-section">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </section>

        {/* Profile Cards Grid */}
        <main className="app__cards-grid">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map(profile => (
              <ProfileCard
                key={profile.id}
                name={profile.name}
                bio={profile.bio}
                avatar={profile.avatar}
                isFollowed={profile.isFollowed}
                onFollowToggle={() => handleFollowToggle(profile.id)}
              />
            ))
          ) : (
            <div className="app__no-results">
              <span className="app__no-results-icon">🔍</span>
              <p>No users found matching "{searchQuery}"</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="app__footer">
          <p>Built with React ⚛️ | Props & State Demo</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
