// Project data for portfolio
// Edit descriptions, categories, and other details here

export const projectsData = [
  {
    id: 'nba-prediction',
    title: 'NBA Game Prediction',
    slug: 'nba-prediction',
    shortDescription: 'Machine learning system that predicts NBA game outcomes using historical data, advanced statistics, and ELO ratings.',
    fullDescription: `This machine learning project predicts NBA game outcomes by analyzing historical game data, advanced statistics, and ELO ratings. The system achieves approximately 69% accuracy, significantly outperforming baseline prediction methods.

The project features a custom NBA API wrapper with automatic retry logic and rate limiting, a sophisticated data preprocessing pipeline that transforms raw box scores into ML-ready features, and an ELO rating system that dynamically tracks team strength over time.

Key innovations include home court advantage modeling, rolling averages using a 5-game window, and player availability tracking. Multiple models were tested, with Logistic Regression achieving the best single-model performance at 66% accuracy, compared to a baseline of 57.2%.`,
    categories: ['Machine Learning', 'Sports Analytics', 'Predictive Modeling', 'Python'],
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'NumPy', 'NBA API'],
    githubUrl: 'https://github.com/nhorto/NBA',
    featured: true,
    image: '/placeholder-nba.svg', // Update with actual image path
    achievements: [
      '69% prediction accuracy',
      'Custom ELO rating system implementation',
      'Outperformed baseline by 12%'
    ]
  },
  {
    id: 'solar-forecasting',
    title: 'Solar Power Forecasting',
    slug: 'solar-forecasting',
    shortDescription: 'Ensemble ML system that predicts photovoltaic power generation three hours in advance using XGBoost and LSTM models.',
    fullDescription: `This capstone project develops a sophisticated machine learning ensemble system for predicting photovoltaic power generation three hours in advance using data from three solar inverters.

The system combines XGBoost gradient boosting and LSTM neural networks through an ensemble blending approach using Ridge regression. The data pipeline handles minute-level inverter readings, weather measurements, and performs comprehensive preprocessing including outlier detection, gap management, and feature engineering.

Advanced features include lagged power values, rolling statistics, rate-of-change metrics, cyclic time encodings, and sunrise/sunset proximity indicators. The LSTM architecture uses two layers (128 and 64 units) with dropout regularization, while XGBoost employs 300 estimators with optimized hyperparameters.`,
    categories: ['Machine Learning', 'Deep Learning', 'Time Series', 'Energy Forecasting'],
    technologies: ['Python', 'XGBoost', 'LSTM', 'TensorFlow', 'Pandas', 'NumPy'],
    githubUrl: 'https://github.com/nhorto/Capstone',
    featured: true,
    image: '/placeholder-solar.svg', // Update with actual image path
    achievements: [
      'Ensemble model combining XGBoost and LSTM',
      '3-hour ahead forecasting capability',
      'Real-time data processing pipeline'
    ]
  },
  {
    id: 'poverty-education-viz',
    title: 'School Funding & Poverty Analysis',
    slug: 'poverty-education-viz',
    shortDescription: 'Interactive D3.js dashboard exploring the correlation between educational funding and student poverty across U.S. school districts.',
    fullDescription: `This interactive data visualization project explores the correlation between educational funding and student poverty across U.S. school districts, introducing the Poverty Sensitivity Index (PSI) as a novel measurement tool.

The PSI metric (Revenue per Student ÷ Poverty Rate) helps identify districts that effectively allocate resources relative to their poverty levels. The dashboard features an interactive choropleth map, drill-down district views, comparison charts, and scatter plots revealing the revenue-to-poverty relationship.

The data pipeline integrates multiple sources including the Urban Institute Education Data API for 2020 school finance metrics, SAIPE poverty estimates, and Census Bureau district boundaries. The analysis reveals significant regional variations in funding equity, with the PSI helping identify areas where funding formulas may inadequately address poverty.`,
    categories: ['Data Visualization', 'Geospatial Analysis', 'D3.js', 'Public Policy'],
    technologies: ['Python', 'D3.js', 'GeoPandas', 'Pandas', 'GeoJSON', 'JavaScript'],
    githubUrl: 'https://github.com/nhorto/Data-Viz-PSI',
    featured: false,
    image: '/placeholder-education.svg', // Update with actual image path
    achievements: [
      'Created novel Poverty Sensitivity Index (PSI) metric',
      'Interactive multi-level geographic visualization',
      'Integrated multiple federal data sources'
    ]
  },
  {
    id: 'hotel-nlp-analysis',
    title: 'Hotel Analysis with NLP',
    slug: 'hotel-nlp-analysis',
    shortDescription: 'Natural language processing system analyzing Italian hotels through topic modeling and sentiment analysis of guest reviews.',
    fullDescription: `This machine learning project evaluates Italian hotels through multiple analytical lenses, combining geographic data collection with natural language processing to assess accommodations across several dimensions.

The system gathers hotel information via Google Places API and calculates location scores using the Haversine formula to measure proximity to major attractions. The NLP pipeline applies Latent Dirichlet Allocation (LDA) for topic discovery and VADER for sentiment analysis across guest reviews.

Hotels receive proximity ratings based on landmark distance, with scores ranging from 0.5 to 2 points depending on distance bands. The framework supports hotel ranking systems, competitive benchmarking, and service enhancement identification based on review analysis patterns.`,
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
    shortDescription: 'Cross-platform mobile application built with Expo and React Native for wine enthusiasts.',
    fullDescription: `Cork & Note is a cross-platform mobile application developed using Expo and React Native, designed to run seamlessly on Android, iOS, and web platforms.

The app implements file-based routing for efficient navigation and follows modern React Native best practices. Built with the Expo ecosystem, it leverages the latest development tools and libraries for rapid iteration and deployment.

The project demonstrates proficiency in mobile development, cross-platform architecture, and modern JavaScript frameworks. The application is designed with scalability in mind, allowing for easy feature additions and modifications.`,
    categories: ['Mobile Development', 'React Native', 'Expo', 'Full-Stack'],
    technologies: ['React Native', 'Expo', 'JavaScript', 'Node.js'],
    githubUrl: 'https://github.com/nhorto/cork-and-note',
    featured: true,
    image: '/placeholder-mobile.svg', // Update with actual image path
    achievements: [
      'Cross-platform mobile application',
      'File-based routing implementation',
      'Modern React Native architecture'
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
