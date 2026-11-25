// Education and experience from the supplied resume; current grades are intentionally omitted.
// Featured projects selected by Armash; descriptions checked against their public READMEs.
window.portfolio = {
 name: 'Armash Ansari', github: 'armash66',
 introduction: 'I’m an Electronics and Computer Science student in Mumbai. I work on backend systems and applied machine learning, and enjoy turning a problem into software I can actually use.',
 email: 'ansariarmash007@gmail.com', phone: '+91 9372323529', linkedin: 'https://www.linkedin.com/in/armash-ansari-78575234b/', resume: null, resumeUpdated: null,
 leetcode: 'armash66',
 education: [
  { dates: '2025–2028', title: 'B.Tech · Electronics & Computer Science', institution: 'Vidyalankar Institute of Technology', note: 'Degree programme' },
  { dates: '2022–2025', title: 'Diploma · Computer Engineering', institution: 'M. H. Saboo Siddik Polytechnic', note: 'Completed diploma' }
 ],
 experience: [{ title: 'Internship', institution: 'Anukool India Pvt Ltd' }, { dates: 'June–September 2023', title: 'Web Developer Intern', institution: 'Heuristic Academy', description: 'Built responsive web layouts with HTML, CSS and Bootstrap, and worked on layout structure and compatibility across screen sizes.' }],
 projects: [
  { title: 'ECG ML', category: 'Signal processing & machine learning', description: 'A research prototype for classifying 12-lead ECG recordings. It combines learned signal representations with handcrafted features through adaptive gated fusion.', stack: 'Python · PyTorch · FastAPI', source: 'https://github.com/armash66/ecg-prediction', visual: 'ecg' },
  { title: 'EduQuery', category: 'Academic data & analysis', description: 'A system for reading university marksheets, reconciling inconsistent spreadsheet layouts, and checking student cohorts while retaining a route back to each source cell.', stack: 'Python · FastAPI · DuckDB · React', url: 'https://edu-query-hazel.vercel.app', source: 'https://github.com/armash66/edu-query', visual: 'marksheet' }
 ],
 otherProjects: [
  { title: 'SimpleFlow', note: 'A small language interpreter', source: 'https://github.com/armash66/simpleflow-lang' },
  { title: 'Pixel Forge', note: 'Pixel rearrangement experiments', source: 'https://github.com/armash66/pixel-morph' },
  { title: 'EyeGPT-AI', note: 'Retinal image classification research', source: 'https://github.com/armash66/eyegpt-ai' },
  { title: 'Signal Coverage Maps', note: 'Reconstructing signal coverage from sparse measurements in MATLAB', source: 'https://github.com/armash66/signal-coverage-maps' }
 ],
 milestones: []
};
