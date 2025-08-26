export const mockStudents = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@student.edu',
    role: 'student',
    studentId: 'CS2021001',
    course: 'Computer Science',
    semester: 6,
    phone: '+1-555-0123',
    address: '123 Campus Drive, University City',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    email: 'sarah.williams@student.edu',
    role: 'student',
    studentId: 'CS2021002',
    course: 'Computer Science',
    semester: 6,
    phone: '+1-555-0124',
    address: '456 University Ave, College Town',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1b5?w=100&h=100&fit=crop&crop=face'
  }
];

export const mockFaculty = [
  {
    id: '3',
    name: 'Dr. Michael Brown',
    email: 'michael.brown@faculty.edu',
    role: 'faculty',
    facultyId: 'FAC001',
    department: 'Computer Science',
    designation: 'Professor',
    phone: '+1-555-0200',
    subjects: ['Data Structures', 'Algorithms', 'Database Systems'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  }
];

export const mockAdmins = [
  {
    id: '4',
    name: 'Jennifer Davis',
    email: 'jennifer.davis@admin.edu',
    role: 'admin',
    adminId: 'ADM001',
    department: 'Administration',
    permissions: ['user_management', 'course_management', 'reports'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
];

export const mockCourses = [
  {
    id: '1',
    name: 'Computer Science',
    code: 'CS',
    duration: 4,
    description: 'Bachelor of Science in Computer Science'
  },
  {
    id: '2',
    name: 'Information Technology',
    code: 'IT',
    duration: 4,
    description: 'Bachelor of Technology in Information Technology'
  }
];

export const mockSubjects = [
  {
    id: '1',
    name: 'Data Structures',
    code: 'CS301',
    credits: 4,
    semester: 3,
    courseId: '1'
  },
  {
    id: '2',
    name: 'Algorithms',
    code: 'CS302',
    credits: 4,
    semester: 4,
    courseId: '1'
  },
  {
    id: '3',
    name: 'Database Systems',
    code: 'CS401',
    credits: 3,
    semester: 4,
    courseId: '1'
  }
];

export const mockAttendance = [
  {
    id: '1',
    studentId: '1',
    subjectId: '1',
    date: '2024-01-15',
    status: 'present'
  },
  {
    id: '2',
    studentId: '1',
    subjectId: '1',
    date: '2024-01-16',
    status: 'absent'
  },
  {
    id: '3',
    studentId: '1',
    subjectId: '2',
    date: '2024-01-15',
    status: 'present'
  }
];

export const mockGrades = [
  {
    id: '1',
    studentId: '1',
    subjectId: '1',
    type: 'assignment',
    score: 85,
    maxScore: 100,
    date: '2024-01-10'
  },
  {
    id: '2',
    studentId: '1',
    subjectId: '1',
    type: 'midterm',
    score: 78,
    maxScore: 100,
    date: '2024-01-20'
  },
  {
    id: '3',
    studentId: '1',
    subjectId: '2',
    type: 'assignment',
    score: 92,
    maxScore: 100,
    date: '2024-01-12'
  }
];

export const mockAssignments = [
  {
    id: '1',
    title: 'Binary Search Tree Implementation',
    description: 'Implement a binary search tree with insertion, deletion, and traversal operations.',
    subjectId: '1',
    dueDate: '2024-02-15',
    maxScore: 100,
    fileUrl: '/assignments/bst-assignment.pdf'
  },
  {
    id: '2',
    title: 'Sorting Algorithms Analysis',
    description: 'Compare the performance of different sorting algorithms with time complexity analysis.',
    subjectId: '2',
    dueDate: '2024-02-20',
    maxScore: 100
  }
];

export const mockEvents = [
  {
    id: '1',
    title: 'AI/ML Workshop',
    description: 'Introduction to Machine Learning and Artificial Intelligence concepts.',
    date: '2024-02-25',
    time: '10:00 AM',
    location: 'Auditorium A',
    type: 'workshop',
    maxParticipants: 50,
    registeredCount: 23
  },
  {
    id: '2',
    title: 'Tech Fest 2024',
    description: 'Annual technology festival with competitions and exhibitions.',
    date: '2024-03-15',
    time: '9:00 AM',
    location: 'Main Campus',
    type: 'cultural',
    maxParticipants: 200,
    registeredCount: 145
  }
];
