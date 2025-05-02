document.addEventListener('DOMContentLoaded', function () {
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
            url: 'https://youtu.be/rslYbT2GvRs?si=XhrqiZ_zDtrZi6-y',
            title: 'Prema Velluva - HIT 3 Movie | Nani, Mrunal Thakur | Hesham Abdul Wahab',
            channel: 'T-Series Telugu',
            views: '18M views',
            likes: '320K likes',
            date: 'Dec 2, 2023',
            duration: '3:45',
            description: 'Watch the beautiful song "Prema Velluva" from the HIT 3 movie, starring Nani and Mrunal Thakur. Music by Hesham Abdul Wahab.',
            thumbnail: 'https://i.ytimg.com/vi/Gz0QS8JPusU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCXUaKmKXm3MuuJA_hztdNqJw_eug'
        },

        {
            url: 'https://youtu.be/5m9sYqJNoWk?si=szgJzaJtTJAGoG7j',
            title: 'Premalo - Lyrical | Court | Priyadarshi, Harsh Roshan, Sridevi | Vijai Bulganin | Ram Jagadeesh',
            channel: 'Aditya Music',
            views: '300M views',
            likes: '2.1M likes',
            date: 'Mar 2020',
            duration: '4:10',
            description: 'Premalo - Lyrical | Court | Priyadarshi, Harsh Roshan, Sridevi | Vijai Bulganin | Ram Jagadeesh',
            thumbnail: 'https://i.ytimg.com/vi/5m9sYqJNoWk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDtVXw3JzNShfjqnPJHE31tUxjhig'
        },

        {
            url: 'https://youtu.be/fmdTZtNQQJI?si=NVWCAXGcFJvxOuZI',
            title: 'Cheppave Chirugaali Video Song | Okkadu | Mahesh Babu | Bhoomika | Mani Sharma @skyvideostelugu',
            channel: 'Aditya Music',
            views: '300M views',
            likes: '2.1M likes',
            date: 'Mar 2020',
            duration: '4:10',
            description: 'Cheppave Chirugaali Video Song | Okkadu | Mahesh Babu | Bhoomika | Mani Sharma @skyvideostelugu',
            thumbnail: 'https://i.ytimg.com/vi/M34DMAUWiXY/maxresdefault.jpg'
        },

        {
            url: 'https://youtu.be/QQwDeJFSVvc?si=k0VyPnhgIbYA5-67',
            title: 'Full Video: Daavudi - దావూదీ | Devara | NTR | Janhvi Kapoor | Koratala Siva | Anirudh Ravichander',
            channel: 'Aditya Music',
            views: '800M views',
            likes: '5.3M likes',
            date: 'Feb 2020',
            duration: '3:22',
            description: 'Full Video: Daavudi - దావూదీ | Devara | NTR | Janhvi Kapoor | Koratala Siva | Anirudh Ravichander',
            thumbnail: 'https://i2.wp.com/socialnews.xyz/wp-content/uploads/2024/09/04/maxresdefault-45.jpg'
        },

        {
            url: 'https://youtu.be/i_YVeV1_HGk?si=cZIm6Fa1sf53q_tV',
            title: 'Manasara Telugu Movie HD Video Song Paravaledu Song Sri Divya Ravi Babu YouTube 720p',
            channel: 'Aditya Music',
            views: '800M views',
            likes: '5.3M likes',
            date: 'Feb 2020',
            duration: '3:22',
            description: 'Manasara Telugu Movie HD Video Song Paravaledu Song Sri Divya Ravi Babu YouTube 720p',
            thumbnail: 'https://i.ytimg.com/vi/e_mlC0X4qR8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDXguR7rx_tl8h7I-iWSAYayyZcoA'
        },

        {
            url: 'https://youtu.be/zK1BQk0L-5U?si=hEvxlQOQ5tkMA8f4',
            title: 'Chitti Nadumune Full Video Song Hd | Pawan Kalyan, Meera Jasmine | Telugu Videos',
            channel: 'Aditya Music',
            views: '800M views',
            likes: '5.3M likes',
            date: 'Feb 2020',
            duration: '3:22',
            description: 'Chitti Nadumune Full Video Song Hd | Pawan Kalyan, Meera Jasmine | Telugu Videos',
            thumbnail: 'https://diey8xpfs90ha.cloudfront.net/wp-content/uploads/2023/03/Pawan-Kalyan-Gudumba-Shankar-To-Get-Re-Release-1024x576.jpg'
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
    function getYouTubeId(url) {
        const match = url.match(/(?:youtu\.be\/|v=)([^&?/]+)/);
        return match ? match[1] : null;
    }

    function openVideoModal(video) {
        const videoId = getYouTubeId(video.url);
        if (videoId) {
            youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }

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