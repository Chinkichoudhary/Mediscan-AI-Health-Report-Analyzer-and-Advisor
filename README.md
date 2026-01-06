 Mediscan AI Health Report Analyzer and Advisor


 Mediscan is a full-stack AI-powered web application designed to analyze medical reports using OCR and NLP, and provide intelligent health recommendations. It features a secure, user-friendly interface for uploading reports, viewing insights, and accessing personalized guidance.

 MEDISCAN_UI/
├── backend/
│   ├── main.py
│   ├── ocr_utils.py
│   ├── inference_engine.py
│   ├── db_config.py
│   ├── requirements.txt
│   ├── uploads/ (PDF reports)
│   └── nlp/ (image + utils)
├── frontend/
│   ├── public/
│   │   ├── icons/ (security & branding images)
│   │   └── index.html
│   ├── src/
│   │   ├── components/ (React UI modules)
│   │   ├── Pages/ (User-facing pages)
│   │   ├── App.js, index.js, style.css
│   ├── package.json
├── .gitignore
├── README.md


Features
       OCR + NLP Engine: Extracts and interprets medical data from uploaded PDFs.
       Interactive Dashboard: Displays results, recommendations, and visual summaries.
       Secure Uploads: HIPAA-style encryption icons and privacy-first design.
       Modular Frontend: Built with React.js  for scalability and responsiveness.
       RESTful Backend: Python-based API with endpoints for analysis and data handling.


Layer              	  Tools & Frameworks
Frontend	        React.js, CSS, JavaScript
Backend	          Python, FastAPI/Flask (assumed), OCR, NLP
Database	        SQLite / MySQL (via db_config.py)
Dev Tools	        VS Code, Git, PowerShell, Virtual Env (.venv)


🙋‍♀️ Author
Chinki Choudhary  
B.Tech CSE (AI & ML) @ Siddharth Institute of Engineering & Technology
Data Analyst & AI Intern | Passionate about building intelligent, secure, and user-centric solutions.
