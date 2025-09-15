# ClassroomLM - Role-based Learning Management Platform

A modern, intelligent learning management system with role-based access control, real-time features, and personalized dashboards.

## 🚀 Features

### Multi-Role System
- **Students**: Personalized dashboard with widgets, progress tracking, todo management
- **Teachers**: Course management, student monitoring, assignment grading
- **Admins**: User management, analytics, notification system

### Student Dashboard
- **Dynamic Widgets**: Drag-and-drop customizable layout
- **Progress Tracking**: Real-time grade and performance analytics
- **Interactive Calendar**: Event management with course integration
- **Smart Todo List**: Priority-based task management
- **Live Analytics**: Performance charts and attendance tracking

### Admin Features
- **User Management**: CRUD operations for all user types
- **Notification System**: Targeted announcements to specific roles/courses
- **Analytics Dashboard**: Platform usage and performance insights
- **Role-based Access Control**: Secure permissions system

### Technical Features
- **Real-time Updates**: WebSocket integration for live data
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Accessibility**: WCAG AA compliant
- **Modern UI**: Gradient backgrounds, smooth animations, glass effects
- **Secure Authentication**: JWT-based auth with role verification

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Query** for data management
- **React Beautiful DnD** for drag-and-drop
- **Recharts** for data visualization
- **React Router** for navigation

### Backend
- **Supabase** for database and authentication
- **PostgreSQL** with Row Level Security
- **Real-time subscriptions** for live updates
- **Edge Functions** for serverless logic

### Database Schema
- Comprehensive relational design
- Role-based security policies
- Multi-institutional support
- Analytics and performance tracking

## 📊 Database Structure

### Core Tables
- `institutions` - Educational institutions
- `user_profiles` - Extended user data with roles
- `courses` - Academic courses
- `enrollments` - Student-course relationships
- `assignments` - Course assignments
- `submissions` - Student submissions
- `grades` - Grading system
- `events` - Calendar events
- `notifications` - Announcement system
- `todos` - Personal task management
- `dashboard_widgets` - UI customization
- `analytics_data` - Performance metrics
- `attendance` - Attendance tracking

### Security Features
- Row Level Security (RLS) on all tables
- Role-based access policies
- Institution-based data isolation
- Secure user authentication

## 🎨 Design System

### Color Palette
- **Primary**: Blue to Purple gradient (#3b82f6 → #8b5cf6)
- **Success**: Emerald (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)
- **Neutral**: Gray scale with warm tones

### UI Components
- **Cards**: Rounded corners (12px), subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, smooth transitions
- **Widgets**: Glass morphism effects, animated interactions
- **Charts**: Modern data visualization with custom styling

### Animations
- **Micro-interactions**: Hover states, button presses
- **Page transitions**: Smooth fade-ins and slide effects
- **Loading states**: Shimmer effects and skeleton screens
- **Drag & Drop**: Visual feedback during interactions

## 🔐 Security & Permissions

### Role-based Access Control
- **Students**: Access to own data, enrolled courses, personal dashboard
- **Teachers**: Manage assigned courses, view student progress, grade assignments
- **Admins**: Full system access, user management, analytics, notifications

### Data Security
- All database operations secured with RLS policies
- JWT-based authentication with role verification
- Encrypted data transmission
- Secure file upload and storage

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (Stack layout, mobile navigation)
- **Tablet**: 768px - 1024px (Adaptive grid, collapsible sidebar)
- **Desktop**: > 1024px (Full grid layout, persistent sidebar)

### Mobile Optimizations
- Touch-friendly interface
- Swipe gestures for navigation
- Optimized widget layouts
- Progressive web app features

## 🚀 Getting Started

1. **Setup Supabase Project**
   - Create a new Supabase project
   - Run the migration script to create the database schema
   - Configure authentication settings

2. **Environment Variables**
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📈 Analytics & Insights

### Student Analytics
- Grade trends over time
- Assignment completion rates
- Study time tracking
- Attendance patterns
- Performance comparisons

### Teacher Analytics
- Class performance overview
- Assignment submission rates
- Student engagement metrics
- Grade distribution analysis

### Admin Analytics
- Platform usage statistics
- User activity patterns
- Course enrollment trends
- System performance metrics

## 🔄 Real-time Features

### Live Updates
- New notifications appear instantly
- Grade updates in real-time
- Calendar event synchronization
- Todo list collaboration
- Dashboard widget updates

### WebSocket Integration
- Supabase real-time subscriptions
- Optimistic UI updates
- Conflict resolution
- Offline support with sync

## 🎯 Future Enhancements

### Planned Features
- **AI-powered Insights**: Personalized learning recommendations
- **Video Conferencing**: Integrated virtual classrooms
- **Mobile App**: Native iOS/Android applications
- **Advanced Analytics**: Machine learning-based predictions
- **Integration APIs**: Third-party LMS compatibility
- **Gamification**: Achievement system and leaderboards

### Scalability
- Multi-tenant architecture
- Microservices migration path
- CDN integration for global performance
- Advanced caching strategies

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

---

**ClassroomLM** - Empowering education through intelligent technology.