Project Name: Journal API

Description:
A backend API that allows users to create, read, update, and delete personal notes. Each user has private access to their own notes using session-based authentication and ownership-based authorization.

2. Database Schema (Designed)
Tables:
users
id (Primary Key)
email (unique)
password
role (user/admin)
notes (main resource)
id (Primary Key)
user_id (Foreign Key → users.id)
title
content
created_at
updated_at
tags
id (Primary Key)
name
Relationships:
One user → many notes
Each note belongs to one user
Tags can be used to organize notes (optional expansion)
