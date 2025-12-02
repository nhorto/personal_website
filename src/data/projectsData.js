// Project data for portfolio
// Edit descriptions, categories, and other details here

export const projectsData = [
  {
    id: 'nba-prediction',
    title: 'NBA Game Prediction',
    slug: 'nba-prediction',
    shortDescription: 'Machine learning system that predicts NBA game outcomes using historical data, advanced statistics, and ELO ratings.',
    fullDescription: `Basketball is one of my passions and this has been a really fun project to work on. 
    I built a ensemble that predicts NBA game outcomes using historical results, advanced statistics, 
    and used the ELO rating model (I have a description of what the ELO ratings are on GitHub). The current version hits around 69% accuracy, clearly beating the baselines 
    and giving a realistic sense of how far you can push this kind of problem with careful feature engineering.
    Behind the scenes, I wrote an NBA API wrapper with automatic retry logic and rate limiting, plus a data pipeline that turns 
    raw box scores into model-ready features. The system tracks team strength over time using ELO, adds context like home-court 
    advantage, how good or bad a team is playing (rolling 5-game windows), and even accounts for player availability.

This is an ongoing project that I revisit when I have time — the latest experiments and model comparisons are in the game_predictions notebook on GitHub`,
    categories: ['Machine Learning', 'Sports Analytics', 'Predictive Modeling', 'Python'],
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'NumPy', 'NBA API'],
    githubUrl: 'https://github.com/nhorto/NBA',
    featured: true,
    image: '/placeholder-nba.svg', // Update with actual image path
    achievements: [
      'Increased prediction accuracy to ~69%, outperforming a baseline model by ~12 percentage points',
      'Implemented an ensemble learning approach that consistently outperformed standalone models in predictive accuracy.',
      'Built a robust NBA data pipeline with API rate limiting, retries, and feature engineering'
    ]
  },
  {
    id: 'solar-forecasting',
    title: 'Solar Power Forecasting',
    slug: 'solar-forecasting',
    shortDescription: 'Ensemble ML system that predicts photovoltaic power generation three hours in advance using XGBoost and LSTM models.',
    fullDescription: `For my Master’s in Data Science capstone, I partnered with an energy-tech startup to develop a short-term solar power forecasting system. I worked directly with the stakeholder to define requirements, translate research into modeling decisions, and deliver a solution designed for real operational workflows.
Using minute-level inverter and weather data, I built a full preprocessing pipeline to handle missing values, outliers, resampling, and feature engineering (lags, rolling statistics, and time-based signals). To maximize forecasting accuracy, I designed a multi-model ensemble that combines an LSTM, an XGBoost model, a Ridge blending meta-model, and a residual-correction model. This architecture captures both short-term temporal patterns and broader nonlinear trends, outperforming each individual model.`,
    categories: ['Machine Learning', 'Deep Learning', 'Time Series', 'Energy Forecasting'],
    technologies: ['Python', 'XGBoost', 'LSTM', 'TensorFlow', 'Pandas', 'NumPy'],
    githubUrl: 'https://github.com/nhorto/Capstone',
    featured: true,
    image: '/placeholder-solar.svg', // Update with actual image path
    achievements: [
      'Developed a hybrid forecasting system combining LSTM, XGBoost, Ridge blending, and a residual-correction model.',
      'Engineered a minute-level data pipeline handling outliers, gaps, and multiple sensor streams',
      'Collaborated directly with a startup stakeholder, converting business requirements into a deployable forecasting solution.'
    ]
  },
  {
    id: 'poverty-education-viz',
    title: 'School Funding & Poverty Analysis',
    slug: 'poverty-education-viz',
    shortDescription: 'Interactive D3.js dashboard exploring the correlation between educational funding and student poverty across U.S. school districts.',
    fullDescription: `This project explores how well school funding keeps up with student poverty across U.S. districts using an interactive D3.js dashboard. To make the problem more concrete, I introduced the Poverty Sensitivity Index (PSI): revenue per student divided by poverty rate, which helps highlight districts that stretch their dollars versus those that may be under-serving higher-poverty students.

The dashboard includes an interactive choropleth map, drill-down district views, and comparison charts that make it easy to spot regional patterns and outliers. Users can move from a national overview down to specific districts and see how funding and poverty interact.

Under the hood, the project pulls together multiple public datasets, including the Urban Institute Education Data API, SAIPE poverty estimates, and Census Bureau district boundaries. The end result is a tool that's approachable for non-technical users but still grounded in solid data work.`,
    categories: ['Data Visualization', 'Geospatial Analysis', 'D3.js', 'Public Policy'],
    technologies: ['Python', 'D3.js', 'GeoPandas', 'Pandas', 'GeoJSON', 'JavaScript'],
    githubUrl: 'https://github.com/nhorto/Data-Viz-PSI',
    demoUrl: 'https://data-viz-psi.vercel.app',
    featured: false,
    image: '/placeholder-education.svg', // Update with actual image path
    achievements: [
      'Communicated findings through a clear visual narrative, highlighting equity gaps and regional disparities in how funding responds to student need.',
      'Built an interactive D3.js dashboard with map, drill-down, and comparison views.',
      'Integrated and cleaned multiple public datasets (Urban Institute API, SAIPE, and Census shapefiles) into a unified geospatial data model for analysis and visualization.'
    ]
  },
  {
    id: 'hotel-nlp-analysis',
    title: 'Hotel Analysis with NLP',
    slug: 'hotel-nlp-analysis',
    shortDescription: 'Natural language processing system analyzing Italian hotels through topic modeling and sentiment analysis of guest reviews.',
    fullDescription: `This project analyzes hotels across major Italian cities by combining geographic data, NLP, and machine learning to evaluate location quality and customer experience. I built a full data pipeline that collects hotel and landmark information using the Google Places API, computes proximity-based location scores, and performs topic modeling (LDA) and sentiment analysis (VADER) on thousands of hotel reviews.
The analysis produces a multi-dimensional profile for each hotel — capturing its geographic advantage, dominant review themes, and customer sentiment — enabling richer comparisons than ratings alone. The system is fully reproducible and scalable to all major Italian cities.`,
    categories: ['Machine Learning', 'NLP', 'Sentiment Analysis', 'Topic Modeling'],
    technologies: ['Python', 'Scikit-learn', 'spaCy', 'Gensim', 'NLTK', 'Google Places API'],
    githubUrl: 'https://github.com/nhorto/ML-Final-Project',
    featured: false,
    image: '/placeholder-hotel.svg', // Update with actual image path
    achievements: [
      'Topic modeling with LDA on customer reviews',
      'Multi-factor hotel scoring system',
      'Geospatial proximity analysis'
    ]
  },
  {
    id: 'cork-and-note',
    title: 'Cork & Note',
    slug: 'cork-and-note',
    shortDescription: 'A cross-platform wine-tracking app built with React Native and Expo.',
    fullDescription: `Cork & Note is a mobile app I built for myself and my girlfriend to track the wineries we visit in Virginia and the wines we try at each one. I started the project right after finishing my data science master's program, with almost no frontend or React Native experience, and used it as a way to learn mobile development while creating something meaningful to us.
The app is built with React Native and Expo, which allowed me to ship it quickly on iOS, Android, and the web from a single codebase. It includes features for logging winery visits, rating wines, and keeping notes so we can look back on what we enjoyed.

Feel free to check out the web-app version to see what the app is like. It’s mainly built for mobile, so the web version has a few rough edges, but it should give you a good idea of the design and functionality. There is a login screen, 
but it’s only a placeholder. You can enter anything for the email address and password and still log in—it’s just there to show the flow.`,
    categories: ['Mobile Development', 'React Native', 'Expo', 'Frontend'],
    technologies: ['React Native', 'Expo', 'JavaScript', 'Node.js'],
    githubUrl: 'https://github.com/nhorto/cork-and-note',
    demoUrl: 'https://cork-and-note-sigma.vercel.app',
    featured: true,
    image: '/placeholder-mobile.svg', // Update with actual image path
    achievements: [
      'Built a cross-platform mobile app (iOS, Android, Web) using React Native and Expo.',
      'Designed a smooth UI for logging winery visits, rating wines, and saving tasting notes.',
      'Learned frontend development from scratch by building a real, end-to-end product.'
    ]
  }
];

// Get all unique categories for filtering
export const getAllCategories = () => {
  const categories = new Set();
  projectsData.forEach(project => {
    project.categories.forEach(category => categories.add(category));
  });
  return Array.from(categories).sort();
};

// Get featured projects for home page
export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured);
};

// Get project by slug
export const getProjectBySlug = (slug) => {
  return projectsData.find(project => project.slug === slug);
};
