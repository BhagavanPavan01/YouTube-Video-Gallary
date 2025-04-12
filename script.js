document.addEventListener('DOMContentLoaded', function() {
    // Sample video data
    const videos = [
        {
            id: 'dQw4w9WgXcQ',
            title: 'Never Gonna Give You Up - Rick Astley',
            category: 'music',
            views: '1.2B views',
            date: 'Oct 25, 2009'
        },
        {
            id: 'JGwWNGJdvx8',
            title: 'Ed Sheeran - Shape of You [Official Video]',
            category: 'music',
            views: '5.7B views',
            date: 'Jan 30, 2017'
        },
        {
            id: 'j0u3iPaJr1s',
            title: 'Sample Gaming Video',
            category: 'gaming',
            views: '10M views',
            date: 'Mar 15, 2023'
        },
        {
            id: 'pQN-pnXPaVg',
            title: 'Harvard CS50 - Full Computer Science Course',
            category: 'education',
            views: '3.5M views',
            date: 'Oct 24, 2022'
        },
        {
            id: 'mRD0-GxqHVo',
            title: 'GitHub Copilot X - AI Developer Experience',
            category: 'tech',
            views: '1.2M views',
            date: 'Mar 22, 2023'
        },
        {
            id: '9bZkp7q19f0',
            title: 'PSY - GANGNAM STYLE(강남스타일) M/V',
            category: 'music',
            views: '4.6B views',
            date: 'Jul 15, 2012'
        }
    ];

    // DOM elements
    const videoGallery = document.getElementById('videoGallery');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const loadMoreButton = document.getElementById('loadMore');
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    const youtubeVideoIframe = document.getElementById('youtubeVideo');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const videoModalViews = document.getElementById('videoModalViews');
    const videoModalDate = document.getElementById('videoModalDate');

    // Variables
    let currentCategory = 'all';
    let currentSearchTerm = '';
    let displayedVideos = 6;

    // Initialize the gallery
    function initGallery() {
        renderVideos();
        setupEventListeners();
    }

    // Render videos based on filters
    function renderVideos() {
        videoGallery.innerHTML = '';
        
        const filteredVideos = videos.filter(video => {
            const matchesCategory = currentCategory === 'all' || video.category === currentCategory;
            const matchesSearch = video.title.toLowerCase().includes(currentSearchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        }).slice(0, displayedVideos);

        if (filteredVideos.length === 0) {
            videoGallery.innerHTML = `
                <div class="col-12 no-results">
                    <i class="fas fa-video-slash fa-3x mb-3"></i>
                    <h4>No videos found</h4>
                    <p>Try a different search or category</p>
                </div>
            `;
            loadMoreButton.style.display = 'none';
            return;
        }

        filteredVideos.forEach(video => {
            const videoCard = createVideoCard(video);
            videoGallery.appendChild(videoCard);
        });

        // Show/hide load more button
        const totalFilteredVideos = videos.filter(video => {
            const matchesCategory = currentCategory === 'all' || video.category === currentCategory;
            const matchesSearch = video.title.toLowerCase().includes(currentSearchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        }).length;

        loadMoreButton.style.display = displayedVideos >= totalFilteredVideos ? 'none' : 'block';
    }

    // Create video card HTML
    function createVideoCard(video) {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        
        const card = document.createElement('div');
        card.className = 'video-card card h-100';
        
        // Thumbnail with play button
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.className = 'video-thumbnail';
        thumbnailDiv.innerHTML = `
            <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" 
                 alt="${video.title}"
                 onerror="this.src='https://img.youtube.com/vi/${video.id}/hqdefault.jpg'">
            <div class="play-button">
                <i class="fas fa-play"></i>
            </div>
        `;
        
        // Video info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'video-info';
        infoDiv.innerHTML = `
            <h5 class="video-title">${video.title}</h5>
            <div class="video-meta">
                <span><i class="fas fa-eye"></i> ${video.views}</span>
                <span><i class="far fa-calendar-alt"></i> ${video.date}</span>
            </div>
            <span class="badge badge-${video.category} mt-2">${video.category.toUpperCase()}</span>
        `;
        
        // Add click event to open modal
        card.addEventListener('click', () => openVideoModal(video));
        
        card.appendChild(thumbnailDiv);
        card.appendChild(infoDiv);
        col.appendChild(card);
        
        return col;
    }

    // Open video modal
    function openVideoModal(video) {
        youtubeVideoIframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;
        videoModalTitle.textContent = video.title;
        videoModalViews.innerHTML = `<i class="fas fa-eye"></i> ${video.views}`;
        videoModalDate.textContent = video.date;
        videoModal.show();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Category filter buttons
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                currentCategory = button.dataset.category;
                displayedVideos = 6;
                renderVideos();
            });
        });

        // Search functionality
        searchButton.addEventListener('click', () => {
            currentSearchTerm = searchInput.value.trim();
            displayedVideos = 6;
            renderVideos();
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                currentSearchTerm = searchInput.value.trim();
                displayedVideos = 6;
                renderVideos();
            }
        });

        // Load more videos
        loadMoreButton.addEventListener('click', () => {
            displayedVideos += 6;
            renderVideos();
        });

        // Close modal when hidden
        document.getElementById('videoModal').addEventListener('hidden.bs.modal', () => {
            youtubeVideoIframe.src = '';
        });
    }

    // Initialize the gallery
    initGallery();
});

