const provinceData = {
    'Kalinga': {
        image: 'img/jeepnetica.png',
        title: 'Jeepnetica',
        description: `<span class="highlight">from Baguio</span>, jeepneys, the main mode of transportation in Manila, came from the abandoned military vehicles from the brand Jeep. Jeepnetica Variable purposefully bastardizes the modernist classic Helvetica and uses the technology of variable font to transform into an original type design inspired by decorative displays often found on jeepneys.`
    },
    'Cagayan': {
        image: 'img/mabuhay.png',
        title: 'Mabuhay Family',
        description: `<span class="highlight">from Cagayan</span>, Mabuhay is a typographic style that is designed to be quintessentially Filipino. Rooted in pre-colonial Baybayin forms that familiar to the Filipino eye, these brushstroke letterforms are what both our ancestors then and activists now paint on flags and banners, or on any material that needs to evoke nationalism.

The Mabuhay font family is designed for legibility and adaptability on digital applications, without compromising what makes it ‘Filipino’.`
    },
    'Ilocos Norte': {
        image: 'img/uniona.png',
        title: 'Uniona',
        description: `<span class="highlight">from Ilocos</span>, Uniona is a variable typeface patterned after the traditional inabel weaving of Ilocos region. The floral motif expands and contracts between axes.`
    },
    'Manila': {
        image: 'img/perlas.png',
        title: 'Perlas Display',
        description: `<span class="highlight">from Manila, Manila</span> is an oriental art deco display font that is nostalgic of Filipino glory days. Like iconic brutalist buildings of the Philippines, Perlas transforms from horizontal slabs with tremendous weight, to fluid and harmonious curves of a pool of still water. Perlas is a study of binary oppositions– it is elegant, smooth then transitions to sturdy shapes and hard edges.`
    },
    'Samar': {
        image: 'img/mabuhayd.png',
        title: 'Mabuhay Display',
        description: `<span class="highlight">from Samar</span> Mabuhay Display is an expansion of the Mabuhay font family. The type characteristics are more pronounced for big headers and use on signage making.`
    },
    'Leyte': {
        image: 'img/cubao.png',
        title: 'Cubao',
        description: `<span class="highlight">from Leyte</span>, Cubao is a display typeface dedicated to the Filipino sign makers, Jeepney drivers, and the daily commuters of Leyte. Cubao is inspired by the traditional jeepney placards and other signboards typically found in transportation hubs around the Philippines.`
    },
    'Bacolod': {
        image: 'img/taklobo.png',
        title: 'Taklobo',
        description: `<span class="highlight">from Bacolod</span>, Taklobo is a heavy display typeface resembling the proportions and curves of the world's largest living bivalve mollusks—the giant clams, locally known as taklobo—found in threatened numbers off the shores of the Philippines.`
    },
    'Cagayan De Oro': {
        image: 'img/inandan.png',
        title: 'Inandan',
        description: `<span class="highlight">from Cagayan De Oro City</span>, Inandan is a geometric typeface based from the beadwork and weaving patterns from several ethnic groups in Southern Philippines. The inspiration came from beaded pieces that follow an arrangement of cascading beads – patterned into stacked rounded squares or rectangles – to form symbols and insignias specific for each ethnicity. A quick research on the different tribes housed in Mindanao will display results pertaining to garbs of different weaving patterns that are characterized by flowing and highly-ornamented profiles and have no traces of underlying Spanish-influenced motifs.
        
        Inandan is available free for download here: http://bit.ly/2CT6xXm`
    }
};

const popup = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const popupTitle = document.getElementById('popup-title');
const popupDescription = document.getElementById('popup-description');
const provinces = document.querySelectorAll('.province');
  // Track popup state
        let isPopupPinned = false;
        let currentProvince = null;

        function showPopup(provinceName, x, y) {
            const data = provinceData[provinceName];
            if (data) {
                popupImage.style.backgroundImage = `url(${data.image})`;
                popupTitle.textContent = data.title;
                popupDescription.innerHTML = data.description;
                
                positionPopup(x, y);
                popup.style.display = 'block';
            }
        }

        function positionPopup(x, y) {
            const containerRect = document.querySelector('.map-container').getBoundingClientRect();
            
            let left = x - containerRect.left + 20;
            let top = y - containerRect.top - 160;
            
            // Keep popup within container bounds
            if (left + 450 > containerRect.width) {
                left = x - containerRect.left - 470;
            }
            if (top < 0) {
                top = y - containerRect.top + 20;
            }
            
            popup.style.left = left + 'px';
            popup.style.top = top + 'px';
        }

        provinces.forEach(province => {
            // Hover events (only work when popup is not pinned)
            province.addEventListener('mouseenter', (e) => {
                if (!isPopupPinned) {
                    const provinceName = e.target.getAttribute('data-province');
                    currentProvince = provinceName;
                    showPopup(provinceName, e.clientX, e.clientY);
                }
            });
            
            province.addEventListener('mousemove', (e) => {
                if (!isPopupPinned && popup.style.display === 'block') {
                    positionPopup(e.clientX, e.clientY);
                }
            });
            
            province.addEventListener('mouseleave', () => {
                if (!isPopupPinned) {
                    popup.style.display = 'none';
                    currentProvince = null;
                }
            });

            // Click event to pin/unpin popup
            province.addEventListener('click', (e) => {
                e.stopPropagation();
                const provinceName = e.target.getAttribute('data-province');
                
                if (isPopupPinned && currentProvince === provinceName) {
                    // Clicking the same province unpins it
                    isPopupPinned = false;
                    popup.style.display = 'none';
                    currentProvince = null;
                } else {
                    // Pin the popup for this province
                    isPopupPinned = true;
                    currentProvince = provinceName;
                    showPopup(provinceName, e.clientX, e.clientY);
                }
            });
        });

        // Click anywhere else to unpin popup
        document.addEventListener('click', (e) => {
            if (isPopupPinned && !popup.contains(e.target)) {
                isPopupPinned = false;
                popup.style.display = 'none';
                currentProvince = null;
            }
        });

        // Prevent popup from closing when clicking inside it
        popup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
