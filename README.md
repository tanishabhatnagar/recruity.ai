# User Company Portal Development

## Project Overview
This project aims to develop a user-friendly company portal for an AI-driven recruitment platform. Key features include authentication, profile management, a side menu for easy navigation, a basic chat interface, and a visual representation of the AI agent's recruitment workflow.

## Key Features
- **Signup/Login**: Secure authentication for company users.
- **Profile Creation**: Interface for creating and editing company profiles.
- **Side Menu Navigation**: Easy access to Homepage, Profile Creation, Chat, and Agent Workflow sections.
- **Chat Interface**: A simple chatbot interface for user interaction.
- **Agent Workflow Visualization**: Displays the recruitment process in defined steps (AR Start, Sourcing, Basic Matching, Exact Matching Filtering, Value Addition by AI).

## Technical Requirements
- **Front-End Framework**: Built using React.
- **Database Integration**: Supabase for data storage and retrieval.
- **Mock Data**: Utilized to simulate the agent workflow and chat interactions.

## Setup and Installation
1. **Clone the Repository**: `git clone https://github.com/tanishabhatnagar/recruity.ai.git`
2. **Navigate to the project directory**: `cd user-portal`
3. **Install Dependencies**: `yarn`
4. **Environment Setup**: Ensure to set up the `.env` file with the required Supabase credentials.

## Running the Application
- **Development Mode**: `yarn dev` - Starts the development server.
- **Build Production**: `yarn build` - Builds the app for production.
- **Preview Production Build**: `yarn preview`

## Dependencies
- Chakra UI.
- Supabase for backend services and database.
- React Router for navigation.
