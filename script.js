document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const videosGrid = document.getElementById('videosGrid');
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.querySelector('.close-modal');
    const youtubePlayer = document.getElementById('youtubePlayer');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const videoViews = document.getElementById('videoViews');
    const videoLikes = document.getElementById('videoLikes');
    const videoDescription = document.getElementById('videoDescription');
    
    // Sample video data
    const videos = [
        {
            id: 'dQw4w9WgXcQ',
            title: 'Never Gonna Give You Up - Rick Astley (Official Music Video)',
            channel: 'Rick Astley',
            views: '1.2B views',
            likes: '12M likes',
            date: 'Oct 25, 2009',
            duration: '3:32',
            description: 'The official video for "Never Gonna Give You Up" by Rick Astley. "Never Gonna Give You Up" was a global smash on its release in July 1987...',
            thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        },
        {
            id: '9bZkp7q19f0',
            title: 'PSY - GANGNAM STYLE(강남스타일) M/V',
            channel: 'officialpsy',
            views: '4.5B views',
            likes: '32M likes',
            date: 'Jul 15, 2012',
            duration: '4:12',
            description: 'PSY - "GANGNAM STYLE(강남스타일)" M/V. The most viewed K-pop video on YouTube.',
            thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg'
        },
        {
            id: 'kJQP7kiw5Fk',
            title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
            channel: 'Luis Fonsi',
            views: '7.9B views',
            likes: '50M likes',
            date: 'Jan 12, 2017',
            duration: '4:41',
            description: 'Official video of "Despacito" by Luis Fonsi ft. Daddy Yankee. The most viewed video on YouTube.',
            thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg'
        },
        {
            id: 'JGwWNGJdvx8',
            title: 'Ed Sheeran - Shape of You [Official Video]',
            channel: 'Ed Sheeran',
            views: '5.9B views',
            likes: '35M likes',
            date: 'Jan 30, 2017',
            duration: '4:23',
            description: 'The official music video for Ed Sheeran - Shape of You. The remix EP is out now: https://atlanti.cr/yt-shapeofyou',
            thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg'
        },
        {
            id: 'RgKAFK5djSk',
            title: 'Wiz Khalifa - See You Again ft. Charlie Puth [Official Video]',
            channel: 'Wiz Khalifa',
            views: '5.8B views',
            likes: '40M likes',
            date: 'Apr 6, 2015',
            duration: '3:49',
            description: 'Official video for "See You Again" by Wiz Khalifa ft. Charlie Puth. Furious 7: Original Motion Picture Soundtrack.',
            thumbnail: 'https://i.ytimg.com/vi/RgKAFK5djSk/maxresdefault.jpg'
        },
        {
            id: 'OPf0YbXqDm0',
            title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
            channel: 'Mark Ronson',
            views: '4.8B views',
            likes: '30M likes',
            date: 'Nov 19, 2014',
            duration: '4:29',
            description: 'Official video for "Uptown Funk" by Mark Ronson ft. Bruno Mars.',
            thumbnail: 'https://i.ytimg.com/vi/OPf0YbXqDm0/maxresdefault.jpg'
        },
        {
            id: 'kJQP7kiw5Fk',
            title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
            channel: 'Luis Fonsi',
            views: '7.9B views',
            likes: '50M likes',
            date: 'Jan 12, 2017',
            duration: '4:41',
            description: 'Official video of "Despacito" by Luis Fonsi ft. Daddy Yankee. The most viewed video on YouTube.',
            thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg'
        },
        {
            id: 'JGwWNGJdvx8',
            title: 'Ed Sheeran - Shape of You [Official Video]',
            channel: 'Ed Sheeran',
            views: '5.9B views',
            likes: '35M likes',
            date: 'Jan 30, 2017',
            duration: '4:23',
            description: 'The official music video for Ed Sheeran - Shape of You. The remix EP is out now: https://atlanti.cr/yt-shapeofyou',
            thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg'
        }
    ];

    // Render videos
    function renderVideos() {
        videosGrid.innerHTML = '';
        
        videos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <div class="thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <span class="video-duration">${video.duration}</span>
                </div>
                <div class="video-info">
                    <img src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg" class="channel-icon-small">
                    <div class="video-details">
                        <h3>${video.title}</h3>
                        <p>${video.channel}</p>
                        <p class="video-stats">${video.views} • ${video.date}</p>
                    </div>
                </div>
            `;
            
            videoCard.addEventListener('click', () => openVideoModal(video));
            videosGrid.appendChild(videoCard);
        });
    }

    // Open video modal
    function openVideoModal(video) {
        youtubePlayer.src = `https://www.youtube.com/embed/${video.id}?autoplay=1`;
        videoModalTitle.textContent = video.title;
        videoViews.textContent = video.views;
        videoLikes.textContent = video.likes;
        videoDescription.textContent = video.description;
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close video modal
    function closeVideoModal() {
        videoModal.style.display = 'none';
        youtubePlayer.src = '';
        document.body.style.overflow = 'auto';
    }

    // Event listeners
    closeModal.addEventListener('click', closeVideoModal);
    window.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    // Initialize
    renderVideos();
});