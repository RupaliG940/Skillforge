// Interview Categories
export const INTERVIEW_CATEGORIES = [
  { id: 'dsa', label: 'DSA', emoji: '🧮', color: 'bg-blue-500' },
  { id: 'behavioral', label: 'Behavioral', emoji: '🧠', color: 'bg-purple-500' },
  { id: 'system-design', label: 'System Design', emoji: '⚙️', color: 'bg-cyan-500' },
  { id: 'hr', label: 'HR Round', emoji: '👔', color: 'bg-yellow-500' },
  { id: 'frontend', label: 'Frontend', emoji: '💻', color: 'bg-sky-500' },
  { id: 'backend', label: 'Backend', emoji: '🗄️', color: 'bg-indigo-500' },
  { id: 'communication', label: 'Communication', emoji: '🗣️', color: 'bg-pink-500' },
] as const;

export const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'] as const;

export const INTERVIEW_COMPANIES = [
  'Google',
  'Amazon',
  'Microsoft',
  'Meta',
  'Apple',
  'Flipkart',
  'Swiggy',
  'Zomato',
  'OYO',
  'PharmEasy',
] as const;

// Project Status
export const PROJECT_STATUS = ['Planning', 'Active', 'Done', 'Paused'] as const;

// Roadmap Durations
export const ROADMAP_DURATIONS = ['30', '60', '90'] as const;

// Color Scheme
export const COLORS = {
  background: '#09090b',
  card: '#18181b',
  border: '#27272a',
  primary: '#f97316',
  text: {
    primary: '#fafafa',
    secondary: '#a1a1aa',
  },
  success: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
} as const;

// Sample Interview Questions
export const SAMPLE_QUESTIONS = [
  // DSA Questions
  {
    id: 'dsa-1',
    question: 'Explain the difference between Stack and Queue with real-world examples.',
    category: 'dsa',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'Stack uses LIFO (Last In First Out) - like browser back button or undo functionality. Queue uses FIFO (First In First Out) - like a printer queue or ATM line.',
    tips: ['Mention LIFO/FIFO', 'Give real-world examples', 'Talk about time complexity'],
  },
  {
    id: 'dsa-2',
    question: 'How do you find the middle element of a linked list in one pass?',
    category: 'dsa',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'Use two pointers: slow moves one node at a time and fast moves two. When fast reaches the end, slow is at the middle.',
    tips: ['Describe two-pointer technique', 'Note edge cases for even-length lists'],
  },
  {
    id: 'dsa-3',
    question: 'Describe a binary search algorithm and when to use it.',
    category: 'dsa',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'Binary search divides a sorted array by half each step. Use it when the data is sorted and you need O(log n) lookup time.',
    tips: ['Mention sorted input', 'Outline divide-and-conquer', 'State complexity'],
  },
  {
    id: 'dsa-4',
    question: 'What is the difference between depth-first and breadth-first search?',
    category: 'dsa',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'DFS explores as far as possible along each branch before backtracking. BFS explores level by level. Use DFS for path finding and backtracking, BFS for shortest path in unweighted graphs.',
    tips: ['Compare traversal order', 'Mention use cases'],
  },
  {
    id: 'dsa-5',
    question: 'How would you detect a cycle in a directed graph?',
    category: 'dsa',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Use DFS with recursion stack tracking or maintain node colors. If you revisit a node on the recursion stack, a cycle exists.',
    tips: ['Explain cycle detection', 'Talk about visited vs recursion stack'],
  },
  {
    id: 'dsa-6',
    question: 'Explain the time complexity of quicksort and when it performs poorly.',
    category: 'dsa',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Average and best case are O(n log n). Worst case is O(n^2) when pivots are poorly chosen, such as an already sorted array without randomization.',
    tips: ['Discuss average vs worst case', 'Mention pivot selection strategies'],
  },
  {
    id: 'dsa-7',
    question: 'How can dynamic programming improve a naive recursive approach?',
    category: 'dsa',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Dynamic programming caches results of overlapping subproblems to avoid repeated work. Use memoization or bottom-up tabulation for faster execution.',
    tips: ['Describe memoization', 'Use an example like Fibonacci or knapsack'],
  },
  {
    id: 'dsa-8',
    question: 'What data structure would you use for implementing an autocomplete feature?',
    category: 'dsa',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'A trie is ideal because it compactly stores prefixes and allows fast prefix-based lookup. Combine it with frequency counts for ranking suggestions.',
    tips: ['Explain tries', 'Mention prefix matching'],
  },
  {
    id: 'dsa-9',
    question: 'How do you find the first non-repeating character in a string?',
    category: 'dsa',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'Count character occurrences with a hash map, then iterate again to find the first character with count one.',
    tips: ['Mention hash maps', 'Discuss two-pass solution'],
  },
  {
    id: 'dsa-10',
    question: 'Explain how a priority queue works and one use case.',
    category: 'dsa',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'A priority queue returns elements based on priority ordering rather than insertion order. Use it for Dijkstra’s algorithm or scheduling tasks.',
    tips: ['Describe heap behavior', 'Give a clear use case'],
  },
  {
    id: 'dsa-11',
    question: 'How would you reverse a linked list?',
    category: 'dsa',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Iteratively move through the list, reversing pointers by keeping track of previous and current nodes until the end.',
    tips: ['Outline steps clearly', 'Mention pointer updates'],
  },
  {
    id: 'dsa-12',
    question: 'Describe a greedy algorithm and give an example.',
    category: 'dsa',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'A greedy algorithm makes the locally optimal choice at each step. Example: coin change with canonical coin systems or interval scheduling.',
    tips: ['Define greedy', 'Provide an example'],
  },
  {
    id: 'dsa-13',
    question: 'What is a hash table and how do collisions get handled?',
    category: 'dsa',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'A hash table maps keys to array indices with a hash function. Collisions can be handled using chaining or open addressing.',
    tips: ['Explain hash map structure', 'Mention collision handling'],
  },
  {
    id: 'dsa-14',
    question: 'How would you merge two sorted arrays?',
    category: 'dsa',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'Use two pointers and append the smaller current element from either array until one array is exhausted, then append the remaining elements.',
    tips: ['Describe merge step', 'Mention time complexity O(n + m)'],
  },
  {
    id: 'dsa-15',
    question: 'Explain how you would solve the two-sum problem efficiently.',
    category: 'dsa',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'Use a hash map to record needed complements while iterating. This gives O(n) time instead of O(n^2) brute-force.',
    tips: ['Mention hash lookup', 'Highlight time savings'],
  },

  // Behavioral Questions
  {
    id: 'behavioral-1',
    question: 'Tell me about a time when you had to work with a difficult team member.',
    category: 'behavioral',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Use STAR method: Situation - I was working on X project, Task - had conflict with colleague about Y, Action - communicated clearly, listened to their perspective, found common ground, Result - completed project successfully.',
    tips: ['Use STAR method', 'Be honest but professional', 'Show conflict resolution'],
  },
  {
    id: 'behavioral-2',
    question: 'Describe a time when you had to meet a tight deadline.',
    category: 'behavioral',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'Explain the situation, how you prioritized work, communicated with stakeholders, and delivered the project without sacrificing quality.',
    tips: ['Show planning skills', 'Mention communication', 'Keep the story concise'],
  },
  {
    id: 'behavioral-3',
    question: 'How do you handle feedback that you disagree with?',
    category: 'behavioral',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I listen carefully, ask clarifying questions, and evaluate the feedback objectively before responding. I focus on what I can learn rather than reacting emotionally.',
    tips: ['Show openness', 'Mention growth mindset'],
  },
  {
    id: 'behavioral-4',
    question: 'Tell me about a time you made a mistake and how you handled it.',
    category: 'behavioral',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Describe the mistake, take responsibility, explain the corrective actions, and share what you learned to prevent it happening again.',
    tips: ['Be accountable', 'Focus on learning'],
  },
  {
    id: 'behavioral-5',
    question: 'Give an example of when you led a team successfully.',
    category: 'behavioral',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Talk about setting goals, delegating tasks, motivating the team, and achieving the desired outcome through collaboration.',
    tips: ['Mention leadership', 'Highlight results'],
  },
  {
    id: 'behavioral-6',
    question: 'How do you prioritize tasks when everything feels urgent?',
    category: 'behavioral',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I assess impact, deadlines, and dependencies, then communicate trade-offs and focus on the most important work first.',
    tips: ['Show prioritization skills', 'Mention communication'],
  },
  {
    id: 'behavioral-7',
    question: 'Describe a situation where you helped improve a process.',
    category: 'behavioral',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Explain the existing process, the inefficiency you identified, the change you introduced, and the measurable improvement that followed.',
    tips: ['Give concrete impact', 'Focus on improvement'],
  },
  {
    id: 'behavioral-8',
    question: 'How do you stay motivated during long or difficult projects?',
    category: 'behavioral',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I break work into smaller goals, celebrate milestones, and stay connected to the overall purpose of the project.',
    tips: ['Mention goal setting', 'Emphasize resilience'],
  },
  {
    id: 'behavioral-9',
    question: 'Tell me about a time you had to learn something quickly.',
    category: 'behavioral',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'Describe the context, how you gathered resources, and how you applied the new knowledge to solve the problem.',
    tips: ['Show learning ability', 'Give a specific example'],
  },
  {
    id: 'behavioral-10',
    question: 'What is your biggest professional accomplishment so far?',
    category: 'behavioral',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Talk about a meaningful outcome, your role, the challenge you overcame, and the business impact.',
    tips: ['Be specific', 'Quantify impact if possible'],
  },
  {
    id: 'behavioral-11',
    question: 'How do you handle shared ownership of a project?',
    category: 'behavioral',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I communicate clearly, align on responsibilities, and stay accountable for my part while supporting teammates.',
    tips: ['Mention teamwork', 'Highlight communication'],
  },
  {
    id: 'behavioral-12',
    question: 'Describe a time you adapted to a major change at work.',
    category: 'behavioral',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Explain the change, how you stayed flexible, and what you did to ensure the team remained productive.',
    tips: ['Illustrate adaptability', 'Keep focus on outcomes'],
  },
  {
    id: 'behavioral-13',
    question: 'What do you do when priorities shift mid-project?',
    category: 'behavioral',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I reevaluate the plan, communicate the new priorities, and adjust timelines while managing stakeholder expectations.',
    tips: ['Mention flexibility', 'Show calm under pressure'],
  },
  {
    id: 'behavioral-14',
    question: 'How do you handle burnout or stress?',
    category: 'behavioral',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I prioritize rest, manage my workload, and speak up when I need support or a better balance.',
    tips: ['Be honest', 'Talk about self-care'],
  },
  {
    id: 'behavioral-15',
    question: 'Describe a time when you helped a teammate improve.',
    category: 'behavioral',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Share how you mentored them, provided feedback, and helped them grow their skills or confidence.',
    tips: ['Highlight mentorship', 'Show positive impact'],
  },

  // System Design Questions
  {
    id: 'system-design-1',
    question: 'Design a system to handle rate limiting for an API.',
    category: 'system-design',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Use Token Bucket algorithm or Sliding Window. Store in Redis for fast access. Return 429 status code when limit exceeded. Consider user-level vs global limits.',
    tips: ['Discuss algorithm choice', 'Talk about data structures', 'Consider edge cases'],
  },
  {
    id: 'system-design-2',
    question: 'How would you design a scalable chat application?',
    category: 'system-design',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Use WebSockets or long polling, partition chat rooms across servers, use message queues for delivery, and persist messages in a database with a caching layer.',
    tips: ['Talk about real-time delivery', 'Mention storage and scaling'],
  },
  {
    id: 'system-design-3',
    question: 'Design a URL shortening service.',
    category: 'system-design',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Generate short keys, store mappings in a database, use caching for redirects, and include analytics with click tracking.',
    tips: ['Cover key generation', 'Mention storage and caching'],
  },
  {
    id: 'system-design-4',
    question: 'How would you design a searchable product catalog?',
    category: 'system-design',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Use an inverted index or search engine like Elasticsearch, normalize product data, and support filters with caching for frequent queries.',
    tips: ['Discuss search indexing', 'Mention filtering and performance'],
  },
  {
    id: 'system-design-5',
    question: 'Explain how to design a notification service for mobile and email alerts.',
    category: 'system-design',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Create a message broker, use separate workers for each channel, support retries, and store user preferences for notification settings.',
    tips: ['Cover async processing', 'Mention failover and retries'],
  },
  {
    id: 'system-design-6',
    question: 'Design a system to store and query time-series metrics.',
    category: 'system-design',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Use a time-series database, shard by metric or source, compress older data, and provide rollups for efficient querying.',
    tips: ['Mention data retention', 'Discuss query optimization'],
  },
  {
    id: 'system-design-7',
    question: 'How would you design a file upload service?',
    category: 'system-design',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Use signed URLs for direct uploads, validate file types, store metadata in a database, and use object storage with CDN delivery.',
    tips: ['Mention security', 'Discuss storage strategy'],
  },
  {
    id: 'system-design-8',
    question: 'Describe a design for a recommendation engine.',
    category: 'system-design',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Combine collaborative filtering and content-based filtering, use pipelines to preprocess data, and serve recommendations with caching.',
    tips: ['Mention algorithms', 'Discuss data pipeline'],
  },
  {
    id: 'system-design-9',
    question: 'How would you architect an e-commerce checkout flow?',
    category: 'system-design',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Separate services for cart, payment, inventory, and order fulfillment. Use event-driven messaging and ensure idempotent payment processing.',
    tips: ['Cover service boundaries', 'Mention reliability'],
  },
  {
    id: 'system-design-10',
    question: 'Explain how to design a logging and monitoring system.',
    category: 'system-design',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Collect logs centrally, index them for queries, add metrics and alerting, and ensure retention policies for compliance.',
    tips: ['Mention observability', 'Discuss alerting'],
  },
  {
    id: 'system-design-11',
    question: 'How would you design a recommendation for offline use?',
    category: 'system-design',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Use local storage, sync changes when online, and provide conflict resolution. Keep the offline footprint small with essential functionality.',
    tips: ['Mention sync strategy', 'Discuss consistency'],
  },
  {
    id: 'system-design-12',
    question: 'Design a system to support millions of chat users.',
    category: 'system-design',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Scale with sharded messaging servers, use presence services, and persist chat in a durable store while caching recent conversations.',
    tips: ['Mention sharding', 'Discuss user presence'],
  },
  {
    id: 'system-design-13',
    question: 'What are the key components of a high-availability architecture?',
    category: 'system-design',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Use redundancy, failover, load balancing, health checks, and automated recovery to minimize downtime.',
    tips: ['Define high availability', 'Mention failover mechanisms'],
  },
  {
    id: 'system-design-14',
    question: 'How would you design a global file storage system?',
    category: 'system-design',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Use multi-region storage, strong consistency where needed, caching at the edge, and versioning for concurrency control.',
    tips: ['Mention global distribution', 'Discuss consistency trade-offs'],
  },
  {
    id: 'system-design-15',
    question: 'Explain how you would architect a livestream platform.',
    category: 'system-design',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Use streaming servers, CDN edge delivery, adaptive bitrate streaming, and separate signaling for chat and engagement.',
    tips: ['Mention streaming delivery', 'Discuss scaling'],
  },

  // HR Questions
  {
    id: 'hr-1',
    question: 'How would you promote a positive team culture in a fast-paced project?',
    category: 'hr',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Talk about open communication, setting clear expectations, celebrating small wins, and listening to feedback. Show empathy and examples of how you supported teammates under pressure.',
    tips: ['Highlight communication', 'Mention collaboration', 'Stay positive and sincere'],
  },
  {
    id: 'hr-2',
    question: 'What motivates you to do your best work?',
    category: 'hr',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I enjoy solving problems, learning new technologies, and working with supportive teams. I am motivated by impact and continuous improvement.',
    tips: ['Be authentic', 'Connect motivation to work'],
  },
  {
    id: 'hr-3',
    question: 'How do you handle feedback from your manager?',
    category: 'hr',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I listen carefully, ask clarifying questions, and implement changes where needed. Feedback helps me grow professionally.',
    tips: ['Show openness', 'Mention follow-through'],
  },
  {
    id: 'hr-4',
    question: 'Why are you interested in this role?',
    category: 'hr',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Share what excites you about the company, the team, and how the role aligns with your skills and growth goals.',
    tips: ['Be specific to the role', 'Show enthusiasm'],
  },
  {
    id: 'hr-5',
    question: 'Tell me about a time you had to make a difficult decision.',
    category: 'hr',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Describe the context, your thought process, and how you balanced trade-offs to choose the best path.',
    tips: ['Explain reasoning', 'Highlight ownership'],
  },
  {
    id: 'hr-6',
    question: 'How do you prioritize personal and team goals?',
    category: 'hr',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I align my tasks with team objectives, communicate dependencies, and adjust priorities as needed to support shared success.',
    tips: ['Show alignment', 'Mention communication'],
  },
  {
    id: 'hr-7',
    question: 'What is your greatest strength?',
    category: 'hr',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I am strong at learning quickly and adapting to new challenges. I stay organized and focused on delivering quality work.',
    tips: ['Pick a real strength', 'Relate it to the role'],
  },
  {
    id: 'hr-8',
    question: 'What is your biggest weakness and how do you manage it?',
    category: 'hr',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I can be over-committed, so I use prioritization and weekly planning to stay on track and avoid burnout.',
    tips: ['Be honest', 'Show improvement'],
  },
  {
    id: 'hr-9',
    question: 'How do you support diversity and inclusion in a team?',
    category: 'hr',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I listen to different perspectives, create equal opportunities for input, and encourage respectful collaboration.',
    tips: ['Mention inclusion', 'Use concrete examples'],
  },
  {
    id: 'hr-10',
    question: 'Where do you see yourself in five years?',
    category: 'hr',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I see myself growing in a role where I can contribute more leadership, deliver impactful solutions, and continue learning.',
    tips: ['Be realistic', 'Show ambition'],
  },
  {
    id: 'hr-11',
    question: 'How do you handle disagreement with your manager?',
    category: 'hr',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I discuss the issue respectfully, provide data or reasoning, and seek shared understanding while staying aligned with business goals.',
    tips: ['Emphasize respect', 'Mention problem-solving'],
  },
  {
    id: 'hr-12',
    question: 'Describe a time you helped onboard a new colleague.',
    category: 'hr',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I introduced them to the team, shared documentation, and paired with them on the first tasks to help them ramp up quickly.',
    tips: ['Highlight mentorship', 'Focus on support'],
  },
  {
    id: 'hr-13',
    question: 'How do you stay productive when working remotely?',
    category: 'hr',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I set regular routines, keep clear communication, and use tools to stay organized and connected with teammates.',
    tips: ['Mention routines', 'Talk about communication'],
  },
  {
    id: 'hr-14',
    question: 'How have you handled a situation with unclear requirements?',
    category: 'hr',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I asked clarifying questions, validated assumptions with stakeholders, and iterated on a small prototype to reduce uncertainty.',
    tips: ['Mention questions', 'Show iteration'],
  },
  {
    id: 'hr-15',
    question: 'What does success look like for you in a team?',
    category: 'hr',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'Success means delivering quality work together, learning from each other, and supporting the team’s goals consistently.',
    tips: ['Be team-oriented', 'Keep it balanced'],
  },

  // Frontend Questions
  {
    id: 'frontend-1',
    question: 'How do you optimize a React application for performance?',
    category: 'frontend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Use memoization with React.memo and useMemo, avoid unnecessary re-renders, lazy-load components, and keep component state minimal. Also optimize assets and use a CDN for static files.',
    tips: ['Mention React hooks', 'Discuss re-rendering', 'Talk about lazy loading'],
  },
  {
    id: 'frontend-2',
    question: 'What is the virtual DOM and why is it useful?',
    category: 'frontend',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'The virtual DOM is a lightweight copy of the real DOM that React uses to batch updates efficiently and minimize direct DOM manipulations.',
    tips: ['Explain diffing', 'Mention performance benefits'],
  },
  {
    id: 'frontend-3',
    question: 'How do you make a web page accessible?',
    category: 'frontend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Use semantic HTML, provide alt text, ensure keyboard navigation, and follow ARIA best practices for interactive elements.',
    tips: ['Mention semantic HTML', 'Talk about keyboard access'],
  },
  {
    id: 'frontend-4',
    question: 'Explain CSS specificity and how it works.',
    category: 'frontend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Specificity is calculated from IDs, classes, and element selectors. More specific rules override less specific ones unless !important is used.',
    tips: ['Describe selector hierarchy', 'Mention common pitfalls'],
  },
  {
    id: 'frontend-5',
    question: 'How do you handle responsive design?',
    category: 'frontend',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'Use fluid layouts, media queries, responsive images, and mobile-first design principles.',
    tips: ['Mention breakpoints', 'Talk about mobile-first'],
  },
  {
    id: 'frontend-6',
    question: 'What is the event loop in JavaScript?',
    category: 'frontend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'The event loop manages asynchronous callbacks by processing the call stack and message queue. It ensures non-blocking behavior for IO and timers.',
    tips: ['Explain call stack and queue', 'Mention async callbacks'],
  },
  {
    id: 'frontend-7',
    question: 'How would you improve front-end performance in production?',
    category: 'frontend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Minify assets, use tree shaking, lazy load components, compress responses, and use browser caching.',
    tips: ['Mention build optimizations', 'Discuss caching'],
  },
  {
    id: 'frontend-8',
    question: 'Describe how CSS grid differs from flexbox.',
    category: 'frontend',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'Grid is for two-dimensional layouts, rows and columns. Flexbox is for one-dimensional layout along a single axis.',
    tips: ['Compare use cases', 'Give simple examples'],
  },
  {
    id: 'frontend-9',
    question: 'What is progressive web app (PWA) and why use it?',
    category: 'frontend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'PWA provides offline support, installability, and better mobile UX through service workers and app manifests.',
    tips: ['Mention offline support', 'Talk about installability'],
  },
  {
    id: 'frontend-10',
    question: 'How do you test frontend components?',
    category: 'frontend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Use unit tests for logic, integration tests for component behavior, and end-to-end tests for user flows with tools like Jest and React Testing Library.',
    tips: ['Mention testing levels', 'Use actual tools'],
  },
  {
    id: 'frontend-11',
    question: 'Explain the importance of web performance metrics like LCP and CLS.',
    category: 'frontend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'LCP measures loading speed, CLS measures layout stability. Both are important for user experience and search ranking.',
    tips: ['Define metrics', 'Connect to UX'],
  },
  {
    id: 'frontend-12',
    question: 'How do you avoid layout shift in a web page?',
    category: 'frontend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Reserve space for images and ads, avoid inserting content above existing elements, and use stable dimensions.',
    tips: ['Mention reserved space', 'Talk about CLS'],
  },
  {
    id: 'frontend-13',
    question: 'What is the difference between client-side and server-side rendering?',
    category: 'frontend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Client-side rendering renders content in the browser, server-side rendering renders HTML on the server. SSR is better for SEO and initial load time.',
    tips: ['Compare both approaches', 'Mention SEO benefits'],
  },
  {
    id: 'frontend-14',
    question: 'How do you secure frontend applications?',
    category: 'frontend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Validate input, avoid storing secrets in the browser, use HTTPS, and protect against XSS by sanitizing and escaping user-generated content.',
    tips: ['Mention input validation', 'Discuss security best practices'],
  },
  {
    id: 'frontend-15',
    question: 'Describe a performant way to animate UI elements.',
    category: 'frontend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Use CSS transforms and opacity with hardware acceleration, avoid layout-triggering properties, and keep animation durations intuitive.',
    tips: ['Use transforms', 'Avoid expensive properties'],
  },

  // Backend Questions
  {
    id: 'backend-1',
    question: 'How would you design a microservice to scale and handle failure?',
    category: 'backend',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Use containerization, decoupled services, load balancing, circuit breakers, and health checks. Store state externally, use caching for read-heavy workloads, and monitor metrics for failures.',
    tips: ['Discuss fault tolerance', 'Mention scaling strategies', 'Refer to monitoring and retries'],
  },
  {
    id: 'backend-2',
    question: 'What is an API gateway and why would you use one?',
    category: 'backend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'An API gateway centralizes request routing, authentication, rate limiting, and monitoring between clients and backend services.',
    tips: ['Explain responsibilities', 'Mention benefits'],
  },
  {
    id: 'backend-3',
    question: 'How do you design a caching strategy for a read-heavy service?',
    category: 'backend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Use caching at the edge and application layer, set TTLs, invalidate on updates, and choose between cache-aside or write-through patterns.',
    tips: ['Mention invalidation', 'Discuss TTL'],
  },
  {
    id: 'backend-4',
    question: 'Explain the difference between SQL and NoSQL databases.',
    category: 'backend',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'SQL databases are relational and good for structured data and transactions. NoSQL databases are more flexible for unstructured or scale-out workloads.',
    tips: ['Compare structure', 'Mention use cases'],
  },
  {
    id: 'backend-5',
    question: 'How do you ensure data consistency in distributed systems?',
    category: 'backend',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Use strong consistency only where needed, apply distributed transactions or eventual consistency with conflict resolution, and use consensus protocols when required.',
    tips: ['Mention trade-offs', 'Discuss consistency models'],
  },
  {
    id: 'backend-6',
    question: 'Describe a message queue and when to use it.',
    category: 'backend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'A message queue decouples producers and consumers, enabling asynchronous processing and better resilience under load.',
    tips: ['Give use case', 'Explain decoupling'],
  },
  {
    id: 'backend-7',
    question: 'What is database sharding and why is it used?',
    category: 'backend',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Sharding partitions database data across multiple machines to improve scalability and reduce single-node load.',
    tips: ['Explain partitioning', 'Mention scalability benefits'],
  },
  {
    id: 'backend-8',
    question: 'How would you design authentication for a REST API?',
    category: 'backend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Use JWT or session tokens, secure transport with HTTPS, validate tokens on each request, and apply least privilege access.',
    tips: ['Mention token validation', 'Talk about HTTPS'],
  },
  {
    id: 'backend-9',
    question: 'How do you handle database migrations in production?',
    category: 'backend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Use versioned migration scripts, test migrations safely, and deploy with migration tools that support rollbacks.',
    tips: ['Mention testing', 'Discuss rollback planning'],
  },
  {
    id: 'backend-10',
    question: 'What is circuit breaking and why does it matter?',
    category: 'backend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Circuit breakers stop repeated calls to failing services, preventing cascading failures and enabling recovery once systems stabilize.',
    tips: ['Define circuit breaker', 'Mention resilience'],
  },
  {
    id: 'backend-11',
    question: 'How do you log and monitor backend services effectively?',
    category: 'backend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Collect structured logs, metrics, and traces, centralize them, and create alerts for key failure conditions.',
    tips: ['Mention observability', 'Discuss alerting'],
  },
  {
    id: 'backend-12',
    question: 'Explain eventual consistency.',
    category: 'backend',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Eventual consistency means updates propagate asynchronously and all replicas converge over time, trading immediate consistency for availability and partition tolerance.',
    tips: ['Define the concept', 'Discuss trade-offs'],
  },
  {
    id: 'backend-13',
    question: 'How do you design an API versioning strategy?',
    category: 'backend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Use versioned routes or headers, keep old versions supported during migration, and avoid breaking changes when possible.',
    tips: ['Mention backward compatibility', 'Discuss version formats'],
  },
  {
    id: 'backend-14',
    question: 'What is load balancing and how does it help?',
    category: 'backend',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'Load balancing distributes traffic across servers to improve availability and throughput.',
    tips: ['Explain distribution', 'Mention health checks'],
  },
  {
    id: 'backend-15',
    question: 'How do you design a backend for low-latency data access?',
    category: 'backend',
    difficulty: 'Hard',
    company: null,
    sampleAnswer:
      'Use caching, fast storage, optimized queries, and locality-aware data placement to reduce response times.',
    tips: ['Mention caching', 'Talk about query optimization'],
  },

  // Communication Questions
  {
    id: 'communication-1',
    question: 'What is your approach to explaining technical work to a non-technical stakeholder?',
    category: 'communication',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I focus on outcomes and use simple language. I explain the problem, why the work matters, and how it helps the business, avoiding jargon unless needed.',
    tips: ['Keep explanations simple', 'Use impact statements', 'Connect to business goals'],
  },
  {
    id: 'communication-2',
    question: 'How do you handle unclear requirements?',
    category: 'communication',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I ask clarifying questions, summarize what I heard, and confirm expectations before starting work.',
    tips: ['Mention active listening', 'Highlight clarification'],
  },
  {
    id: 'communication-3',
    question: 'Describe how you would present a project update to leadership.',
    category: 'communication',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I would focus on goals, progress, risks, and next steps, keeping the message concise and actionable.',
    tips: ['Mention structure', 'Be concise'],
  },
  {
    id: 'communication-4',
    question: 'How do you give constructive feedback to a peer?',
    category: 'communication',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I stay specific, focus on behavior rather than personality, and offer suggestions to improve.',
    tips: ['Be specific', 'Stay positive'],
  },
  {
    id: 'communication-5',
    question: 'How do you ensure everyone on the team is aligned?',
    category: 'communication',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I share clear goals, document decisions, and follow up with regular check-ins.',
    tips: ['Mention documentation', 'Highlight check-ins'],
  },
  {
    id: 'communication-6',
    question: 'How do you adapt your communication for remote teams?',
    category: 'communication',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I use more written updates, schedule regular syncs, and over-communicate expectations and progress.',
    tips: ['Mention remote tools', 'Discuss clarity'],
  },
  {
    id: 'communication-7',
    question: 'Describe a time you resolved a conflict through communication.',
    category: 'communication',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I listened to both sides, found common ground, and proposed a solution that addressed the key concerns.',
    tips: ['Show empathy', 'Focus on resolution'],
  },
  {
    id: 'communication-8',
    question: 'How do you explain a technical risk to a business stakeholder?',
    category: 'communication',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I describe the impact in plain language and propose mitigation options with trade-offs.',
    tips: ['Avoid jargon', 'Discuss impact'],
  },
  {
    id: 'communication-9',
    question: 'How do you capture feedback from cross-functional teams?',
    category: 'communication',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I use surveys, meetings, and direct conversations, then consolidate the input into clear action items.',
    tips: ['Mention tools', 'Highlight organization'],
  },
  {
    id: 'communication-10',
    question: 'How do you handle misunderstandings in your team?',
    category: 'communication',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I clarify assumptions quickly, verify understanding, and correct the course with clear next steps.',
    tips: ['Emphasize speed', 'Mention verification'],
  },
  {
    id: 'communication-11',
    question: 'How would you explain a new feature to a customer?',
    category: 'communication',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I describe the benefit first, then explain how it works in simple terms without technical jargon.',
    tips: ['Focus on benefits', 'Simplify the message'],
  },
  {
    id: 'communication-12',
    question: 'What techniques do you use to listen actively?',
    category: 'communication',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I paraphrase, ask questions, and pay attention to tone and meaning rather than just words.',
    tips: ['Mention paraphrasing', 'Highlight focus'],
  },
  {
    id: 'communication-13',
    question: 'How do you keep stakeholders informed during a project?',
    category: 'communication',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I share periodic status updates, raise risks early, and provide clear progress summaries.',
    tips: ['Mention frequency', 'Discuss clarity'],
  },
  {
    id: 'communication-14',
    question: 'How do you build trust with a new team?',
    category: 'communication',
    difficulty: 'Easy',
    company: null,
    sampleAnswer:
      'I listen, follow through on commitments, and communicate honestly about challenges and progress.',
    tips: ['Mention reliability', 'Highlight transparency'],
  },
  {
    id: 'communication-15',
    question: 'Describe how you teach a complex concept to a beginner.',
    category: 'communication',
    difficulty: 'Medium',
    company: null,
    sampleAnswer:
      'I break it into simple parts, use analogies, and check understanding before moving on.',
    tips: ['Use analogies', 'Check for understanding'],
  },
];
