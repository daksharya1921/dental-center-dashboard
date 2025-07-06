// // Initialize localStorage with sample data if empty
// export const initializeData = () => {
//   if (!localStorage.getItem('dental_users')) {
//     localStorage.setItem('dental_users', JSON.stringify([
//       { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
//       { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" }
//     ]));
//   }

//   if (!localStorage.getItem('dental_patients')) {
//     localStorage.setItem('dental_patients', JSON.stringify([
//       {
//         id: "p1",
//         name: "John Doe",
//         dob: "1990-05-10",
//         contact: "1234567890",
//         healthInfo: "No allergies"
//       }
//     ]));
//   }

//   if (!localStorage.getItem('dental_incidents')) {
//     localStorage.setItem('dental_incidents', JSON.stringify([
//       {
//         id: "i1",
//         patientId: "p1",
//         title: "Toothache",
//         description: "Upper molar pain",
//         comments: "Sensitive to cold",
//         appointmentDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
//         cost: 80,
//         treatment: "Filling",
//         status: "Completed",
//         files: []
//       }
//     ]));
//   }
// };

// // CRUD operations for patients
// export const getPatients = () => JSON.parse(localStorage.getItem('dental_patients')) || [];
// export const addPatient = (patient) => {
//   const patients = getPatients();
//   patients.push(patient);
//   localStorage.setItem('dental_patients', JSON.stringify(patients));
// };
// export const updatePatient = (id, updatedPatient) => {
//   const patients = getPatients().map(p => p.id === id ? updatedPatient : p);
//   localStorage.setItem('dental_patients', JSON.stringify(patients));
// };
// export const deletePatient = (id) => {
//   const patients = getPatients().filter(p => p.id !== id);
//   localStorage.setItem('dental_patients', JSON.stringify(patients));
// };

// // CRUD operations for incidents
// export const getIncidents = () => JSON.parse(localStorage.getItem('dental_incidents')) || [];
// export const addIncident = (incident) => {
//   const incidents = getIncidents();
//   incidents.push(incident);
//   localStorage.setItem('dental_incidents', JSON.stringify(incidents));
// };
// export const updateIncident = (id, updatedIncident) => {
//   const incidents = getIncidents().map(i => i.id === id ? updatedIncident : i);
//   localStorage.setItem('dental_incidents', JSON.stringify(incidents));
// };
// export const deleteIncident = (id) => {
//   const incidents = getIncidents().filter(i => i.id !== id);
//   localStorage.setItem('dental_incidents', JSON.stringify(incidents));
// };

// // File handling
// export const saveFile = (incidentId, file) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const incidents = getIncidents();
//       const updatedIncidents = incidents.map(incident => {
//         if (incident.id === incidentId) {
//           return {
//             ...incident,
//             files: [...(incident.files || []), {
//               name: file.name,
//               url: e.target.result
//             }]
//           };
//         }
//         return incident;
//       });
//       localStorage.setItem('dental_incidents', JSON.stringify(updatedIncidents));
//       resolve();
//     };
//     reader.readAsDataURL(file);
//   });
// };
// // In src/utils/dataService.js - ensure this function exists
// export const saveFile = (incidentId, file) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const incidents = getIncidents();
//       const updatedIncidents = incidents.map(incident => {
//         if (incident.id === incidentId) {
//           return {
//             ...incident,
//             files: [...(incident.files || []), {
//               name: file.name,
//               url: e.target.result,
//               size: file.size
//             }]
//           };
//         }
//         return incident;
//       });
//       localStorage.setItem('dental_incidents', JSON.stringify(updatedIncidents));
//       resolve();
//     };
//     reader.readAsDataURL(file);
//   });
// };

// export const saveFile = (incidentId, file) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const incidents = getIncidents();
//       const updatedIncidents = incidents.map(incident => {
//         if (incident.id === incidentId) {
//           return {
//             ...incident,
//             files: [...(incident.files || []), {
//               name: file.name,
//               url: e.target.result
//             }]
//           };
//         }
//         return incident;
//       });
//       localStorage.setItem('dental_incidents', JSON.stringify(updatedIncidents));
//       resolve();
//     };
//     reader.readAsDataURL(file);
//   });
// };
// Initialize and get data
export const initializeData = () => {
  if (!localStorage.getItem('dental_users')) {
    localStorage.setItem('dental_users', JSON.stringify([
      { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
      { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" }
    ]));
  }

  if (!localStorage.getItem('dental_patients')) {
    localStorage.setItem('dental_patients', JSON.stringify([
      {
        id: "p1",
        name: "John Doe",
        dob: "1990-05-10",
        contact: "1234567890",
        healthInfo: "No allergies"
      }
    ]));
  }

  if (!localStorage.getItem('dental_incidents')) {
    localStorage.setItem('dental_incidents', JSON.stringify([
      {
        id: "i1",
        patientId: "p1",
        title: "Toothache",
        description: "Upper molar pain",
        comments: "Sensitive to cold",
        appointmentDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        cost: 80,
        treatment: "Filling",
        status: "Completed",
        files: []
      }
    ]));
  }
};

// Patient CRUD operations
export const getPatients = () => JSON.parse(localStorage.getItem('dental_patients')) || [];

export const addPatient = (patient) => {
  const patients = getPatients();
  patients.push(patient);
  localStorage.setItem('dental_patients', JSON.stringify(patients));
};

export const updatePatient = (id, updatedPatient) => {
  const patients = getPatients().map(p => p.id === id ? updatedPatient : p);
  localStorage.setItem('dental_patients', JSON.stringify(patients));
};

export const deletePatient = (id) => {
  const patients = getPatients().filter(p => p.id !== id);
  localStorage.setItem('dental_patients', JSON.stringify(patients));
};

// Incident CRUD operations
export const getIncidents = () => JSON.parse(localStorage.getItem('dental_incidents')) || [];

export const addIncident = (incident) => {
  const incidents = getIncidents();
  incidents.push(incident);
  localStorage.setItem('dental_incidents', JSON.stringify(incidents));
};

export const updateIncident = (id, updatedIncident) => {
  const incidents = getIncidents().map(i => i.id === id ? updatedIncident : i);
  localStorage.setItem('dental_incidents', JSON.stringify(incidents));
};

export const deleteIncident = (id) => {
  const incidents = getIncidents().filter(i => i.id !== id);
  localStorage.setItem('dental_incidents', JSON.stringify(incidents));
};

// File handling
export const saveFile = (incidentId, file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const incidents = getIncidents();
      const updatedIncidents = incidents.map(incident => {
        if (incident.id === incidentId) {
          return {
            ...incident,
            files: [...(incident.files || []), {
              name: file.name,
              url: e.target.result,
              size: file.size
            }]
          };
        }
        return incident;
      });
      localStorage.setItem('dental_incidents', JSON.stringify(updatedIncidents));
      resolve();
    };
    reader.readAsDataURL(file);
  });
};