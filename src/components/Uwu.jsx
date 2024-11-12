import React, { useEffect, useState } from 'react';
import './Uwu.css'; 

function Uwu() {
  const [subjects, setSubjects] = useState([]);
  const [highlighted, setHighlighted] = useState({ prev: [], next: [], selected: null});

  useEffect(() => {
    fetch('/subjects.json')
      .then(response => response.json())
      .then(data => setSubjects(data.subjects))
      .catch(error => console.error("Error al cargar el JSON:", error));
  }, []);


  const subjectsBySemester = subjects.reduce((acc, subject) => {
    const { semester } = subject;
    if (!acc[semester]) acc[semester] = [];
    acc[semester].push(subject);
    return acc;
  }, {});


  const handleSubjectClick = (subject) => {
    setHighlighted({ prev: subject.prev, next: subject.next, selected: subject.name});
  };

  return (
    <div className="curriculum">
      <h1>Malla Curricular</h1>
      <div className="grid-container">
        {Object.entries(subjectsBySemester).map(([semester, subjects]) => (
          <div key={semester} className="semester">
            <h2>Semestre {semester}</h2>
            <div className="subject-grid">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className={`subject-card 
                    ${highlighted.prev.includes(subject.name) ? 'highlight-prev' : ''}
                    ${highlighted.next.includes(subject.name) ? 'highlight-next' : ''}
                    ${highlighted.selected === subject.name ? 'highlight-selected' : ''}`}
                  onClick={() => handleSubjectClick(subject)}
                >
                  <h3>{subject.name}</h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Uwu;
