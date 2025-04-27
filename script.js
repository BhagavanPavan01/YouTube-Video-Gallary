document.addEventListener('DOMContentLoaded', function() {
    // Sample Telugu video data
    const teluguVideos = [
        {
            id: 'YxWlaYCA8MU',
            title: 'Naatu Naatu - RRR (Telugu) | NTR, Ram Charan | MM Keeravaani | SS Rajamouli',
            channel: 'T-Series Telugu',
            views: '450M views',
            date: 'Mar 22, 2022',
            duration: '3:36',
            category: 'songs'
        },
        {
            id: 'gOK3S_ok6xQ',
            title: 'Pushpa: The Rise - Saami Saami | Allu Arjun | Rashmika | Devi Sri Prasad',
            channel: 'Mythri Movie Makers',
            views: '380M views',
            date: 'Dec 10, 2021',
            duration: '3:45',
            category: 'songs'
        },
        {
            id: '6T7h9ovWQHY',
            title: 'Bheemla Nayak Trailer | Pawan Kalyan | Rana | Trivikram | Thaman S',
            channel: 'Sithara Entertainments',
            views: '52M views',
            date: 'Jan 21, 2022',
            duration: '2:31',
            category: 'trailers'
        },
        {
            id: 'mY7M0Q9Qk2k',
            title: 'Jai Balayya - Full Comedy Show | Balakrishna | Sunil | Anil Ravipudi',
            channel: 'HAHA TV Telugu',
            views: '18M views',
            date: 'Jun 15, 2022',
            duration: '25:42',
            category: 'comedy'
        },
        {
            id: 'sCbbMZ-q4-I',
            title: 'Srivalli - Pushpa: The Rise | Allu Arjun | DSP | Sid Sriram',
            channel: 'T-Series Telugu',
            views: '420M views',
            date: 'Dec 17, 2021',
            duration: '4:05',
            category: 'songs'
        },
        {
            id: '5hG4QZfQ7tI',
            title: 'KGF Chapter 2 Telugu Trailer | Yash | Sanjay Dutt | Raveena Tandon',
            channel: 'Mythri Movie Makers',
            views: '68M views',
            date: 'Mar 14, 2022',
            duration: '2:55',
            category: 'trailers'
        }
    ];

    // DOM Elements
    const videoGrid = document.getElementById('videoGrid');
    const loadMoreBtn = document.getElementById('loadMore');
    const categoryChips = document.querySelectorAll('.chip');
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    const youtubePlayer = document.getElementById('youtubePlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoViews = document.getElementById('videoViews');
    const videoDate = document.getElementById('videoDate');

    // State variables
    let currentCategory = 'all';
    let displayedVideos = 6;

    // Initialize the gallery
    function initGallery() {
        renderVideos();
        setupEventListeners();
    }

    // Render videos based on current filters
    function renderVideos() {
        videoGrid.innerHTML = '';
        
        const filteredVideos = teluguVideos.filter(video => {
            return currentCategory === 'all' || video.category === currentCategory;
        }).slice(0, displayedVideos);

        if (filteredVideos.length === 0) {
            videoGrid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-video-slash fa-3x text-muted mb-3"></i>
                    <h4>No videos found</h4>
                    <p>Try selecting a different category</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
            return;
        }

        filteredVideos.forEach(video => {
            const videoCard = createVideoCard(video);
            videoGrid.appendChild(videoCard);
        });

        // Show/hide load more button
        const totalFilteredVideos = teluguVideos.filter(video => {
            return currentCategory === 'all' || video.category === currentCategory;
        }).length;

        loadMoreBtn.style.display = displayedVideos >= totalFilteredVideos ? 'none' : 'block';
    }

    // Create video card element
    function createVideoCard(video) {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 col-xl-3';
        
        const card = document.createElement('div');
        card.className = 'video-card card h-100';
        
        // Thumbnail with duration
        const thumbnail = document.createElement('div');
        thumbnail.className = 'video-thumbnail';
        thumbnail.innerHTML = `
            <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" 
                 alt="${video.title}"
                 onerror="this.src='https://img.youtube.com/vi/${video.id}/hqdefault.jpg'">
            <span class="video-duration">${video.duration}</span>
        `;
        
        // Video info
        const info = document.createElement('div');
        info.className = 'video-info';
        info.innerHTML = `
            <h5 class="video-title">${video.title}</h5>
            <div class="video-channel">${video.channel}</div>
            <div class="video-meta">
                <span>${video.views}</span>
                <span>•</span>
                <span>${video.date}</span>
            </div>
        `;
        
        // Add click event to open modal
        card.addEventListener('click', () => openVideoModal(video));
        
        card.appendChild(thumbnail);
        card.appendChild(info);
        col.appendChild(card);
        
        return col;
    }

    // Open video modal
    function openVideoModal(video) {
        youtubePlayer.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`;
        videoTitle.textContent = video.title;
        videoViews.textContent = video.views;
        videoDate.textContent = video.date;
        videoModal.show();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Category filter chips
        categoryChips.forEach(chip => {
            chip.addEventListener('click', () => {
                categoryChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                currentCategory = chip.textContent.toLowerCase();
                displayedVideos = 6;
                renderVideos();
            });
        });

        // Load more videos
        loadMoreBtn.addEventListener('click', () => {
            displayedVideos += 6;
            renderVideos();
        });

        // Clean up when modal closes
        document.getElementById('videoModal').addEventListener('hidden.bs.modal', () => {
            youtubePlayer.src = '';
        });
    }

    // Initialize the gallery
    initGallery();
});