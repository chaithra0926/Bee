// Read selected stream from previous page (if any)
let selectedStream = localStorage.getItem("selectedCategory") || "arts";

// Data for main college cards
const collegesByStream = {
  arts: [
    {
      rank: 1,
      name: "Lady Shri Ram College",
      location: "New Delhi",
      fest: "Tarang",
      category: "Humanities"
    },
    {
      rank: 2,
      name: "National Law University",
      location: "Delhi",
      fest: "Abhivyakti",
      category: "Law"
    }
  ],

  commerce: [
    {
      rank: 1,
      name: "Shri Ram College of Commerce",
      location: "New Delhi",
      fest: "Crossroads",
      category: "B.Com"
    },
    {
      rank: 2,
      name: "Christ University",
      location: "Bengaluru",
      fest: "Inbloom",
      category: "BBA"
    }
  ],

  science: [
    {
      rank: 1,
      name: "AIIMS New Delhi",
      location: "New Delhi",
      fest: "Pulse",
      category: "Medical"
    },
    {
      rank: 2,
      name: "IIT Bombay",
      location: "Mumbai",
      fest: "Mood Indigo",
      category: "Engineering"
    }
  ]
};


// Data for sidebar best colleges
const bestColleges = {
  arts: [
    { name: "Lady Shri Ram College", location: "New Delhi" },
    { name: "Miranda House", location: "New Delhi" }
  ],
  commerce: [
    { name: "Shri Ram College of Commerce", location: "New Delhi" },
    { name: "St. Xavier's College", location: "Mumbai" }
  ],
  science: [
    { name: "Indian Institute of Science (IISc)", location: "Bengaluru" },
    { name: "Fergusson College", location: "Pune" }
  ]
};
let selectedCategory = "All";

function loadCategoryTabs(stream) {
  const categoryTabs = document.getElementById("categoryTabs");

  const categories = [
    "All",
    ...new Set(collegesByStream[stream].map(c => c.category))
  ];

  categoryTabs.innerHTML = "";

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className = "tab-btn";
    if (cat === selectedCategory) btn.classList.add("active");

    btn.onclick = () => {
      selectedCategory = cat;
      loadStream(stream);
    };

    categoryTabs.appendChild(btn);
  });
}

function loadStream(stream) {
  const collegeList = document.getElementById("collegeList");
  const sidebar = document.getElementById("bestCollegeSidebar");

  // Update active tab styling
  const tabs = document.querySelectorAll(".stream-tabs > .tab-btn");
  tabs.forEach(btn => {
    const btnStream = btn.getAttribute("data-stream");
    if (btnStream === stream) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // 1) Fill main college list
  collegeList.innerHTML = "";
  const filteredColleges =
  selectedCategory === "All"
    ? collegesByStream[stream]
    : collegesByStream[stream].filter(
        college => college.category === selectedCategory
      );

filteredColleges.forEach(college => {

    collegeList.innerHTML += `
      <div class="college-card">
        <div class="rank">#${college.rank}</div>
        <div class="college-info">
          <h3>${college.name}</h3>
          <span><i class="fas fa-map-marker-alt"></i> ${college.location}</span>
          <p><strong>Fest:</strong> ${college.fest}</p>
          <p><strong>Category:</strong> ${college.category}</p>
        </div>
        <div class="actions">
          <button class="view-btn">Full Details</button>
          <button class="save-btn"><i class="far fa-bookmark"></i></button>
        </div>
      </div>
    `;
  });

  // 2) Fill sidebar best colleges
  const title = stream.charAt(0).toUpperCase() + stream.slice(1);
  sidebar.innerHTML = `<h3>Best ${title} Colleges</h3>`;
  bestColleges[stream].forEach(col => {
    sidebar.innerHTML += `
      <div class="sidebar-college">
        <h4>${col.name}</h4>
        <p><i class="fas fa-map-marker-alt"></i> ${col.location}</p>
      </div>
    `;
  });
}

// Tab button click handlers
document.querySelectorAll(".stream-tabs .tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const stream = btn.getAttribute("data-stream");
    if (!stream) return; // ignore category buttons

    selectedStream = stream;
    selectedCategory = "All";

    localStorage.setItem("selectedCategory", stream);
    loadCategoryTabs(stream);
    loadStream(stream);
  });
});



// Initial load: use value from localStorage if available
loadCategoryTabs(selectedStream);
loadStream(selectedStream);

