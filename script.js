// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const videoGrid = document.getElementById('videoGrid');
    const loadMoreBtn = document.getElementById('loadMore');
    const categoryChips = document.querySelectorAll('.chip');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const noResults = document.getElementById('noResults');
    
    // Modal Elements
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    const youtubePlayer = document.getElementById('youtubePlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoViews = document.getElementById('videoViews');
    const videoDate = document.getElementById('videoDate');

    // State variables
    let currentCategory = 'all';
    let currentSearch = '';
    let displayedVideos = 0;
    const videosPerLoad = 8;
    
    // Sample video data
    const videos = [
        {
            id: 'YxWlaYCA8MU',
            title: 'Naatu Naatu - RRR | NTR, Ram Charan | MM Keeravaani | SS Rajamouli',
            channel: 'T-Series',
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
            channel: 'HAHA TV',
            views: '18M views',
            date: 'Jun 15, 2022',
            duration: '25:42',
            category: 'comedy'
        },
        {
            id: 'sCbbMZ-q4-I',
            title: 'Srivalli - Pushpa: The Rise | Allu Arjun | DSP | Sid Sriram',
            channel: 'T-Series',
            views: '420M views',
            date: 'Dec 17, 2021',
            duration: '4:05',
            category: 'songs'
        },
        {
            id: '5hG4QZfQ7tI',
            title: 'KGF Chapter 2 Trailer | Yash | Sanjay Dutt | Raveena Tandon',
            channel: 'Mythri Movie Makers',
            views: '68M views',
            date: 'Mar 14, 2022',
            duration: '2:55',
            category: 'trailers'
        },
        {
            id: 'JfVOs4VSpmA',
            title: 'Ramulo Ramula | Sri Rama Janmabhoomi | Hanuman Chalisa | Shankar Mahadevan',
            channel: 'Aditya Music',
            views: '120M views',
            date: 'Jan 15, 2024',
            duration: '5:42',
            category: 'devotional'
        },
        {
            id: '7B7RcQx9kGA',
            title: 'Uyyala | Sai Narayan Reddy | Shreya Ghoshal | SP Balasubrahmanyam',
            channel: 'Zee Music',
            views: '85M views',
            date: 'Feb 28, 2023',
            duration: '4:18',
            category: 'songs'
        },
        {
            id: '3V1a6hWz1kE',
            title: 'Salaar Teaser | Prabhas | Prashanth Neel | Hombale Films',
            channel: 'Hombale Films',
            views: '93M views',
            date: 'Jul 6, 2023',
            duration: '2:12',
            category: 'trailers'
        },
        {
            id: 'kXYiU_JCYtU',
            title: 'Nannu Kurravadini Chesina Neelambari | Nityananda | Nityashanti | Srimanth Entertainment',
            channel: 'Srimanth Entertainment',
            views: '32M views',
            date: 'May 15, 2023',
            duration: '3:56',
            category: 'devotional'
        },
        {
            id: 'LkOa3KFFt2E',
            title: 'Jagadala Kutala | Dasara | Nani | Keerthy Suresh | S. Thaman',
            channel: 'VYRS Films',
            views: '71M views',
            date: 'Sep 28, 2022',
            duration: '3:34',
            category: 'songs'
        },
        {
            id: '9hVU9sYcAGM',
            title: 'Alavanti Pranam | Adipurush | Pooja Hegde | Jeevit Ramakrishna',
            channel: 'Lyca Productions',
            views: '59M views',
            date: 'Nov 12, 2022',
            duration: '4:22',
            category: 'songs'
        }
    ];

    // Initialize the gallery
    function initGallery() {
        displayedVideos = videosPerLoad;
        renderVideos();
        setupEventListeners();
    }

    // Render videos based on current filters
    function renderVideos() {
        loadingSpinner.style.display = 'block';
        videoGrid.innerHTML = '';
        loadMoreBtn.style.display = 'none';
        noResults.classList.add('d-none');
        
        setTimeout(() => {
            const filteredVideos = filterVideos();
            
            if (filteredVideos.length === 0) {
                noResults.classList.remove('d-none');
                loadingSpinner.style.display = 'none';
                return;
            }
            
            const videosToShow = filteredVideos.slice(0, displayedVideos);
            
            videosToShow.forEach(video => {
                const videoCard = createVideoCard(video);
                videoGrid.appendChild(videoCard);
            });
            
            // Show/hide load more button
            if (displayedVideos < filteredVideos.length) {
                loadMoreBtn.style.display = 'block';
            }
            
            loadingSpinner.style.display = 'none';
        }, 500);
    }

    // Filter videos based on category and search
    function filterVideos() {
        return videos.filter(video => {
            const matchesCategory = currentCategory === 'all' || video.category === currentCategory;
            const matchesSearch = video.title.toLowerCase().includes(currentSearch.toLowerCase()) || 
                                 video.channel.toLowerCase().includes(currentSearch.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }

    // Create video card element
    function createVideoCard(video) {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 col-xl-3';
        
        const card = document.createElement('div');
        card.className = 'video-card card h-100';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        
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
        
        // Add click and keyboard events
        card.addEventListener('click', () => openVideoModal(video));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                openVideoModal(video);
            }
        });
        
        card.appendChild(thumbnail);
        card.appendChild(info);
        col.appendChild(card);
        
        return col;
    }

    // Open video modal
    function openVideoModal(video) {
        youtubePlayer.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`;
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
                currentCategory = chip.dataset.category;
                displayedVideos = videosPerLoad;
                renderVideos();
            });
        });

        // Search functionality
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        // Load more videos
        loadMoreBtn.addEventListener('click', () => {
            displayedVideos += videosPerLoad;
            renderVideos();
            // Smooth scroll to show new videos
            setTimeout(() => {
                loadMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        });

        // Clean up when modal closes
        document.getElementById('videoModal').addEventListener('hidden.bs.modal', () => {
            youtubePlayer.src = '';
        });
    }

    // Perform search
    function performSearch() {
        currentSearch = searchInput.value.trim();
        displayedVideos = videosPerLoad;
        renderVideos();
    }

    // Initialize the gallery
    initGallery();
});