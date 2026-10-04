"""Curated public website knowledge; no private CV or environment data.

When portfolio professional data changes, update QAI knowledge here as well.
Sources: src/data/*.js, Hero.jsx, TypingText.jsx, Footer.jsx, Contact.jsx.
Image paths and presentation-only fields are deliberately excluded.
"""
import json

PORTFOLIO_DATA = {'profile': {'name': 'Qosay Qlalwhe',
             'location': 'Jenin, Palestine',
             'available_for_hire': True,
             'roles': ['Frontend Developer',
                       'Programming & Problem Solving Trainer',
                       'Founder & CEO of Solver Academy'],
             'summary': 'Frontend Developer, Programming & Problem Solving Trainer, and Founder & '
                        'CEO of Solver Academy. Passionate about building modern web applications '
                        'and helping students develop practical programming skills.'},
 'services': [{'id': 'responsive-web-development',
               'title': 'Responsive Web Development',
               'description': 'I turn designs and ideas into responsive websites that work '
                              'smoothly across desktop, tablet, and mobile devices.'},
              {'id': 'front-end-development',
               'title': 'Front-End Development',
               'description': 'I build modern and user-friendly web applications using React, '
                              'JavaScript, and modern frontend technologies.'},
              {'id': 'problem-solving-instructor',
               'title': 'Programming & Problem Solving Training',
               'description': 'I provide practical programming and problem-solving training to '
                              'help students build strong technical and analytical skills.'}],
 'skills': [{'name': 'HTML', 'category': 'Frontend'},
            {'name': 'CSS', 'category': 'Frontend'},
            {'name': 'JavaScript', 'category': 'Language'},
            {'name': 'TypeScript', 'category': 'Language'},
            {'name': 'React', 'category': 'Frontend'},
            {'name': 'React Query', 'category': 'Data Fetching'},
            {'name': 'Tailwind CSS', 'category': 'Styling'},
            {'name': 'Material UI', 'category': 'UI Library'},
            {'name': 'Vite', 'category': 'Build Tool'},
            {'name': 'npm', 'category': 'Package Manager'},
            {'name': 'Git', 'category': 'Version Control'},
            {'name': 'GitHub', 'category': 'Version Control'},
            {'name': 'Postman', 'category': 'API Tool'},
            {'name': 'SQL', 'category': 'Database'},
            {'name': 'C++', 'category': 'Language'},
            {'name': 'Java', 'category': 'Language'},
            {'name': 'Figma', 'category': 'Design'},
            {'name': 'Canva', 'category': 'Design'},
            {'name': 'Notion', 'category': 'Productivity'},
            {'name': 'Excel', 'category': 'Productivity'}],
 'experience': [{'role': 'Software Development Trainee',
                 'organization': 'Foothill Technology Solutions · Boot.dev Learning Platform',
                 'period': 'Jun 23, 2026 – Aug 23, 2026',
                 'type': 'Training',
                 'summary': 'Completed a two-month Software Development Training Program focused '
                            'on developing practical programming and software development skills '
                            'through structured learning.',
                 'highlights': ['Completed structured software development training through '
                                'Boot.dev.',
                                'Strengthened practical programming and software development '
                                'fundamentals.',
                                'Applied programming concepts through hands-on learning and '
                                'exercises.'],
                 'skills': ['Software Development', 'Programming', 'Problem Solving', 'Boot.dev']},
                {'role': 'Founder & CEO / Instructor',
                 'organization': 'Solver Academy',
                 'period': 'Present',
                 'type': 'Leadership / Training',
                 'summary': 'Leading Solver Academy to help students develop practical programming '
                            'and problem-solving skills and bridge the gap between university '
                            'education and the job market.',
                 'highlights': ['Lead the academy’s educational direction and training activities.',
                                'Deliver programming and problem-solving courses and workshops.',
                                'Develop practical learning content focused on technical skill '
                                'development.',
                                'Help students build skills that prepare them for real-world '
                                'technology careers.'],
                 'skills': ['Leadership',
                            'Programming',
                            'Problem Solving',
                            'Teaching',
                            'Mentoring']},
                {'role': 'Problem Solving Instructor',
                 'organization': 'Remote & Hassib Sabbagh IT Center of Excellence · AAUP',
                 'period': 'Aug 2025 – Jan 2026',
                 'type': 'Instructor / Training',
                 'summary': 'Delivered structured problem-solving training to 140+ students '
                            'through online and in-person sessions, covering algorithms, data '
                            'structures, complexity analysis, and competitive programming.',
                 'highlights': ['Delivered problem-solving training to more than 140 students.',
                                'Taught algorithms, data structures, complexity analysis, and '
                                'competitive programming concepts.',
                                'Designed structured training content and selected practice '
                                'problems.',
                                'Mentored students and adapted teaching approaches to strengthen '
                                'their coding and analytical skills.'],
                 'skills': ['Algorithms',
                            'Data Structures',
                            'Problem Solving',
                            'Competitive Programming',
                            'Mentoring']},
                {'role': 'Problem Solving Workshop Instructor',
                 'organization': 'Flasha & Nawars Edu · Remote',
                 'period': 'Apr 2026',
                 'type': 'Workshop / Training',
                 'summary': 'Delivered multiple problem-solving workshops in collaboration with '
                            'Flasha and Nawars Edu, reaching 250+ students.',
                 'highlights': ['Introduced students to core problem-solving and analytical '
                                'thinking concepts.',
                                'Shared practical approaches for developing programming skills.',
                                'Guided students through clear learning paths and useful '
                                'resources.',
                                'Connected problem-solving skills with practical software '
                                'development.'],
                 'skills': ['Problem Solving',
                            'Teaching',
                            'Algorithms',
                            'Mentoring',
                            'Competitive Programming']},
                {'role': 'HTML Workshop Instructor',
                 'organization': 'IP Team · AAUP · Remote',
                 'period': 'Jan 18, 2026',
                 'type': 'Workshop / Training',
                 'summary': 'Delivered a practical HTML workshop for 40+ students, introducing '
                            'core HTML concepts and web development fundamentals.',
                 'highlights': ['Taught fundamental HTML concepts and modern web development '
                                'practices.',
                                'Guided students through practical examples and interactive '
                                'exercises.',
                                'Helped participants understand how to structure web pages '
                                'effectively.',
                                'Introduced best practices for building clean web page '
                                'structures.'],
                 'skills': ['HTML', 'Web Development', 'Teaching', 'Frontend Development']}],
 'recognition': [{'id': 'ieee-computer-society',
                  'title': 'IEEE Computer Society',
                  'category': 'Community',
                  'date': '',
                  'description': 'Contributing as a Public Relations member within the IEEE '
                                 'Computer Society, supporting communication, community '
                                 'engagement, and student activities.',
                  'skills': ['Public Relations',
                             'Communication',
                             'Community Engagement',
                             'Teamwork'],
                  'postUrl': ''},
                 {'id': 'ip-team',
                  'title': 'IP Team',
                  'category': 'Community',
                  'date': '',
                  'description': 'Volunteered with IP Team for 1.5 years, starting in Event '
                                 'Management before becoming a Technical Team Member and '
                                 'contributing to technical activities and student initiatives.',
                  'skills': ['Event Management',
                             'Technical Activities',
                             'Teamwork',
                             'Organization'],
                  'postUrl': ''},
                 {'id': 'xtreme-18-19',
                  'title': 'Xtreme 18 & 19',
                  'category': 'Competition',
                  'date': '2024 & 2025',
                  'description': 'Participated in Xtreme 18 and 19, competing in international '
                                 'programming challenges focused on algorithms, problem solving, '
                                 'teamwork, and solving problems under time pressure.',
                  'skills': ['Problem Solving',
                             'Algorithms',
                             'Teamwork',
                             'Competitive Programming'],
                  'postUrl': ''},
                 {'id': 'muniverse-hackathon',
                  'title': 'Muniverse Hackathon',
                  'category': 'Hackathon',
                  'date': '2025',
                  'description': 'Achieved 9th place among Palestinian universities with our team '
                                 'project “Masar,” an integrated digital platform designed to '
                                 'manage municipal transactions and improve the experience for '
                                 'citizens and municipalities,',
                  'skills': ['Entrepreneurship',
                             'Teamwork',
                             'Problem Solving',
                             'Product Development'],
                  'postUrl': ''},
                 {'id': 'mena-catalyst',
                  'title': 'MENA Catalyst Competition',
                  'category': 'Entrepreneurship',
                  'date': '2025',
                  'description': 'Achieved 4th place with our team project “Med AI Chest,” an '
                                 'AI-based system designed to analyze chest X-ray images and '
                                 'provide immediate analysis results.',
                  'skills': ['Entrepreneurship',
                             'Artificial Intelligence',
                             'Teamwork',
                             'Presentation'],
                  'postUrl': ''},
                 {'id': 'ai-coding-competition',
                  'title': 'AI Competition – Coding Track',
                  'category': 'Competition',
                  'date': '2025',
                  'description': 'Achieved 6th place in the Coding Track through a problem-solving '
                                 'competition focused on programming, algorithms, and analytical '
                                 'thinking.',
                  'skills': ['Problem Solving',
                             'Algorithms',
                             'Competitive Programming',
                             'Analytical Thinking'],
                  'postUrl': ''},
                 {'id': 'hebron-code-jam',
                  'title': 'Hebron Code Jam',
                  'category': 'Competition',
                  'date': '2025',
                  'description': 'Represented Arab American University in a Palestine-level '
                                 'problem-solving competition, competing in algorithmic challenges '
                                 'alongside university teams from across Palestine.',
                  'skills': ['Problem Solving',
                             'Algorithms',
                             'Teamwork',
                             'Competitive Programming'],
                  'postUrl': ''},
                 {'id': 'pcpc-qualifier',
                  'title': 'PCPC Qualifier',
                  'category': 'Competition',
                  'date': '2025',
                  'description': 'Participated in the PCPC qualifying competition, gaining further '
                                 'experience in competitive programming, problem solving, and '
                                 'working under contest conditions.',
                  'skills': ['Problem Solving',
                             'Algorithms',
                             'Competitive Programming',
                             'Time Management'],
                  'postUrl': ''},
                 {'id': 'ip-pioneers',
                  'title': 'IP Pioneers Competition',
                  'category': 'Entrepreneurship',
                  'date': '2025',
                  'description': 'Worked with a team to develop an entrepreneurial project idea, '
                                 'prepare a professional presentation, and pitch the concept to a '
                                 'judging committee.',
                  'skills': ['Entrepreneurship', 'Teamwork', 'Presentation', 'Communication'],
                  'postUrl': ''}],
 'client_projects': [{'id': 'rossad-graduation-store',
                      'title': 'ROSSAD – Graduation Store',
                      'description': 'An e-commerce website for graduation gowns and accessories, '
                                     'allowing customers to customize products, add them to the '
                                     'cart, and send complete orders directly via WhatsApp. '
                                     'Reached 1,000+ visits since launch.',
                      'technologies': ['React', 'JavaScript', 'Tailwind CSS'],
                      'liveUrl': 'https://rosad-store.vercel.app/'},
                     {'id': 'pizza-plus',
                      'title': 'Pizza Plus – Digital Menu',
                      'description': 'A digital menu website that allows customers to browse '
                                     'products and place orders directly via WhatsApp, simplifying '
                                     'the ordering experience. Reached 800+ visits since launch.',
                      'technologies': ['React', 'JavaScript', 'Tailwind CSS'],
                      'liveUrl': 'https://pizza-plus-jet.vercel.app/'},
                     {'id': 'Al-Nukhba',
                      'title': 'Al-Nukhba',
                      'description': 'A responsive website for Elite Company showcasing its '
                                     'wedding and event services, helping customers explore '
                                     'available services and easily connect with the company.',
                      'technologies': ['React', 'Tailwind CSS'],
                      'liveUrl': 'https://al-nukhba.vercel.app/'}],
 'training_projects': [{'id': 'ecommerce-final-project',
                        'title': 'E-Commerce Web Application',
                        'description': 'A full-featured e-commerce application integrated with a '
                                       'real backend API, featuring authentication, shopping cart, '
                                       'protected routes, and Arabic/English support.',
                        'technologies': ['React',
                                         'Material UI',
                                         'TanStack Query',
                                         'Zustand',
                                         'Axios'],
                        'githubUrl': 'https://github.com/Qosay2005/e_commerce.git'},
                       {'id': 'jenin-supermarket',
                        'title': 'Jenin Supermarket',
                        'description': 'An academic supermarket management system focused on '
                                       'database design, data management, and backend integration '
                                       'using Node.js and SQL.',
                        'technologies': ['Node.js', 'Express.js', 'MySQL', 'JavaScript'],
                        'githubUrl': 'https://github.com/Qosay2005/jenin_super_market.git'},
                       {'id': 'todo-list-app',
                        'title': 'To-Do List App',
                        'description': 'An interactive task management application for organizing '
                                       'daily tasks, featuring a chatbot to improve user '
                                       'interaction and usability.',
                        'technologies': ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
                        'githubUrl': 'https://github.com/Qosay2005/to_do_list.git'}],
 'education': {'status': 'No degree, study period, or graduation status is displayed in the '
                         'current portfolio.'},
 'public_links': {'portfolio': 'https://qosayqlalwhe.vercel.app',
                  'contact': 'https://qosayqlalwhe.vercel.app/#contact',
                  'resume': 'https://drive.google.com/drive/folders/1ACphv4jKhCu4Wn_TILVwoVtKjVmi67xG',
                  'instagram': 'https://www.instagram.com/eng.aaup?stkn=MWU2NXF6YWQ4cWhraQ==',
                  'whatsapp': 'https://wa.me/972568673682',
                  'linkedin': 'https://www.linkedin.com/in/qosay-qlalwhe?utm_source=share_via&utm_content=profile&utm_medium=member_android'}}

# Serialize structured facts once; visitor text remains separate in main.py.
PORTFOLIO_INFO = json.dumps(PORTFOLIO_DATA, ensure_ascii=False)
