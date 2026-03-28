# ResumeAI — User Profiles

## Current State
The app is a frontend-only React/TypeScript app with no backend data storage. The Motoko backend is empty (actor {}). There is no user authentication or profile persistence.

## Requested Changes (Diff)

### Add
- Authorization (Internet Identity login) so users can sign in
- Motoko backend: UserProfile stable storage with fields: name, email, targetRole, resumeCount, lastAnalysisScore, createdAt
- Backend API: getProfile, saveProfile, updateProfile
- Frontend: new "Profile" tab in the navigation showing the user's saved profile info, edit form, and a summary of their last analysis
- Auto-save profile data after each resume analysis (save role, score, resume filename)
- Login/logout button in the app header

### Modify
- Navigation: add "Profile" tab (10th tab)
- After analysis completes: persist results to backend if user is logged in
- Upload tab: pre-fill target role from saved profile if available

### Remove
- Nothing removed

## Implementation Plan
1. Add authorization component for Internet Identity login
2. Generate Motoko backend with UserProfile stable storage and CRUD APIs
3. Add Profile tab component with login gate, view/edit form, and analysis history summary
4. Wire login/logout button in header
5. After analysis, if authenticated, call saveProfile/updateProfile with latest score and role
6. Pre-fill Job Role Match from saved profile
