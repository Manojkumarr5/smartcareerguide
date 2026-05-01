document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const splashShown = localStorage.getItem("splashShown");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // ===== SHOW USER NAME =====
  const welcomeUserEl = document.getElementById("welcomeUser");
  if (user && welcomeUserEl) {
    const name = user.fullName || user.name || user.email || "User";
    welcomeUserEl.textContent = `Hello, ${name}!`;
  }

  // ===== SPLASH SCREEN LOGIC =====
  if (splash) {
    if (!splashShown) {
      splash.style.display = "flex";
      setTimeout(() => {
        splash.remove();
        localStorage.setItem("splashShown", "true");
      }, 3000);
    } else {
      splash.remove();
    }
  }

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById("hamburger");
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");

  if (hamburger && sideMenu && overlay) {
    hamburger.addEventListener("click", () => {
      sideMenu.classList.toggle("open");
      overlay.classList.toggle("show");
    });

    overlay.addEventListener("click", () => {
      sideMenu.classList.remove("open");
      overlay.classList.remove("show");
    });
  }

  // ===== PROFILE DROPDOWN =====
  const profileIcon = document.getElementById("profileIcon");
  const profileDropdown = document.getElementById("profileDropdown");

  if (profileIcon && profileDropdown) {
    profileIcon.addEventListener("click", () => {
      profileDropdown.classList.toggle("show");
    });

    window.addEventListener("click", (e) => {
      if (!e.target.closest(".profile-section")) {
        profileDropdown.classList.remove("show");
      }
    });
  }

  // ===== ACCOUNT / EDIT / LOGOUT OPTIONS =====
  const accountOption = document.getElementById("accountOption");
  if (accountOption) {
    accountOption.addEventListener("click", (e) => {
      e.preventDefault();
      const u = JSON.parse(localStorage.getItem("loggedInUser")) || {};
      alert(
        `Account Details:\n\nName: ${u.fullName || u.name || "N/A"}\nEmail: ${u.email || "N/A"}`
      );
    });
  }

  const editProfileOption = document.getElementById("editProfileOption");
  if (editProfileOption) {
    editProfileOption.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Edit Profile feature coming soon!");
    });
  }

  const logoutOption = document.getElementById("logoutOption");
  if (logoutOption) {
    logoutOption.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("splashShown");
      alert("You have logged out successfully!");
      window.location.href = "login.html";
    });
  }

  // ===== EXPLORE NOW BUTTON (Home page) =====
  const exploreBtn = document.getElementById("exploreBtn");
  const coursesSection = document.getElementById("coursesSection");

  if (exploreBtn && coursesSection) {
    exploreBtn.addEventListener("click", () => {
      coursesSection.classList.remove("hidden");
      coursesSection.classList.add("fade-in");
      coursesSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ===== AUTO OPEN COURSES IF URL HAS #coursesSection =====
  if (window.location.hash === "#coursesSection" && coursesSection) {
    coursesSection.classList.remove("hidden");
    coursesSection.classList.add("fade-in");
    setTimeout(() => {
      coursesSection.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }

  // ===== MODAL ELEMENTS (only on index.html) =====
  const modal = document.getElementById("courseModal");
  const closeModal = document.getElementById("closeModal");
  const modalTitle = document.getElementById("modalTitle");
  const roadmapContainer = document.getElementById("roadmapContainer");

  if (!modal || !closeModal || !modalTitle || !roadmapContainer) {
    // This page doesn't have the course modal, so stop here
    return;
  }

  // ===== ROADMAP DATA =====
  const courseData = {
    ml: [
      "Learn Python basics and data structures",
      "Master NumPy, Pandas, and Matplotlib",
      "Understand statistics and probability",
      "Learn Linear Regression and Logistic Regression",
      "Understand model evaluation metrics",
      "Study classification algorithms (Decision Trees, Random Forest, SVM)",
      "Explore clustering (K-Means, DBSCAN)",
      "Understand dimensionality reduction (PCA)",
      "Work with real datasets (Kaggle, UCI)",
      "Implement Gradient Boosting and XGBoost",
      "Learn Neural Networks and Deep Learning",
      "Understand CNN and RNN basics",
      "Build end-to-end ML projects",
      "Work with TensorFlow or PyTorch",
      "Deploy models using Flask/Streamlit",
      "Create ML portfolio and host on GitHub",
      "Join Kaggle competitions",
      "Apply for ML internships"
    ],
    web: [
      "Understand HTML structure and semantics",
      "Master CSS fundamentals and colors",
      "Create responsive layouts (Flexbox, Grid)",
      "Learn JavaScript basics (Variables, Loops, Functions)",
      "Manipulate DOM and events",
      "Build small projects (To-Do App, Calculator)",
      "Learn APIs and Fetch calls",
      "Use Git & GitHub for version control",
      "Understand responsive design principles",
      "Learn a frontend framework (React / Vue)",
      "Learn backend (Node.js, Express)",
      "Work with databases (MongoDB / MySQL)",
      "Build full-stack CRUD apps",
      "Add authentication (JWT, Sessions)",
      "Enhance UI/UX with animations",
      "Deploy app on Netlify or Vercel",
      "Build a final portfolio website",
      "Apply for web development internships"
    ],
    python: [
      "Install Python and IDE (VS Code, PyCharm)",
      "Understand syntax, loops, and functions",
      "Work with data types and lists/dicts",
      "File handling and error handling",
      "Learn OOPs concepts (classes, inheritance)",
      "Explore libraries: OS, Math, Random",
      "Work with APIs using Requests",
      "Learn Pandas for data analysis",
      "Visualize data with Matplotlib",
      "Understand JSON and CSV handling",
      "Build mini projects (Quiz App, Calculator)",
      "Automate tasks with Python scripts",
      "Work with Flask or Django basics",
      "Integrate database (SQLite, MySQL)",
      "Build REST APIs",
      "Deploy small web apps",
      "Contribute to open source",
      "Prepare for Python interviews"
    ],
    sql: [
      "Install MySQL or PostgreSQL",
      "Understand what is databases",
      "Learn CREATE, DROP, and ALTER TABLE",
      "Work with SELECT, WHERE, and ORDER BY",
      "Understand INSERT, UPDATE, DELETE",
      "Master JOINs (INNER, LEFT, RIGHT, FULL)",
      "Use GROUP BY, HAVING, and aggregation functions",
      "Write subqueries and nested queries",
      "Work with Views and Indexes",
      "Understand Keys and Constraints",
      "Normalize databases (1NF, 2NF, 3NF)",
      "Create stored procedures and triggers",
      "Optimize queries for performance",
      "Connect SQL with Python",
      "Work on DB projects (Library, HR System)",
      "Use real datasets for analysis",
      "Practice SQL interview questions",
      "Build dashboard-ready queries"
    ],
    ds: [
      "Learn Python and Math fundamentals",
      "Study descriptive and inferential statistics",
      "Learn data cleaning using Pandas",
      "Visualize data with Matplotlib and Seaborn",
      "Perform Exploratory Data Analysis (EDA)",
      "Understand correlation and covariance",
      "Learn feature engineering",
      "Understand ML models (Regression, Classification)",
      "Work with Clustering and PCA",
      "Handle imbalanced datasets",
      "Build predictive ML projects",
      "Understand time series forecasting",
      "Learn model tuning and evaluation",
      "Explore Big Data tools (Spark, Hadoop basics)",
      "Deploy models using Streamlit or Flask",
      "Build dashboards (Power BI / Tableau)",
      "Create a data portfolio",
      "Apply for Data Analyst/Scientist roles"
    ]
  };

  // ===== GENERIC PROGRESS UPDATER FOR ALL COURSES =====
  function updateCourseProgress(course, steps) {
    steps.forEach((step, i) => {
      const stepNumber = i + 1;
      const key = `${course}_step${stepNumber}_completed`; // e.g. ml_step1_completed [web:162][web:177]
      const isDone = localStorage.getItem(key) === "true"; // [web:160][web:231]
      if (isDone) {
        const stepEl = roadmapContainer.querySelectorAll(".roadmap-step")[i];
        if (stepEl) {
          stepEl.classList.add("completed");
        }
      }
    });
  }

  // ===== CLICK ON ROADMAP STEP → GO TO DETAILED PAGE =====
  function attachStepClickHandlers(course) {
    document.querySelectorAll(".roadmap-step .text").forEach(textEl => {
      textEl.addEventListener("click", () => {
        const label = textEl.textContent.trim();

        if (course === "ml") {
          if (label === "Learn Python basics and data structures") {
            window.location.href = "ml_stage1.html";
            return;
          }
          if (label === "Master NumPy, Pandas, and Matplotlib") {
            window.location.href = "ml_stage2.html";
            return;
          }
          if (label === "Understand statistics and probability") {
            window.location.href = "ml_stage3.html";
            return;
          }
          if (label === "Learn Linear Regression and Logistic Regression") {
            window.location.href = "ml_stage4.html";
            return;
          }
          if (label === "Understand model evaluation metrics") {
            window.location.href = "ml_stage5.html";
            return;
          }
          if (label === "Study classification algorithms (Decision Trees, Random Forest, SVM)") {
            window.location.href = "ml_stage6.html";
            return;
          }
          if (label === "Explore clustering (K-Means, DBSCAN)") {
            window.location.href = "ml_stage7.html";
            return;
          }
          if (label === "Understand dimensionality reduction (PCA)") {
            window.location.href = "ml_stage8.html";
            return;
          }
          if (label === "Work with real datasets (Kaggle, UCI)") {
            window.location.href = "ml_stage9.html";
            return;
          }
          if (label === "Implement Gradient Boosting and XGBoost") {
            window.location.href = "ml_stage10.html";
            return;
          }
          if (label === "Learn Neural Networks and Deep Learning") {
            window.location.href = "ml_stage11.html";
            return;
          }
          if (label === "Understand CNN and RNN basics") {
            window.location.href = "ml_stage12.html";
            return;
          }
          if (label === "Build end-to-end ML projects") {
            window.location.href = "ml_stage13.html";
            return;
          }
          if (label === "Work with TensorFlow or PyTorch") {
            window.location.href = "ml_stage14.html";
            return;
          }
          if (label === "Deploy models using Flask/Streamlit") {
            window.location.href = "ml_stage15.html";
            return;
          }
        }

        if (course === "web") {
          if (label === "Understand HTML structure and semantics") {
            window.location.href = "web_stage1.html";
            return;
          }
          if (label === "Master CSS fundamentals and colors") {
            window.location.href = "web_stage2.html";
            return;
          }
          if (label === "Create responsive layouts (Flexbox, Grid)") {
            window.location.href = "web_stage3.html";
            return;
          }
          if (label === "Learn JavaScript basics (Variables, Loops, Functions)") {
            window.location.href = "web_stage4.html";
            return;
          }
          if (label === "Manipulate DOM and events") {
            window.location.href = "web_stage5.html";
            return;
          }
          if (label === "Build small projects (To-Do App, Calculator)") {
            window.location.href = "web_stage6.html";
            return;
          }
          if (label === "Learn APIs and Fetch calls") {
            window.location.href = "web_stage7.html";
            return;
          }
          if (label === "Use Git & GitHub for version control") {
            window.location.href = "web_stage8.html";
            return;
          }
          if (label === "Understand responsive design principles") {
            window.location.href = "web_stage9.html";
            return;
          }
          if (label === "Learn a frontend framework (React / Vue)") {
            window.location.href = "web_stage10.html";
            return;
          }
          if (label === "Learn backend (Node.js, Express)") {
            window.location.href = "web_stage11.html";
            return;
          }
          if (label === "Work with databases (MongoDB / MySQL)") {
            window.location.href = "web_stage12.html";
            return;
          }
          if (label === "Build full-stack CRUD apps") {
            window.location.href = "web_stage13.html";
            return;
          }
          if (label === "Add authentication (JWT, Sessions)") {
            window.location.href = "web_stage14.html";
            return;
          }
          if (label === "Enhance UI/UX with animations") {
            window.location.href = "web_stage15.html";
            return;
          }
          if (label === "Deploy app on Netlify or Vercel") {
            window.location.href = "web_stage16.html";
            return;
          }
        }

        if (course === "python") {
          if (label === "Install Python and IDE (VS Code, PyCharm)") {
            window.location.href = "py_stage1.html";
            return;
          }
          if (label === "Understand syntax, loops, and functions") {
            window.location.href = "py_stage2.html";
            return;
          }
          if (label === "Work with data types and lists/dicts") {
            window.location.href = "py_stage3.html";
            return;
          }
          if (label === "File handling and error handling") {
            window.location.href = "py_stage4.html";
            return;
          }
          if (label === "Learn OOPs concepts (classes, inheritance)") {
            window.location.href = "py_stage5.html";
            return;
          }
          if (label === "Explore libraries: OS, Math, Random") {
            window.location.href = "py_stage6.html";
            return;
          }
          if (label === "Work with APIs using Requests") {
            window.location.href = "py_stage7.html";
            return;
          }
          if (label === "Learn Pandas for data analysis") {
            window.location.href = "py_stage8.html";
            return;
          }
          if (label === "Visualize data with Matplotlib") {
            window.location.href = "py_stage9.html";
            return;
          }
          if (label === "Understand JSON and CSV handling") {
            window.location.href = "py_stage10.html";
            return;
          }
          if (label === "Build mini projects (Quiz App, Calculator)") {
            window.location.href = "py_stage11.html";
            return;
          }
          if (label === "Automate tasks with Python scripts") {
            window.location.href = "py_stage12.html";
            return;
          }
          if (label === "Work with Flask or Django basics") {
            window.location.href = "py_stage13.html";
            return;
          }
          if (label === "Integrate database (SQLite, MySQL)") {
            window.location.href = "py_stage14.html";
            return;
          }
          if (label === "Build REST APIs") {
            window.location.href = "py_stage15.html";
            return;
          }
          if (label === "Deploy small web apps") {
            window.location.href = "py_stage16.html";
            return;
          }
        }

        if (course === "sql") {
          if (label === "Install MySQL or PostgreSQL") {
            window.location.href = "sql_stage1.html";
            return;
          }
          if (label === "Understand what is databases") {
            window.location.href = "sql_stage2.html";
            return;
          }
          if (label === "Learn CREATE, DROP, and ALTER TABLE") {
            window.location.href = "sql_stage3.html";
            return;
          }
          if (label === "Work with SELECT, WHERE, and ORDER BY") {
            window.location.href = "sql_stage4.html";
            return;
          }
          if (label === "Understand INSERT, UPDATE, DELETE") {
            window.location.href = "sql_stage5.html";
            return;
          }
          if (label === "Master JOINs (INNER, LEFT, RIGHT, FULL)") {
            window.location.href = "sql_stage6.html";
            return;
          }
          if (label === "Use GROUP BY, HAVING, and aggregation functions") {
            window.location.href = "sql_stage7.html";
            return;
          }
          if (label === "Write subqueries and nested queries") {
            window.location.href = "sql_stage8.html";
            return;
          }
          if (label === "Work with Views and Indexes") {
            window.location.href = "sql_stage9.html";
            return;
          }
          if (label === "Understand Keys and Constraints") {
            window.location.href = "sql_stage10.html";
            return;
          }
          if (label === "Normalize databases (1NF, 2NF, 3NF)") {
            window.location.href = "sql_stage11.html";
            return;
          }
          if (label === "Create stored procedures and triggers") {
            window.location.href = "sql_stage12.html";
            return;
          }
          if (label === "Optimize queries for performance") {
            window.location.href = "sql_stage13.html";
            return;
          }
          if (label === "Connect SQL with Python") {
            window.location.href = "sql_stage14.html";
            return;
          }
          if (label === "Work on DB projects (Library, HR System)") {
            window.location.href = "sql_stage15.html";
            return;
          }
          if (label === "Use real datasets for analysis") {
            window.location.href = "sql_stage16.html";
            return;
          }
          if (label === "Practice SQL interview questions") {
            window.location.href = "sql_stage17.html";
            return;
          }
          if (label === "Build dashboard-ready queries") {
            window.location.href = "sql_stage18.html";
            return;
          }
        }

        if (course === "ds") {
          if (label === "Learn Python and Math fundamentals") {
            window.location.href = "ds_stage1.html";
            return;
          }
          if (label === "Study descriptive and inferential statistics") {
            window.location.href = "ds_stage2.html";
            return;
          }
          if (label === "Learn data cleaning using Pandas") {
            window.location.href = "ds_stage3.html";
            return;
          }
          if (label === "Visualize data with Matplotlib and Seaborn") {
            window.location.href = "ds_stage4.html";
            return;
          }
          if (label === "Perform Exploratory Data Analysis (EDA)") {
            window.location.href = "ds_stage5.html";
            return;
          }
          if (label === "Understand correlation and covariance") {
            window.location.href = "ds_stage6.html";
            return;
          }
          if (label === "Learn feature engineering") {
            window.location.href = "ds_stage7.html";
            return;
          }
          if (label === "Understand ML models (Regression, Classification)") {
            window.location.href = "ds_stage8.html";
            return;
          }
          if (label === "Work with Clustering and PCA") {
            window.location.href = "ds_stage9.html";
            return;
          }
          if (label === "Handle imbalanced datasets") {
            window.location.href = "ds_stage10.html";
            return;
          }
          if (label === "Build predictive ML projects") {
            window.location.href = "ds_stage11.html";
            return;
          }
          if (label === "Understand time series forecasting") {
            window.location.href = "ds_stage12.html";
            return;
          }
          if (label === "Learn model tuning and evaluation") {
            window.location.href = "ds_stage13.html";
            return;
          }
          if (label === "Explore Big Data tools (Spark, Hadoop basics)") {
            window.location.href = "ds_stage14.html";
            return;
          }
          if (label === "Deploy models using Streamlit or Flask") {
            window.location.href = "ds_stage15.html";
            return;
          }
        }

        alert(`Detailed page for "${label}" will be added soon.`);
      });
    });
  }

  // ===== OPEN COURSE MODAL =====
  document.querySelectorAll(".explore-course").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const course = e.target.dataset.course;
      const steps = courseData[course];
      if (!steps) return;

      modalTitle.textContent =
        e.target.closest(".card").querySelector("h3").textContent;

      roadmapContainer.innerHTML = steps
        .map((step, i) => `
          <div class="roadmap-step ${i % 2 === 0 ? "left" : "right"}"
               style="animation-delay:${i * 0.2}s">
            <div class="circle">${i + 1}</div>
            <div class="text">${step}</div>
          </div>
        `)
        .join("");

      // Mark completed steps for this course using localStorage
      updateCourseProgress(course, steps);

      attachStepClickHandlers(course);
      modal.style.display = "flex";
    });
  });

  // ===== CLOSE MODAL =====
  closeModal.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // ===== AUTO-OPEN POPUPS BASED ON HASH =====

  // ML
  const mlExploreBtn = document.getElementById("open-ml");
  if (window.location.hash === "#open-ml" && mlExploreBtn) {
    if (coursesSection) {
      coursesSection.classList.remove("hidden");
      coursesSection.classList.add("fade-in");
    }
    mlExploreBtn.click();
  }

  // WEB
  // NEW – unified with ML style
const webExploreBtn = document.getElementById("open-web");
if (window.location.hash === "#open-web" && webExploreBtn) {
  if (coursesSection) {
    coursesSection.classList.remove("hidden");
    coursesSection.classList.add("fade-in");
  }
  webExploreBtn.click();
}


  // PYTHON
  const pythonExploreBtn = document.getElementById("open-python");
  if (window.location.hash === "#open-python" && pythonExploreBtn) {
    if (coursesSection) {
      coursesSection.classList.remove("hidden");
      coursesSection.classList.add("fade-in");
    }
    pythonExploreBtn.click();
  }

  // SQL
  const SQLExploreBtn = document.getElementById("open-sql");
  if (window.location.hash === "#open-sql" && SQLExploreBtn) {
    if (coursesSection) {
      coursesSection.classList.remove("hidden");
      coursesSection.classList.add("fade-in");
    }
    SQLExploreBtn.click();
  }

  // DS
  const dsExploreBtn = document.getElementById("open-ds");
  if (window.location.hash === "#open-ds" && dsExploreBtn) {
    if (coursesSection) {
      coursesSection.classList.remove("hidden");
      coursesSection.classList.add("fade-in");
    }
    dsExploreBtn.click();
  }
});
