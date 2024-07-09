<h1 align="center">
<div style = "display: flex; justify-content: center; align-items: center;">
  <div style="width: 150px; height: 150px; background-color: white; border-radius: 50%; display: flex; justify-content: center; align-items: center; overflow: hidden;">
      <img src="./frontend/src/Assets/EchonotesLogo.png" alt="EchoNotes Logo" style="width: 80%; height: auto; display: block; margin: auto;">
    </div>
</div>
  <br>
  EchoNotes
  <br>
</h1>

<h4 align="center">An all-in-one study web app built on top of <a href="https://react.dev" target="_blank">React</a>.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> 
</p>

## Motivation and Aim

EchoNotes aims to revolutionise the way students engage with study materials by harnessing the power of modern technology and cognitive learning techniques. Traditional methods of studying often involve laborious tasks like manually creating flashcards and quizzes, which can be time-consuming and less effective in promoting deep learning. Recognising this challenge, EchoNotes seeks to provide a seamless solution that enhances learning efficiency and engagement.

At its core, EchoNotes leverages active recall and spaced repetition, two scientifically proven methods that enhance memory retention and learning comprehension. Active recall involves actively retrieving information from memory, which is crucial for reinforcing knowledge and identifying gaps in understanding. Spaced repetition optimises this process by strategically spacing out review sessions over time, ensuring that information is retained in long-term memory.

One of the distinctive features of EchoNotes is its integration with AI-powered technologies, particularly the ChatGPT API. This integration allows users to generate personalised quizzes and study materials directly from their own documents. By analysing text and extracting key concepts, EchoNotes automates the creation of multiple-choice questions, fill-in-the-blank exercises, and flashcards. This not only saves time but also ensures that study materials are tailored to the user's specific needs and learning objectives.

In essence, EchoNotes aims to empower students by providing them with a user-friendly platform that facilitates active learning and knowledge retention. By combining advanced technology with proven educational strategies, EchoNotes transforms the study experience, making it more effective, efficient, and enjoyable for students striving to excel academically.

This is our motivation for EchoNotes, a productivity app that streamlines the process of creating multiple-choice or fill-in-the-blank questions and flashcards to aid students in applying studying techniques such as active recall and spaced repetition easily.

## User Stories

- As a student preparing for exams, I want to upload PDF lecture notes and generate interactive quizzes to test my understanding.

- As a student, I want better way to use studying techniques such as acative recall and space repetition to retian my knowlege

- As a teacher, I want to recommend personalized study plans and resources to my students based on their learning preferences.

- As professional, I want a way to store technical document and test myself on my knowledge with questions tailored to me

- As a Lifelong Learner, I want to expand my knowledge across various domains and continuously challenge myself with new information.

- As a parent,I want my children to study smart and utilise the right studying techniques to achieve good grades with ease

## Goals for milestone 1

<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px; color:black; background-color: lightgrey; margin: 10px 0;">
  In milestone 1, our goal was to have a functional frontend that allows us to store notes and a backend that stores the data. The techstack we used is MERN. We use React for our frontend and Express.js and Node.js for the backend with MongoDB Atlas as the choice of database. 
  
  However, during milestone 1, we encountered significant challenges when attempting to handle PDF uploads within our backend infrastructure. This issue became a critical obstacle that hindered our progress and necessitated a more focused approach for milestone 2.

The primary problem we faced revolved around effectively managing PDF files uploaded by users. Integrating PDF storage involves handling binary data efficiently, ensuring secure and reliable file uploads, and managing the associated metadata such as file type and size. Additionally, implementing robust error handling and validation mechanisms to prevent data corruption or security vulnerabilities posed additional complexities.

For milestone 2, our priority will be to address these challenges by refining our backend infrastructure. This includes optimising our file upload processes, implementing enhanced error handling mechanisms, and ensuring seamless integration with MongoDB Atlas for efficient data storage and retrieval. By resolving these issues, we aim to achieve a more robust and scalable application framework that meets our functional requirements while maintaining high standards of performance and data security.

</div>

## Key Features (Milestone 1)

- <Strong> Input PDF as Your Notes:</Strong> Users can upload PDF files containing their study materials or documents directly into the application. This feature allows for easy digitization of lecture notes, research papers, or any other PDF-based content that users wish to manage and study from.

- <Strong>State the Title and Subject of Your Notes:</Strong> Upon uploading a PDF, users are prompted to specify a title and subject for their notes. This metadata helps organize and categorize the uploaded content, making it easier for users to retrieve and reference specific materials later.

- <Strong>Notes Stored Will be Reflected in Your Notes</Strong>: Once uploaded and labeled, the PDF notes are stored securely in the application's backend, leveraging MongoDB Atlas for efficient data management. Users can view their stored notes in a dedicated interface that lists all uploaded documents along with their associated titles and subjects.

- <Strong>Delete Notes as You Wish:</Strong> Users have the flexibility to manage their stored notes by deleting them as needed. This feature ensures that users can maintain a clean and organized collection of study materials, removing outdated or irrelevant content effortlessly.

## Goals in milestone 2

<div style="border: 1px solid #ccc; padding: 10px; border-radius: 5px; color:black; background-color: lightgrey; margin: 10px 0;">
  In milestone 2, our goal is make make a functional web app with multiple pages which we hope to host on vercel. Furthermore, we hope to improve our user interface and experience through new landing page and reactive component. Last but not least, we aim to start utilising AI api to start making mcq for uploaded PDFs.
  
  However, we have identified areas for improvement. Firstly, the UI/UX of our notes page can be enhanced further to provide a more intuitive and seamless user experience. This includes refining the layout, improving navigation, and ensuring that users can easily manage and access their notes. These improvements are crucial to ensuring that our application meets the usability standards expected by our users.

Furthermore, while integrating AI for MCQ generation is a significant step forward, we recognize the need to introduce customization options. This involves allowing users to tailor the MCQ generation process to suit their specific educational needs, such as adjusting question difficulty levels or focusing on particular topics. By offering customization, we aim to empower users to create personalized study materials that align closely with their learning objectives.

In summary, milestone 2 represents a pivotal stage in our application's development, focusing on expanding functionality, enhancing usability, and integrating advanced technologies to support effective learning and study practices.

</div>

## Key Features (Milestone 2)

- <Strong>User Authentication and Login/Sign-in Pages:</Strong> We recognize the importance of security and personalized user experiences. Therefore, we are implementing robust user authentication mechanisms. This includes dedicated login and sign-in pages where users can securely access their accounts, ensuring their data and study materials are protected.

- <Strong>About Us Page:</Strong> To foster transparency and trust, we are adding an About Us page. This page will provide insights into our team, mission, and the values driving our development efforts. It aims to connect with our users on a personal level, establishing a relationship built on transparency and shared educational goals.

- <Strong>Access to Stored PDFs and MCQs:</Strong> Users will have seamless access to their stored PDF documents and MCQs generated by our AI-powered tools. This feature empowers learners to review their study materials conveniently, aiding in active recall and enhancing their understanding of key concepts.

- <Strong>AI-Generated MCQs:</Strong> Leveraging advanced AI capabilities, our application will automatically generate multiple-choice questions (MCQs) from uploaded PDFs. This functionality supports efficient study practices by transforming dense study materials into interactive quizzes. Users can expect tailored questions that align closely with the content of their documents, facilitating effective revision and self-assessment in the future

## Future features in milestone 3 (extended features)

- <Strong>Gamified Elements:</Strong> We are implementing gamification elements to incentivise learning and encourage user engagement. Users will earn points and achievements based on their interaction with the app, such as completing quizzes, uploading notes, or achieving study milestones. This gamified approach not only motivates users to actively participate but also rewards their progress, fostering a sense of accomplishment and continuous improvement.

- <Strong>UI and UX Enhancements:</Strong> Building on user feedback, we are dedicated to refining our application's user interface (UI) and user experience (UX). This includes optimising navigation, streamlining workflows, and enhancing visual elements to ensure a more intuitive and seamless experience for our users. By prioritizing usability and accessibility, we aim to make studying and navigating our app effortless and enjoyable.

- <Strong>Bug Fixes:</Strong> Addressing technical issues and bugs is paramount to maintaining a reliable and stable application. We are committed to identifying and resolving any existing bugs promptly to ensure a smooth user experience. Our goal is to provide a robust platform where users can focus on learning without interruptions or technical obstacles.

- <Strong>Networking System for Personal Notes Sharing </Strong> To promote collaboration and knowledge sharing among users, we are introducing a networking system. This feature enables users to selectively share their personal notes with chosen friends or study groups. It facilitates collaborative learning by allowing users to exchange insights, discuss topics, and support each other's academic or professional pursuits.

- <Strong>Enhanced UI/UX for Note Page</Strong>
  Recognising the central role of the Note Page in our application, we are implementing significant improvements to its UI and UX. This includes enhancing the note-taking interface, improving organization and search functionalities, and introducing customization options for notes. By making the Note Page more user-friendly and feature-rich, we aim to empower users in managing and revisiting their study materials effortlessly.

## How To Run Locally

1. Clone repository

2. Download the necessary dependencies

3. Navigate to backend and run the file

4. Open another terminal, navigate to frontend and run the file

5. Enjoy! Please try to insert pdf with text as much as possible. Thanks!

```
git clone https://github.com/zzibo/Team-Lions-Orbital-Project.git
npm install
cd backend/
npm run dev
cd frontend/
npm start
```

## Current Tech Stack

Front-end:

- React framework with HTML5 and CSS frontend

  Back-end:

- Node.js with Express

  Database:

- MongoDB Atlas hosted on Vercel

## Architecture Diagram

<img src="./frontend/src/Assets/MERNStack.png">

## Software Engineering Practices

Our project follows industry-standard practices such as:

- Git and GitHub form the backbone of our version control strategy. We use Git for tracking changes and GitHub for hosting repositories, facilitating seamless collaboration among team members. This setup allows us to manage code versions, track changes, and coordinate development efforts effectively.

- MongoDB Atlas serves as our database management platform, providing a scalable and reliable solution for storing and managing data. We leverage MongoDB's document-oriented structure to efficiently store and retrieve data, supporting our application's dynamic data requirements.

- We emphasize the importance of code reviews as a critical step in ensuring code quality and maintainability. Before merging code into the main branch, team members conduct thorough peer reviews. Code reviews help identify potential issues, ensure adherence to coding standards, and share knowledge among team members, ultimately improving overall code quality

- We abide to proper naming Conventions and Folder Organization. Maintaining consistent and descriptive naming conventions is essential for clarity and readability: Pages, Components, and Contexts: We adopt meaningful names for pages, components, and context providers to convey their purpose and functionality clearly. These entities are organized into dedicated folders within our project structure, promoting modular and maintainable code.

- Incorporating comprehensive comments and documentation within our codebase to enhance readability and facilitate communication: We use comments strategically to explain complex logic, clarify intent, and provide context for future modifications. Clear and concise comments help teammates understand the code's purpose and implementation details. In addition to inline comments, we maintain external documentation to outline project architecture, API references, and deployment procedures. Documentation serves as a reference for developers and stakeholders, ensuring transparency and ease of maintenance.

- Applying the KISS Principle. The "Keep It Simple, Stupid" (KISS) principle guides our approach to software design and development: We prioritize simplicity in our codebase, favoring straightforward solutions over complex ones. By minimizing unnecessary complexity and dependencies, we enhance code readability, maintainability, and scalability.
