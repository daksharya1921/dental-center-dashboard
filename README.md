# Dental Center Management Dashboard

A comprehensive React-based dental center management system for ENTNT Technical Assignment. This application provides role-based access for dental center administration and patient management.

## 🚀 Live Demo

- **Deployed App**: [Your Deployed Link Here]
- **GitHub Repository**: https://github.com/daksharya1921/dental-center-dashboard

## 📋 Project Overview

The Dental Center Management Dashboard is a frontend-only application that simulates a complete dental center management system. It features role-based access control, patient management, appointment scheduling, and file management capabilities.

### User Roles

- **Admin (Dentist)**: Full access to all features including patient management, appointment scheduling, and dashboard analytics
- **Patient**: Limited access to view personal appointments, treatment history, and uploaded files

### Demo Credentials

```
Admin Login:
Email: admin@entnt.in
Password: admin123

Patient Login:
Email: john@entnt.in
Password: patient123
```

## ✨ Features

### Core Features

- **🔐 User Authentication**
  - Simulated login system with role-based access
  - Session persistence using localStorage
  - Protected routes based on user roles

- **👥 Patient Management** (Admin Only)
  - Add, edit, view, and delete patients
  - Comprehensive patient profiles with health information
  - Search and filter functionality

- **📅 Appointment Management** (Admin Only)
  - Create and manage dental appointments (incidents)
  - Track appointment status and treatment progress
  - Add costs, treatments, and follow-up dates

- **📊 Dashboard Analytics**
  - KPI overview with key metrics
  - Next 10 upcoming appointments
  - Top patients and revenue tracking
  - Treatment completion statistics

- **🗓️ Calendar View** (Admin Only)
  - Monthly and weekly appointment views
  - Interactive calendar with appointment details
  - Quick appointment scheduling

- **📋 Patient Portal**
  - Personal appointment history
  - Treatment records and costs
  - File attachments and documents

- **📁 File Management**
  - Upload treatment files (invoices, X-rays, images)
  - File preview and download capabilities
  - Base64 storage for file persistence

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 (Functional Components)
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **File Handling**: Base64 encoding for localStorage
- **Date Handling**: Native JavaScript Date API
- **Build Tool**: Vite
- **Deployment**: Vercel/Netlify/GitHub Pages

## 🏗️ Architecture

```
src/
├── assets/
├── components/           
│   ├── appointments/  
|   ├── shared/        
│   └── patients/                            
├── contexts/            
├── hooks/               
├── pages/               
├── services/            
├── utils/               
├── constants/           
└── types/               
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone dental-center-dashboard
   cd dental-center-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Building for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📊 Data Structure

The application uses localStorage to persist data with the following structure:

```javascript
{
  "users": [
    {
      "id": "1",
      "role": "Admin",
      "email": "admin@entnt.in",
      "password": "admin123"
    },
    {
      "id": "2",
      "role": "Patient",
      "email": "john@entnt.in",
      "password": "patient123",
      "patientId": "p1"
    }
  ],
  "patients": [
    {
      "id": "p1",
      "name": "John Doe",
      "dob": "1990-05-10",
      "contact": "1234567890",
      "healthInfo": "No allergies"
    }
  ],
  "incidents": [
    {
      "id": "i1",
      "patientId": "p1",
      "title": "Toothache",
      "description": "Upper molar pain",
      "comments": "Sensitive to cold",
      "appointmentDate": "2025-07-01T10:00:00",
      "cost": 80,
      "status": "Completed",
      "files": [
        {
          "name": "invoice.pdf",
          "url": "base64string-or-blob-url"
        }
      ]
    }
  ]
}
```

## 🔧 Technical Decisions

### State Management
- **React Context API**: Chosen for its simplicity and built-in React integration
- **localStorage**: Used for data persistence without backend dependency
- **Custom hooks**: Implemented for reusable state logic

### Styling Approach
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Component-based styling**: Consistent design system with reusable components
- **Responsive design**: Mobile-first approach with breakpoint utilities

### File Handling
- **Base64 encoding**: Files converted to base64 strings for localStorage storage
- **Blob URLs**: Used for file preview functionality
- **File type validation**: Implemented to ensure proper file formats

### Form Management
- **Controlled components**: All forms use React controlled components
- **Custom validation**: Client-side validation for better UX
- **Reusable form components**: Consistent form patterns across the app

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured dashboard experience
- **Tablet**: Adapted layout with touch-friendly interactions
- **Mobile**: Simplified navigation with drawer menu

## 🔐 Security Considerations

- **Frontend-only security**: Authentication is simulated for demo purposes
- **Role-based access**: Routes and components are protected based on user roles
- **Data validation**: Input validation on all forms
- **XSS prevention**: Proper data sanitization for user inputs

## 🧪 Testing

The application includes comprehensive testing setup:
- **Unit tests**: Component testing with Jest and React Testing Library
- **Integration tests**: User flow testing
- **E2E tests**: End-to-end testing with Cypress (optional)

## 🚀 Deployment

The application is deployed on [Platform Name] with the following configuration:
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Environment**: Production optimized build

## 📝 Known Issues & Limitations

1. **localStorage limitations**: Data is lost when browser storage is cleared
2. **File size constraints**: Large files may impact performance due to base64 encoding
3. **No real-time updates**: Changes require page refresh in multi-tab scenarios
4. **Browser compatibility**: Requires modern browsers with localStorage support

## 🔄 Future Enhancements

- **Real-time notifications**: Push notifications for appointments
- **Advanced reporting**: Detailed analytics and reporting features
- **Mobile app**: React Native mobile application
- **Offline support**: PWA capabilities for offline access
- **Data export**: Export functionality for reports and patient data

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 👨‍💻 Author

**[Your Name]**
- Email: arya.daksh.official@gmail.com
- GitHub: @daksharya1921(https://github.com/daksharya1921)


## 🙏 Acknowledgments

- ENTNT for the technical assignment opportunity
- React community for excellent documentation
- Tailwind CSS for the utility-first approach
- All open-source contributors who made this project possible

---

**Note**: This is a technical assignment project created for ENTNT. The application simulates a dental center management system for demonstration purposes.
